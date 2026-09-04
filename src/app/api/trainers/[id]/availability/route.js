import { NextResponse } from "next/server";
import { getTrainerSchedule } from "@/lib/models/trainerProfile";
import { getBookingsByTrainer } from "@/lib/models/booking";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function generateTimeSlots(start, end) {
  const slots = [];

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  // 1-hour booking slots
  for (
    let minutes = startMinutes;
    minutes < endMinutes;
    minutes += 60
  ) {
    // Don't create a slot if the full hour doesn't fit.
    if (minutes + 60 > endMinutes) {
      break;
    }

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    slots.push(formatTime(hour, minute));
  }

  return slots;
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date is required." },
        { status: 400 }
      );
    }

    // Validate date
    const selectedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date." },
        { status: 400 }
      );
    }

    const schedule = await getTrainerSchedule(id);

    const dayName = DAYS[selectedDate.getDay()];
    const daySchedule = schedule?.[dayName];

    // Trainer is unavailable that day
    if (
      !daySchedule ||
      !daySchedule.enabled ||
      !daySchedule.start ||
      !daySchedule.end
    ) {
      return NextResponse.json({
        date,
        day: dayName,
        available: false,
        slots: [],
      });
    }

    let slots = generateTimeSlots(
      daySchedule.start,
      daySchedule.end
    );

    // Get existing bookings for this trainer
    const bookings = await getBookingsByTrainer(id);

    const bookedTimes = new Set(
      bookings
        .filter(
          (booking) =>
            booking.date === date &&
            booking.status !== "cancelled"
        )
        .map((booking) => booking.time)
    );

    // Remove already booked slots
    slots = slots.filter((slot) => !bookedTimes.has(slot));

    return NextResponse.json({
      date,
      day: dayName,
      available: true,
      slots,
    });
  } catch (error) {
    console.error(
      "GET /api/trainers/[id]/availability:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch available slots." },
      { status: 500 }
    );
  }
}