import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent, getBusyTimes } from '@/lib/google-calendar';
import { sendBookingConfirmation } from '@/lib/email';
import { addMinutes } from 'date-fns';

const MEETING_DURATION = 20; // minutes

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, projectDetails, startTime, timezone } = body;

        if (!name || !email || !startTime) {
            return NextResponse.json(
                { error: 'Name, email, and start time are required' },
                { status: 400 }
            );
        }

        const start = new Date(startTime);
        const end = addMinutes(start, MEETING_DURATION);

        // Double-check availability before booking
        const busySlots = await getBusyTimes(start, end);
        const isStillAvailable = !busySlots.some((busy: any) => {
            const busyStart = new Date(busy.start);
            const busyEnd = new Date(busy.end);
            return start < busyEnd && end > busyStart;
        });

        if (!isStillAvailable) {
            return NextResponse.json(
                { error: 'This time slot is no longer available. Please select another time.' },
                { status: 409 }
            );
        }

        // Create the calendar event
        const summary = `Project Discussion: ${name}`;
        const description = `
📋 Project Meeting

👤 Client: ${name}
📧 Email: ${email}
${phone ? `📱 Phone: ${phone}` : ''}
🌍 Client Timezone: ${timezone || 'Not specified'}

📝 Project Details:
${projectDetails || 'To be discussed on the call'}

---
${process.env.NEXT_PUBLIC_MEETING_URL ? `🔗 Meeting Link: ${process.env.NEXT_PUBLIC_MEETING_URL}` : ''}
    `.trim();

        const event = await createCalendarEvent(
            summary,
            description,
            start,
            end,
            email
        );

        const meetingUrl = event.hangoutLink || process.env.NEXT_PUBLIC_MEETING_URL;

        // Send confirmation email to client via Resend
        try {
            await sendBookingConfirmation({
                clientName: name,
                clientEmail: email,
                clientPhone: phone,
                startTime: start,
                endTime: end,
                meetLink: meetingUrl ?? undefined,
                timezone: timezone,
                projectDetails: projectDetails,
            });
        } catch (emailError) {
            // Don't fail the booking if email fails — log and continue
            console.error('Failed to send confirmation email:', emailError);
        }

        return NextResponse.json({
            success: true,
            event: {
                id: event.id,
                htmlLink: event.htmlLink,
                hangoutLink: meetingUrl,
                start: event.start?.dateTime,
                end: event.end?.dateTime,
            },
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'Failed to create booking. Please try again.' },
            { status: 500 }
        );
    }
}
