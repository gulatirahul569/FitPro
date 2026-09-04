import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Hourglass,
} from "lucide-react";
import { getBookingsByUser } from "@/lib/models/booking";

function getStatusConfig(status) {
  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
        className: "bg-green-50 text-green-700 border-green-200",
        icon: CheckCircle2,
      };

    case "completed":
      return {
        label: "Completed",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        icon: CheckCircle2,
      };

    case "cancelled":
      return {
        label: "Cancelled",
        className: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
      };

    case "pending":
    default:
      return {
        label: "Pending",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: Hourglass,
      };
  }
}

function formatBookingDate(date) {
  if (!date) return "-";

  try {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

function formatCreatedDate(date) {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

export default async function UserBookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getBookingsByUser(session.user.id);

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-1">
          My Bookings
        </h1>

        <p className="text-gray-500 text-sm">
          View and track all your trainer booking requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Pending</p>

            <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Hourglass size={17} className="text-yellow-600" />
            </div>
          </div>

          <p className="text-2xl font-bold text-black">
            {pendingCount}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Confirmed</p>

            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={17} className="text-green-600" />
            </div>
          </div>

          <p className="text-2xl font-bold text-black">
            {confirmedCount}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Completed</p>

            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <CheckCircle2 size={17} className="text-blue-600" />
            </div>
          </div>

          <p className="text-2xl font-bold text-black">
            {completedCount}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Cancelled</p>

            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle size={17} className="text-red-600" />
            </div>
          </div>

          <p className="text-2xl font-bold text-black">
            {cancelledCount}
          </p>
        </div>
      </div>

      {/* No bookings */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <CalendarDays size={24} className="text-gray-400" />
          </div>

          <h2 className="text-base font-semibold text-black mb-1">
            No bookings yet
          </h2>

          <p className="text-gray-500 text-sm mb-5">
            You haven't booked a session with a trainer yet.
          </p>

          <a
            href="/trainers"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Find a Trainer
          </a>
        </div>
      ) : (
        <>
          {/* Bookings */}
          <div className="space-y-4">
            {bookings.map((booking) => {
              const status = getStatusConfig(booking.status);
              const StatusIcon = status.icon;

              return (
                <div
                  key={booking._id.toString()}
                  className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* Trainer */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
                        {booking.trainerName
                          ?.charAt(0)
                          ?.toUpperCase() || "T"}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-semibold text-black text-base">
                            {booking.trainerName || "Trainer"}
                          </h2>

                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                            {booking.type === "demo"
                              ? "Free Demo"
                              : "Paid Session"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          Booking request sent on{" "}
                          {formatCreatedDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Booking details */}
                  <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                        <CalendarDays
                          size={16}
                          className="text-gray-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Date
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                          {formatBookingDate(booking.date)}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                        <Clock
                          size={16}
                          className="text-gray-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Time
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                          {booking.time || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Trainer */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                        <User
                          size={16}
                          className="text-gray-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Trainer
                        </p>

                        <p className="text-sm font-medium text-gray-700 truncate">
                          {booking.trainerName || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pending message */}
                  {booking.status === "pending" && (
                    <div className="mt-5 rounded-xl bg-yellow-50 border border-yellow-100 px-4 py-3">
                      <p className="text-xs text-yellow-800">
                        <span className="font-semibold">
                          Waiting for trainer approval.
                        </span>{" "}
                        Your booking request has been sent to the trainer.
                        It will be confirmed once the trainer accepts it.
                      </p>
                    </div>
                  )}

                  {/* Confirmed message */}
                  {booking.status === "confirmed" && (
                    <div className="mt-5 rounded-xl bg-green-50 border border-green-100 px-4 py-3">
                      <p className="text-xs text-green-800">
                        <span className="font-semibold">
                          Booking confirmed.
                        </span>{" "}
                        Your trainer has accepted this booking request.
                      </p>
                    </div>
                  )}

                  {/* Completed message */}
                  {booking.status === "completed" && (
                    <div className="mt-5 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                      <p className="text-xs text-blue-800">
                        <span className="font-semibold">
                          Session completed.
                        </span>{" "}
                        This booking has been marked as completed by your
                        trainer.
                      </p>
                    </div>
                  )}

                  {/* Cancelled message */}
                  {booking.status === "cancelled" && (
                    <div className="mt-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                      <p className="text-xs text-red-800">
                        <span className="font-semibold">
                          Booking cancelled.
                        </span>{" "}
                        This booking is no longer active.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}