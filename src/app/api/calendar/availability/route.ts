import { NextRequest, NextResponse } from 'next/server';
import { getBusyTimes } from '@/lib/google-calendar';
import { addDays, startOfDay, endOfDay, addMinutes, format, setHours, setMinutes, isSameDay, isWeekend } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

// Configuration
const MEETING_DURATION = 60; // minutes
const BUFFER_TIME = 30; // minutes between meetings
const WORK_START_HOUR = 9; // 9 AM
const WORK_END_HOUR = 21; // 9 PM
const YOUR_TIMEZONE = 'Asia/Kolkata';
const DAYS_TO_SHOW = 7;
const MAX_BOOKING_DAYS = 14;

interface TimeSlot {
    start: string;
    end: string;
    display: string;
    available: boolean;
}

interface DayAvailability {
    date: string;
    dateDisplay: string;
    dayName: string;
    dayNumber: string;
    isToday: boolean;
    isWeekend: boolean;
    slots: TimeSlot[];
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const startDateParam = searchParams.get('startDate'); // YYYY-MM-DD
        const clientTimezone = searchParams.get('timezone') || YOUR_TIMEZONE;

        // Parse start date or default to today
        const now = new Date();
        const startDate = startDateParam
            ? new Date(startDateParam)
            : startOfDay(now);

        // Ensure we don't go beyond max booking window
        const maxDate = addDays(now, MAX_BOOKING_DAYS);

        // Fetch busy times for the entire week range
        const weekEnd = addDays(startDate, DAYS_TO_SHOW);
        const busySlots = await getBusyTimes(startDate, weekEnd);

        // Generate availability for each day
        const weekAvailability: DayAvailability[] = [];

        for (let i = 0; i < DAYS_TO_SHOW; i++) {
            const currentDate = addDays(startDate, i);
            const isCurrentDay = isSameDay(currentDate, now);
            const isWeekendDay = isWeekend(currentDate);
            const isPastMaxBooking = currentDate > maxDate;

            // Generate slots for this day
            const daySlots: TimeSlot[] = [];

            // Set working hours in YOUR timezone (IST)
            let workStart = fromZonedTime(
                setHours(setMinutes(currentDate, 0), WORK_START_HOUR),
                YOUR_TIMEZONE
            );
            const workEnd = fromZonedTime(
                setHours(setMinutes(currentDate, 0), WORK_END_HOUR),
                YOUR_TIMEZONE
            );

            let currentSlot = workStart;

            while (currentSlot < workEnd) {
                const slotEnd = addMinutes(currentSlot, MEETING_DURATION);

                // Check if slot is in the past
                const isPast = currentSlot <= now;

                // Check if slot overlaps with any busy time
                const isBusy = busySlots.some((busy: { start: string; end: string }) => {
                    const busyStart = new Date(busy.start);
                    const busyEnd = new Date(busy.end);
                    return currentSlot < busyEnd && slotEnd > busyStart;
                });

                // Convert to client timezone for display
                const slotInClientTz = toZonedTime(currentSlot, clientTimezone);

                const isAvailable = !isPast && !isBusy && !isWeekendDay && !isPastMaxBooking;

                daySlots.push({
                    start: currentSlot.toISOString(),
                    end: slotEnd.toISOString(),
                    display: format(slotInClientTz, 'h:mma').toLowerCase(),
                    available: isAvailable,
                });

                currentSlot = addMinutes(currentSlot, MEETING_DURATION + BUFFER_TIME);
            }

            // Format date for display in client timezone
            const dateInClientTz = toZonedTime(currentDate, clientTimezone);

            weekAvailability.push({
                date: format(currentDate, 'yyyy-MM-dd'),
                dateDisplay: format(dateInClientTz, 'MMM d'),
                dayName: format(dateInClientTz, 'EEE').toUpperCase(),
                dayNumber: format(dateInClientTz, 'd'),
                isToday: isCurrentDay,
                isWeekend: isWeekendDay,
                slots: daySlots,
            });
        }

        return NextResponse.json({
            timezone: clientTimezone,
            yourTimezone: YOUR_TIMEZONE,
            meetingDuration: MEETING_DURATION,
            days: weekAvailability,
        });
    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json(
            { error: 'Failed to fetch availability' },
            { status: 500 }
        );
    }
}
