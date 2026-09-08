"use client";

import { useMemo, useState } from "react";
import { Search, Calendar, Clock } from "lucide-react";

const statusFilters = ["", "pending", "confirmed", "completed", "cancelled"];

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function AdminBookingsTable({ bookings }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesQuery =
        b.userName?.toLowerCase().includes(query.toLowerCase()) ||
        b.trainerName?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter ? b.status === statusFilter : true;
      return matchesQuery && matchesStatus;
    });
  }, [bookings, query, statusFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client or trainer name..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No bookings match your search.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <div className="col-span-3">Client</div>
            <div className="col-span-3">Trainer</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-2">Status</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="md:col-span-3">
                  <p className="font-medium text-black text-sm">{booking.userName}</p>
                  <p className="text-xs text-gray-500">{booking.userEmail}</p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-sm text-gray-700">{booking.trainerName}</p>
                </div>

                <div className="md:col-span-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {booking.type === "demo" ? "Free Demo" : "Paid Session"}
                  </span>
                </div>

                <div className="md:col-span-2 text-sm text-gray-500 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {booking.time}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}