import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import {
  createBooking,
  getBookingsByTrainer,
  getBookingsByUser,
  updateBookingStatus,
} from "@/lib/models/booking";
import { getTrainerProfile } from "@/lib/models/trainerProfile";

export async function POST(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to book a session." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { trainerId, type, date, time } = body;

    if (!trainerId || !type || !date || !time) {
      return NextResponse.json({ error: "Missing required booking details." }, { status: 400 });
    }

    // A trainer can't book themselves
    if (trainerId === session.user.id) {
      return NextResponse.json({ error: "You can't book a session with yourself." }, { status: 400 });
    }

    // Confirm the trainer actually exists and is listed
    const trainerProfile = await getTrainerProfile(trainerId);
    if (!trainerProfile || !trainerProfile.isListed) {
      return NextResponse.json({ error: "This trainer is not available for booking." }, { status: 404 });
    }

    const booking = await createBooking({
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      trainerId,
      trainerName: trainerProfile.name,
      type,
      date,
      time,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Trainers/admins see bookings made WITH them; regular users see bookings THEY made
  if (session.user.role === "trainer" || session.user.role === "admin") {
    const bookings = await getBookingsByTrainer(session.user.id);
    return NextResponse.json({ bookings });
  }

  const bookings = await getBookingsByUser(session.user.id);
  return NextResponse.json({ bookings });
}   

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only trainers/admins can update booking status
  if (
    session.user.role !== "trainer" &&
    session.user.role !== "admin"
  ) {
    return NextResponse.json(
      { error: "You are not allowed to update bookings." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Booking ID and status are required." },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid booking status." },
        { status: 400 }
      );
    }

    const booking = await updateBookingStatus(
      bookingId,
      session.user.id,
      status
    );

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or you don't own this booking." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking,
      message: "Booking status updated successfully.",
    });
  } catch (error) {
    console.error("Booking status update error:", error);

    return NextResponse.json(
      { error: "Failed to update booking status." },
      { status: 500 }
    );
  }
}