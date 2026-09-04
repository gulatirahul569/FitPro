"use client";

import { useState } from "react";
import { Search, Mail, MoreVertical } from "lucide-react";

export default function ClientsList({ clients }) {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((client) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      client.name?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">My Clients</h1>

          <p className="text-gray-500 text-sm">
            {clients.length} client{clients.length !== 1 && "s"} total
            {search && filteredClients.length !== clients.length
              ? ` · ${filteredClients.length} shown`
              : ""}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
          />
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">
            No clients yet — once someone books a session with you,
            they'll show up here.
          </p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">
            No clients found matching{" "}
            <span className="font-medium text-gray-700">
              "{search}"
            </span>
            .
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-4 text-sm font-medium text-black hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Table header - desktop only */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <div className="col-span-3">Client</div>
            <div className="col-span-2">Total Bookings</div>
            <div className="col-span-3">Last Program</div>
            <div className="col-span-2">Client Since</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredClients.map((client) => (
              <div
                key={client.userId}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Client */}
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {client.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">
                      {client.name}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {client.email}
                    </p>
                  </div>
                </div>

                {/* Total bookings */}
                <div className="md:col-span-2 flex items-center">
                  <p className="text-sm text-gray-700">
                    {client.totalBookings}
                  </p>
                </div>

                {/* Last program */}
                <div className="md:col-span-3 flex items-center">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                    {client.lastProgram === "demo"
                      ? "Free Demo"
                      : "Paid Session"}
                  </span>
                </div>

                {/* Client since */}
                <div className="md:col-span-2 flex items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(client.since).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-2">
                  <a
                    href={`mailto:${client.email}`}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors"
                  >
                    <Mail size={14} />
                  </a>

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
    </>
  );
}