import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getBookingsByTrainer } from "@/lib/models/booking";
import { getTrainerProfile } from "@/lib/models/trainerProfile";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (
      session.user.role !== "trainer" &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    const trainerId = session.user.id;

    const [bookings, profile] = await Promise.all([
      getBookingsByTrainer(trainerId),
      getTrainerProfile(trainerId),
    ]);

    const price = Number(profile?.price) || 0;

    const completedBookings = bookings.filter(
      (booking) => booking.status === "completed"
    );

    const confirmedBookings = bookings.filter(
      (booking) => booking.status === "confirmed"
    );

    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
    );

    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "cancelled"
    );

    /*
     * Only paid "session" bookings generate earnings.
     * Demo bookings generate ₹0.
     */
    const paidCompletedBookings = completedBookings.filter(
      (booking) => booking.type === "session"
    );

    const totalEarnings =
      paidCompletedBookings.length * price;

    /*
     * Current month
     */
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthBookings = completedBookings.filter(
      (booking) => {
        const bookingDate = new Date(booking.updatedAt);

        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      }
    );

    const thisMonthPaidBookings =
      thisMonthBookings.filter(
        (booking) => booking.type === "session"
      );

    const thisMonthEarnings =
      thisMonthPaidBookings.length * price;

    /*
     * Recent completed bookings
     */
    const recentBookings = completedBookings
      .slice(0, 10)
      .map((booking) => ({
        id: booking._id.toString(),
        clientName: booking.userName,
        clientEmail: booking.userEmail,
        type: booking.type,
        date: booking.date,
        time: booking.time,
        amount:
          booking.type === "session" ? price : 0,
        completedAt: booking.updatedAt,
      }));

    return NextResponse.json({
      earnings: {
        totalEarnings,
        thisMonthEarnings,
        pricePerSession: price,

        completedSessions: completedBookings.length,
        paidCompletedSessions:
          paidCompletedBookings.length,

        confirmedSessions: confirmedBookings.length,
        pendingSessions: pendingBookings.length,
        cancelledSessions: cancelledBookings.length,

        thisMonthSessions: thisMonthBookings.length,
        thisMonthPaidSessions:
          thisMonthPaidBookings.length,

        recentBookings,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/trainer/earnings:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch earnings." },
      { status: 500 }
    );
  }
}   