"use client";

import { useState } from "react";
import { Calendar, Clock, Mail, Check, X, CheckCheck } from "lucide-react";

const statusFilters = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function BookingsList({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const filtered = filter ? bookings.filter((b) => b.status === filter) : bookings;

  const updateStatus = async (id, status) => {
    setLoadingId(id);

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBookings((current) =>
        current.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No bookings match this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                {booking.userName?.charAt(0)?.toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-medium text-black text-sm">{booking.userName}</p>
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
                  
                   <a href={`mailto:${booking.userEmail}`}
                    className="flex items-center gap-1 hover:text-black transition-colors"
                  >
                    <Mail size={12} /> {booking.userEmail}
                  </a>
                </div>
              </div>

              {booking.status === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(booking._id, "confirmed")}
                    disabled={loadingId === booking._id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    <Check size={13} /> Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(booking._id, "cancelled")}
                    disabled={loadingId === booking._id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-60"
                  >
                    <X size={13} /> Decline
                  </button>
                </div>
              )}

              {booking.status === "confirmed" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(booking._id, "completed")}
                    disabled={loadingId === booking._id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
                  >
                    <CheckCheck size={13} /> Mark Complete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}