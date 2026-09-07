import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getBookingsByUser } from "@/lib/models/booking";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default async function UserBookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getBookingsByUser(session.user.id);

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
            <div
              key={booking._id.toString()}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                {booking.trainerName?.charAt(0)?.toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-medium text-black text-sm">{booking.trainerName}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {booking.type === "demo" ? "Free Demo Session" : "Paid Session"}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {booking.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}