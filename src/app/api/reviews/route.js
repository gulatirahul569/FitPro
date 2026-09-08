import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBookingsByUser } from "@/lib/models/booking";
import { createReview, getReviewByBookingId } from "@/lib/models/review";

export async function POST(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookingId, rating, comment } = await request.json();

    if (!bookingId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "A valid booking and rating (1-5) are required." }, { status: 400 });
    }

    // Confirm this booking actually belongs to the logged-in user AND is completed
    const userBookings = await getBookingsByUser(session.user.id);
    const booking = userBookings.find((b) => b._id.toString() === bookingId);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    if (booking.status !== "completed") {
      return NextResponse.json(
        { error: "You can only review completed sessions." },
        { status: 400 }
      );
    }

    const existing = await getReviewByBookingId(bookingId);
    if (existing) {
      return NextResponse.json({ error: "You've already reviewed this session." }, { status: 409 });
    }

    const review = await createReview({
      bookingId,
      userId: session.user.id,
      userName: session.user.name,
      trainerId: booking.trainerId,
      rating,
      comment: comment || "",
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}