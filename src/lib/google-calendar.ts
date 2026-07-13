import { google } from 'googleapis';

// Initialize Google Calendar client
export function getCalendarClient() {
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL) {
        throw new Error('Missing GOOGLE_PRIVATE_KEY or GOOGLE_CLIENT_EMAIL');
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY
        .replace(/\\n/g, '\n')
        .replace(/^"|"$/g, '');

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    return google.calendar({ version: 'v3', auth });
}

export function getGoogleApiErrorMessage(error: unknown): string {
    if (!error || typeof error !== 'object') return 'Unknown Google Calendar error';
    const err = error as {
        message?: string;
        response?: { data?: { error?: { message?: string; errors?: Array<{ message?: string; reason?: string }> } } };
    };
    const apiMessage = err.response?.data?.error?.message;
    const reason = err.response?.data?.error?.errors?.[0]?.reason;
    if (apiMessage && reason) return `${apiMessage} (${reason})`;
    if (apiMessage) return apiMessage;
    if (err.message) return err.message;
    return 'Unknown Google Calendar error';
}

// Get busy times from Google Calendar
export async function getBusyTimes(startDate: Date, endDate: Date) {
    const calendar = getCalendarClient();

    try {
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
                timeZone: 'Asia/Kolkata',
            },
        });

        const busySlots = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy || [];
        return busySlots;
    } catch (error) {
        console.error('Error fetching busy times:', getGoogleApiErrorMessage(error));
        throw error;
    }
}

/**
 * Create a calendar event on the shared calendar.
 *
 * Service accounts cannot reliably:
 * - create Google Meet conference links
 * - invite external attendees / send Google invite emails
 * without Workspace domain-wide delegation.
 *
 * So we create a plain event (visible on your calendar) and send the
 * client confirmation + Meet link ourselves via SES.
 */
export async function createCalendarEvent(
    summary: string,
    description: string,
    startTime: Date,
    endTime: Date,
    attendeeEmail: string
) {
    const calendar = getCalendarClient();
    const meetingUrl = process.env.NEXT_PUBLIC_MEETING_URL;

    const fullDescription = [
        description,
        '',
        attendeeEmail ? `Invitee email: ${attendeeEmail}` : '',
        meetingUrl ? `Meet link: ${meetingUrl}` : '',
    ]
        .filter(Boolean)
        .join('\n');

    try {
        const event = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            // Do not send Google Calendar invites from the service account
            sendUpdates: 'none',
            requestBody: {
                summary,
                description: fullDescription,
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: 'Asia/Kolkata',
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: 'Asia/Kolkata',
                },
                // Keep attendee on the event for your reference only.
                // sendUpdates: 'none' avoids the common service-account invite failure.
                attendees: attendeeEmail ? [{ email: attendeeEmail }] : undefined,
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'popup', minutes: 60 },
                        { method: 'popup', minutes: 10 },
                    ],
                },
            },
        });

        return {
            ...event.data,
            // Always use the stable Meet URL — service accounts cannot mint Meet links
            hangoutLink: meetingUrl || event.data.hangoutLink || undefined,
        };
    } catch (error) {
        // If adding an attendee is rejected, retry without attendees so booking still works
        const message = getGoogleApiErrorMessage(error);
        console.error('Error creating calendar event (with attendee):', message);

        if (attendeeEmail) {
            try {
                const event = await calendar.events.insert({
                    calendarId: process.env.GOOGLE_CALENDAR_ID,
                    sendUpdates: 'none',
                    requestBody: {
                        summary,
                        description: fullDescription,
                        start: {
                            dateTime: startTime.toISOString(),
                            timeZone: 'Asia/Kolkata',
                        },
                        end: {
                            dateTime: endTime.toISOString(),
                            timeZone: 'Asia/Kolkata',
                        },
                        reminders: {
                            useDefault: false,
                            overrides: [
                                { method: 'popup', minutes: 60 },
                                { method: 'popup', minutes: 10 },
                            ],
                        },
                    },
                });

                return {
                    ...event.data,
                    hangoutLink: meetingUrl || event.data.hangoutLink || undefined,
                };
            } catch (retryError) {
                console.error(
                    'Error creating calendar event (retry without attendee):',
                    getGoogleApiErrorMessage(retryError)
                );
                throw retryError;
            }
        }

        throw error;
    }
}
