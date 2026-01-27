import { google } from 'googleapis';

// Initialize Google Calendar client
export function getCalendarClient() {
    const errorMessage = 'Missing GOOGLE_PRIVATE_KEY or GOOGLE_CLIENT_EMAIL';
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL) {
        throw new Error(errorMessage);
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY
        .replace(/\\n/g, '\n') // Replace literal \n with actual newlines
        .replace(/^"|"$/g, ''); // Remove surrounding quotes if they exist

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    return google.calendar({ version: 'v3', auth });
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
        console.error('Error fetching busy times:', error);
        throw error;
    }
}

// Create a calendar event with Google Meet
export async function createCalendarEvent(
    summary: string,
    description: string,
    startTime: Date,
    endTime: Date,
    attendeeEmail: string
) {
    const calendar = getCalendarClient();

    try {
        const event = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            conferenceDataVersion: 1, // Enable Google Meet
            requestBody: {
                summary,
                description,
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
                        { method: 'email', minutes: 24 * 60 }, // 24 hours before
                        { method: 'email', minutes: 60 }, // 1 hour before
                        { method: 'popup', minutes: 30 }, // 30 minutes before
                    ],
                },
            },
        });

        return event.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
}
