"use client";

import { useState } from "react";
import {
  Search,
  Check,
  X,
  Clock,
  CalendarDays,
  MoreVertical,
} from "lucide-react";

export default function BookingsList({ bookings }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      !query ||
      booking.userName?.toLowerCase().includes(query) ||
      booking.userEmail?.toLowerCase().includes(query) ||
      booking.type?.toLowerCase().includes(query) ||
      booking.date?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  async function updateStatus(bookingId, status) {
    try {
      setUpdatingId(bookingId);

      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update booking.");
        return;
      }

      // Refresh the server-rendered booking data
      window.location.reload();
    } catch (error) {
      console.error("Booking status update error:", error);
      alert("Something went wrong while updating the booking.");
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatCreatedAt(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getStatusClasses(status) {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";

      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "confirmed":
        return <Check size={12} />;

      case "completed":
        return <Check size={12} />;

      case "cancelled":
        return <X size={12} />;

      default:
        return <Clock size={12} />;
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">
            Bookings
          </h1>

          <p className="text-gray-500 text-sm">
            {bookings.length} booking
            {bookings.length !== 1 && "s"} total
            {filteredBookings.length !== bookings.length &&
              ` · ${filteredBookings.length} shown`}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
          />
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          ["all", "All"],
          ["pending", "Pending"],
          ["confirmed", "Confirmed"],
          ["completed", "Completed"],
          ["cancelled", "Cancelled"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatusFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === value
                ? "bg-black text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <CalendarDays
            size={32}
            className="mx-auto mb-3 text-gray-300"
          />

          <h2 className="text-sm font-semibold text-black mb-1">
            No bookings yet
          </h2>

          <p className="text-gray-500 text-sm">
            When someone books a session with you, it will appear here.
          </p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Search
            size={28}
            className="mx-auto mb-3 text-gray-300"
          />

          <p className="text-gray-500 text-sm">
            No bookings match your search or filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="mt-3 text-sm font-medium text-black hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <div className="col-span-3">Client</div>
            <div className="col-span-2">Booking</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Booked</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Bookings */}
          <div className="divide-y divide-gray-100">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
              >
                {/* Client */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {booking.userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">
                      {booking.userName || "Unknown client"}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {booking.userEmail}
                    </p>
                  </div>
                </div>

                {/* Booking type */}
                <div className="lg:col-span-2 flex items-center">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    {booking.type === "demo"
                      ? "Free Demo"
                      : "Paid Session"}
                  </span>
                </div>

                {/* Date/time */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-700">
                    {formatDate(booking.date)}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {booking.time}
                  </p>
                </div>

                {/* Status */}
                <div className="lg:col-span-2 flex items-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium capitalize ${getStatusClasses(
                      booking.status
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </span>
                </div>

                {/* Created */}
                <div className="lg:col-span-1 flex items-center">
                  <p className="text-xs text-gray-500">
                    {formatCreatedAt(booking.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex items-center justify-start lg:justify-end gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        type="button"
                        disabled={updatingId === booking._id}
                        onClick={() =>
                          updateStatus(booking._id, "confirmed")
                        }
                        className="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                      >
                        Confirm
                      </button>

                      <button
                        type="button"
                        disabled={updatingId === booking._id}
                        onClick={() =>
                          updateStatus(booking._id, "cancelled")
                        }
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:border-red-300 hover:text-red-600 disabled:opacity-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {booking.status === "confirmed" && (
                    <button
                      type="button"
                      disabled={updatingId === booking._id}
                      onClick={() =>
                        updateStatus(booking._id, "completed")
                      }
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:border-black hover:text-black disabled:opacity-50 transition-colors"
                    >
                      Complete
                    </button>
                  )}

                  {booking.status === "completed" && (
                    <span className="text-xs text-gray-400">
                      Completed
                    </span>
                  )}

                  {booking.status === "cancelled" && (
                    <span className="text-xs text-gray-400">
                      Cancelled
                    </span>
                  )}

                  <button
                    type="button"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors"
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}