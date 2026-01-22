import { BookingPage } from "@/components/BookingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Call — Somanath Studio",
    description: "Schedule a 60-minute project discussion with Somanath. Select a time that works for you.",
};

export default function BookPage() {
    return <BookingPage />;
}
