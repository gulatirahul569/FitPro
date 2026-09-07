
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getBookingsByUser } from "@/lib/models/booking";
import { getApplicationByUserId } from "@/lib/models/trainerApplication";
import { Calendar, Clock, Dumbbell, ArrowRight } from "lucide-react";

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const firstName = session.user.name?.split(" ")[0];
  const bookings = await getBookingsByUser(session.user.id);
  const application = await getApplicationByUserId(session.user.id);

  const upcomingBookings = bookings
    .filter((b) => b.status === "pending" || b.status === "confirmed")
    .slice(0, 3);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
          {firstName?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">Welcome back, {firstName}</h1>
          <p className="text-gray-500 text-sm">Here's an overview of your fitness journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Calendar size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{bookings.length}</p>
          <p className="text-sm text-gray-500">Total Bookings</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Clock size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{upcomingBookings.length}</p>
          <p className="text-sm text-gray-500">Upcoming Sessions</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Dumbbell size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">
            {bookings.filter((b) => b.status === "completed").length}
          </p>
          <p className="text-sm text-gray-500">Completed Sessions</p>
        </div>
      </div>

      {!application && (
        <div className="bg-black text-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-semibold mb-1">Want to become a trainer?</p>
            <p className="text-sm text-white/70">
              Share your fitness expertise and start building your client base.
            </p>
          </div>
          <Link
            href="/become-trainer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors shrink-0"
          >
            Apply Now
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-black">Upcoming Sessions</h2>
          <Link
            href="/user/bookings"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-sm mb-4">No upcoming sessions booked yet.</p>
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Find a Trainer
            </Link>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {upcomingBookings.map((booking) => (
              <div key={booking._id.toString()} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-black text-sm">
                    with {booking.trainerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.type === "demo" ? "Free Demo Session" : "Paid Session"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">{booking.date}, {booking.time}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}