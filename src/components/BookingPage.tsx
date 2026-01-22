"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, addDays, subDays } from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Globe,
    Video,
    Loader2,
    Calendar as CalendarIcon,
    Check,
    ArrowLeft,
    Copy,
    CheckCheck
} from "lucide-react";
import Link from "next/link";

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

interface AvailabilityResponse {
    timezone: string;
    yourTimezone: string;
    meetingDuration: number;
    days: DayAvailability[];
}

// Common timezone options
const TIMEZONE_OPTIONS = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Europe/Berlin", label: "Berlin (CET)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

export function BookingPage() {
    const [weekStart, setWeekStart] = useState<Date>(new Date());
    const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [timezone, setTimezone] = useState<string>("");
    const [step, setStep] = useState<"select" | "details" | "success">("select");
    const [booking, setBooking] = useState(false);
    const [bookingResult, setBookingResult] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [projectDetails, setProjectDetails] = useState("");

    // Detect timezone on mount
    useEffect(() => {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(detected);
    }, []);

    // Fetch availability when week or timezone changes
    useEffect(() => {
        if (timezone) {
            fetchAvailability();
        }
    }, [weekStart, timezone]);

    const fetchAvailability = async () => {
        setLoading(true);
        try {
            const startDate = format(weekStart, 'yyyy-MM-dd');
            const response = await fetch(
                `/api/calendar/availability?startDate=${startDate}&timezone=${timezone}`
            );
            const data = await response.json();
            setAvailability(data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevWeek = () => {
        const newStart = subDays(weekStart, 7);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newStart >= today) {
            setWeekStart(newStart);
        }
    };

    const handleNextWeek = () => {
        const newStart = addDays(weekStart, 7);
        const maxDate = addDays(new Date(), 14);
        if (newStart <= maxDate) {
            setWeekStart(newStart);
        }
    };

    const handleSlotSelect = (slot: TimeSlot, date: string) => {
        setSelectedSlot(slot);
        setSelectedDate(date);
        setStep("details");
    };

    const handleBooking = async () => {
        if (!selectedSlot || !name || !email) return;

        setBooking(true);
        try {
            const response = await fetch('/api/calendar/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    projectDetails,
                    startTime: selectedSlot.start,
                    timezone,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setBookingResult(result.event);
                setStep("success");
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to book. Please try again.');
            }
        } catch (error) {
            console.error('Error booking:', error);
            alert('Failed to book. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    const handleBack = () => {
        setStep("select");
        setSelectedSlot(null);
        setSelectedDate("");
        setCopied(false);
    };

    const handleCopy = async () => {
        if (bookingResult?.hangoutLink) {
            try {
                await navigator.clipboard.writeText(bookingResult.hangoutLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    // Get timezone display name
    const timezoneDisplay = useMemo(() => {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                timeZoneName: 'long',
            });
            const parts = formatter.formatToParts(now);
            const tzName = parts.find(p => p.type === 'timeZoneName')?.value || timezone;

            const offset = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                timeZoneName: 'shortOffset',
            }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value || '';

            return `(${offset}) ${tzName}`;
        } catch {
            return timezone;
        }
    }, [timezone]);

    if (step === "success") {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                    <p className="text-zinc-400">
                        A calendar invite has been sent to <span className="text-white">{email}</span>
                    </p>

                    <div className="bg-zinc-900 rounded-xl p-6 text-left space-y-4 border border-zinc-800">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-zinc-400" />
                            <div>
                                <p className="text-sm text-zinc-400">Date & Time</p>
                                <p className="font-medium">
                                    {selectedDate && format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                                </p>
                                <p className="text-zinc-300">{selectedSlot?.display}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-zinc-400" />
                            <div>
                                <p className="text-sm text-zinc-400">Duration</p>
                                <p className="font-medium">60 minutes</p>
                            </div>
                        </div>

                        {bookingResult?.hangoutLink && (
                            <div className="flex items-center gap-3">
                                <Video className="w-5 h-5 text-zinc-400" />
                                <div className="flex-1 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-zinc-400">Video Conference</p>
                                        <a
                                            href={bookingResult.hangoutLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline font-medium"
                                        >
                                            Join Meeting
                                        </a>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group relative"
                                        title="Copy meeting link"
                                    >
                                        {copied ? (
                                            <CheckCheck className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                                        )}
                                        {copied && (
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/">
                        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (step === "details") {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">Complete Your Booking</h1>
                        <p className="text-zinc-400 mt-2">
                            {selectedDate && format(new Date(selectedDate), 'EEEE, MMMM d')} at {selectedSlot?.display}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                Your Name *
                            </label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                Email Address *
                            </label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                What would you like to discuss?
                            </label>
                            <Textarea
                                value={projectDetails}
                                onChange={(e) => setProjectDetails(e.target.value)}
                                placeholder="Tell me about your project, timeline, and any specific requirements..."
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[120px]"
                            />
                        </div>

                        <Button
                            onClick={handleBooking}
                            disabled={!name || !email || booking}
                            className="w-full bg-white text-black hover:bg-zinc-200 h-12"
                        >
                            {booking ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Confirming...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </Button>

                        <p className="text-xs text-center text-zinc-500">
                            A meeting link will be included in your calendar invite
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold">Somanath Khadanga</h1>
                                <p className="text-zinc-400 text-sm">Project Meeting</p>
                            </div>
                        </div>
                        <div className="text-left md:text-right text-sm text-zinc-400 w-full md:w-auto pl-9 md:pl-0">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                60 min appointment
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Video className="w-4 h-4" />
                                Video conference
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Timezone Selector */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-lg font-medium">Select an appointment time</h2>
                    <div className="flex items-center gap-2 text-sm w-full md:w-auto">
                        <Globe className="w-4 h-4 text-zinc-400 shrink-0" />
                        <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 w-full md:w-auto"
                        >
                            {TIMEZONE_OPTIONS.map((tz) => (
                                <option key={tz.value} value={tz.value}>
                                    {tz.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handlePrevWeek}
                        className="p-2 rounded-full hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={weekStart <= new Date()}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNextWeek}
                        className="p-2 rounded-full hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={addDays(weekStart, 7) > addDays(new Date(), 14)}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Calendar Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                    </div>
                ) : availability ? (
                    <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-7 gap-4">
                                {availability.days.map((day) => (
                                    <div key={day.date} className="flex flex-col">
                                        {/* Day Header */}
                                        <div className={`text-center pb-4 border-b border-zinc-800 ${day.isToday ? 'text-blue-400' : ''}`}>
                                            <p className="text-xs text-zinc-500 mb-1">{day.dayName}</p>
                                            <p className={`text-2xl font-bold ${day.isToday ? 'bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto' : ''}`}>
                                                {day.dayNumber}
                                            </p>
                                        </div>

                                        {/* Time Slots */}
                                        <div className="flex flex-col gap-2 pt-4">
                                            {day.isWeekend ? (
                                                <p className="text-xs text-zinc-600 text-center py-4">Unavailable</p>
                                            ) : (
                                                day.slots.map((slot, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => slot.available && handleSlotSelect(slot, day.date)}
                                                        disabled={!slot.available}
                                                        className={`
                          px-3 py-2 rounded-full text-sm font-medium transition-all
                          ${slot.available
                                                                ? 'border border-zinc-600 hover:border-blue-500 hover:text-blue-400 cursor-pointer'
                                                                : 'text-zinc-700 cursor-not-allowed'
                                                            }
                        `}
                                                    >
                                                        {slot.available ? slot.display : '—'}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-zinc-500 py-20">Failed to load availability</p>
                )}
            </main>
        </div>
    );
}
