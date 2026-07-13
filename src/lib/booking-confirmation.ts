export type BookingConfirmation = {
  name: string;
  email: string;
  date: string;
  timeDisplay: string;
  hangoutLink?: string;
  timezone?: string;
};

const STORAGE_KEY = "bookingConfirmation";

export function saveBookingConfirmation(data: BookingConfirmation) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function readBookingConfirmation(): BookingConfirmation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BookingConfirmation;
  } catch {
    return null;
  }
}

export function clearBookingConfirmation() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
