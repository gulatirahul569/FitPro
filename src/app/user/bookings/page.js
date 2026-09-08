import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getBookingsByUser } from "@/lib/models/booking";
import { getDb } from "@/lib/db";
import Link from "next/link";
import BookingCard from "./BookingCard";

export default async function UserBookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getBookingsByUser(session.user.id);

  const db = await getDb();
  const bookingIds = bookings.map((b) => b._id.toString());
  const existingReviews = await db
    .collection("reviews")
    .find({ bookingId: { $in: bookingIds } })
    .toArray();
  const reviewedBookingIds = new Set(existingReviews.map((r) => r.bookingId));

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-8">
        {bookings.length} booking{bookings.length !== 1 && "s"} total
      </p>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm mb-4">You haven't booked any sessions yet.</p>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Find a Trainer
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id.toString()}
              booking={{ ...booking, _id: booking._id.toString() }}
              hasReview={reviewedBookingIds.has(booking._id.toString())}
            />
          ))}
        </div>
      )}
    </div>
  );
}