"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, MessageCircle, X } from "lucide-react";

interface ContactSheetProps {
    children: React.ReactNode;
}

export function ContactSheet({ children }: ContactSheetProps) {
    const router = useRouter();

    const handleScheduleCall = () => {
        router.push('/book');
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("Project Inquiry");
        const body = encodeURIComponent(
            "Hi Somanath,\n\nI'd like to discuss a project with you.\n\nProject Type: \nTimeline: \nBudget Range: \n\nBest,\n"
        );
        window.location.href = `mailto:somnathkhadanga@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            "Hi Somanath! I'd like to discuss a project with you."
        );
        // TODO: Replace with your actual WhatsApp number (format: country code + number, no + or spaces)
        window.open(`https://wa.me/917008748856?text=${message}`, "_blank");
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="bg-black border-white/10">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold text-white text-center">
                            Let's talk
                        </DrawerTitle>
                        <DrawerDescription className="text-zinc-400 text-center">
                            Pick what's easiest for you
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-6 space-y-3">
                        {/* Schedule a Call - Primary */}
                        <button
                            onClick={handleScheduleCall}
                            className="w-full flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                <Calendar className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">
                                    Schedule a call
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Best for scoping and timelines.
                                </p>
                            </div>
                        </button>

                        {/* Email */}
                        <button
                            onClick={handleEmail}
                            className="w-full flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                <Mail className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">Send an email</h3>
                                <p className="text-sm text-zinc-400">
                                    Ideal if you already have requirements.
                                </p>
                            </div>
                        </button>

                        {/* WhatsApp */}
                        <button
                            onClick={handleWhatsApp}
                            className="w-full flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                                <MessageCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                                <p className="text-sm text-zinc-400">
                                    Fastest for quick questions.
                                </p>
                            </div>
                        </button>
                    </div>

                    <DrawerFooter className="pt-2">
                        <p className="text-xs text-center text-zinc-500 mb-4">
                            ⚡ Replies within 24 hours
                        </p>
                        <DrawerClose asChild>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
