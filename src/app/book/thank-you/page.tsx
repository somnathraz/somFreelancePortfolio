import type { Metadata } from "next";
import { ThankYouClient } from "@/components/ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You — Booking Confirmed | Somanath Studio",
  description: "Your strategy call is booked. A confirmation email is on its way.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/book/thank-you",
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
