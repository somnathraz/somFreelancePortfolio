"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";

interface CalendarBookingProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface TimeSlot {
    start: string;
    end: string;
    display: string;
}

export function CalendarBooking({ open, onOpenChange }: CalendarBookingProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(false);
    const [step, setStep] = useState<"date" | "details">("date");

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [projectDetails, setProjectDetails] = useState("");
    const [success, setSuccess] = useState(false);

    // Fetch available slots when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]);

    const fetchAvailableSlots = async (date: Date) => {
        setLoading(true);
        try {
            const dateStr = format(date, 'yyyy-MM-dd');
            const response = await fetch(`/api/calendar/availability?date=${dateStr}`);
            const data = await response.json();
            setAvailableSlots(data.slots || []);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
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
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onOpenChange(false);
                    resetForm();
                }, 3000);
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to book slot');
            }
        } catch (error) {
            console.error('Error booking:', error);
            alert('Failed to book slot');
        } finally {
            setBooking(false);
        }
    };

    const resetForm = () => {
        setStep("date");
        setSelectedDate(new Date());
        setSelectedSlot(null);
        setName("");
        setEmail("");
        setProjectDetails("");
        setSuccess(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-black border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">
                        {success ? "Booking Confirmed!" : "Schedule a Call"}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        {success
                            ? "Calendar invite sent to your email"
                            : step === "date"
                                ? "Select a date and time that works for you"
                                : "Tell me about your project"}
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="w-8 h-8 text-green-400" />
                        </div>
                        <p className="text-white font-medium mb-2">
                            Meeting scheduled for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                        </p>
                        <p className="text-zinc-400 text-sm">
                            at {selectedSlot?.display}
                        </p>
                    </div>
                ) : step === "date" ? (
                    <div className="space-y-6">
                        {/* Calendar */}
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) =>
                                    date < new Date() || date > addDays(new Date(), 14)
                                }
                                className="rounded-md border border-white/10"
                            />
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-4 h-4 text-zinc-400" />
                                    <h3 className="text-sm font-medium text-white">
                                        Available times for {format(selectedDate, 'MMMM d, yyyy')}
                                    </h3>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                                    </div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                                        {availableSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSlot?.start === slot.start
                                                        ? 'bg-white text-black'
                                                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                                    }`}
                                            >
                                                {slot.display}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center py-8 text-zinc-500 text-sm">
                                        No available slots for this date
                                    </p>
                                )}
                            </div>
                        )}

                        <Button
                            onClick={() => setStep("details")}
                            disabled={!selectedSlot}
                            className="w-full bg-white text-black hover:bg-zinc-200"
                        >
                            Continue
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                                Your Name *
                            </label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                                Email *
                            </label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                                Project Details (Optional)
                            </label>
                            <Textarea
                                value={projectDetails}
                                onChange={(e) => setProjectDetails(e.target.value)}
                                placeholder="Tell me about your project..."
                                className="bg-white/5 border-white/10 text-white min-h-[100px]"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setStep("date")}
                                variant="outline"
                                className="flex-1 border-white/10 text-white hover:bg-white/5"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleBooking}
                                disabled={!name || !email || booking}
                                className="flex-1 bg-white text-black hover:bg-zinc-200"
                            >
                                {booking ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Booking...
                                    </>
                                ) : (
                                    "Confirm Booking"
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
