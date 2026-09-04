
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getBookingsByUser } from "@/lib/models/booking";
import {
  Dumbbell,
  CalendarDays,
  Clock,
  User,
  CheckCircle2,
  Hourglass,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function UserTrainingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getBookingsByUser(session.user.id);

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending" ||
      booking.status === "confirmed"
  );

  const trainerIds = [
    ...new Set(
      bookings
        .map((booking) => booking.trainerId)
        .filter(Boolean)
    ),
  ];

  const currentBooking =
    confirmedBookings.length > 0
      ? confirmedBookings[0]
      : bookings.length > 0
        ? bookings[0]
        : null;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Hourglass,
      className:
        "bg-amber-50 text-amber-700 border-amber-100",
    },
    confirmed: {
      label: "Confirmed",
      icon: CheckCircle2,
      className:
        "bg-green-50 text-green-700 border-green-100",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className:
        "bg-blue-50 text-blue-700 border-blue-100",
    },
    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      className:
        "bg-red-50 text-red-700 border-red-100",
    },
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
            <Dumbbell size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-black">
              My Training
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track your trainers and upcoming training sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <StatCard
          icon={<User size={19} />}
          label="My Trainers"
          value={trainerIds.length}
        />

        <StatCard
          icon={<CalendarDays size={19} />}
          label="Upcoming Sessions"
          value={upcomingBookings.length}
        />

        <StatCard
          icon={<CheckCircle2 size={19} />}
          label="Confirmed Sessions"
          value={confirmedBookings.length}
        />

      </div>

      {currentBooking ? (
        <>
          {/* Current Training */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-black">
                  Current Training
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your latest training activity.
                </p>
              </div>

              <Link
                href="/user/bookings"
                className="text-sm font-medium text-gray-700 hover:text-black inline-flex items-center gap-1"
              >
                View bookings
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Dumbbell
                      size={24}
                      className="text-gray-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Trainer
                    </p>

                    <h3 className="text-lg font-semibold text-black">
                      {currentBooking.trainerName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {currentBooking.type === "demo"
                        ? "Free Demo Session"
                        : "Training Session"}
                    </p>
                  </div>
                </div>

                <div>
                  {(() => {
                    const config =
                      statusConfig[currentBooking.status] ||
                      statusConfig.pending;

                    const StatusIcon = config.icon;

                    return (
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${config.className}`}
                      >
                        <StatusIcon size={14} />
                        {config.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="border-t border-gray-100 mt-6 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">

                <Detail
                  icon={<CalendarDays size={17} />}
                  label="Date"
                  value={formatDate(currentBooking.date)}
                />

                <Detail
                  icon={<Clock size={17} />}
                  label="Time"
                  value={currentBooking.time}
                />

                <Detail
                  icon={<User size={17} />}
                  label="Trainer"
                  value={currentBooking.trainerName}
                />

              </div>
            </div>
          </section>

          {/* Upcoming Sessions */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-black">
                Upcoming Sessions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Sessions that are waiting for approval or already
                confirmed.
              </p>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.map((booking) => {
                  const config =
                    statusConfig[booking.status] ||
                    statusConfig.pending;

                  const StatusIcon = config.icon;

                  return (
                    <div
                      key={booking._id.toString()}
                      className="bg-white border border-gray-200 rounded-xl p-5"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
                            <CalendarDays
                              size={19}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-black">
                              {booking.trainerName}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              {booking.type === "demo"
                                ? "Free Demo"
                                : "Training Session"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">

                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">
                              {formatDate(booking.date)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Clock size={15} />
                            {booking.time}
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${config.className}`}
                          >
                            <StatusIcon size={13} />
                            {config.label}
                          </span>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <CalendarDays
                    size={21}
                    className="text-gray-500"
                  />
                </div>

                <h3 className="text-base font-semibold text-black">
                  No upcoming sessions
                </h3>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Book a session with a trainer to start your
                  training.
                </p>

                <Link
                  href="/trainers"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Find a Trainer
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </section>
        </>
      ) : (
        /* Empty Training State */
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <Dumbbell
              size={27}
              className="text-gray-500"
            />
          </div>

          <h2 className="text-lg font-semibold text-black">
            Your training journey starts here
          </h2>

          <p className="text-sm text-gray-500 max-w-md mx-auto mt-2 mb-6">
            You haven't booked any training sessions yet.
            Find a trainer and book your first session.
          </p>

          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Find a Trainer
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
          {icon}
        </div>

        <span className="text-2xl font-semibold text-black">
          {value}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {label}
      </p>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="text-sm font-medium text-gray-800 mt-0.5">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

