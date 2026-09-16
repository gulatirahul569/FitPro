"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";

export default function TrainerVideoCards({ trainerGroups }) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!query) return trainerGroups;
    return trainerGroups.filter((g) =>
      g.trainerName?.toLowerCase().includes(query.toLowerCase())
    );
  }, [trainerGroups, query]);

  return (
    <div>
      <div className="relative max-w-md mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by trainer name..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
        />
      </div>

      {filteredGroups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No trainers match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGroups.map((group) => {
            const pendingCount = group.videos.filter((v) => v.status === "pending").length;
            const approvedCount = group.videos.filter((v) => v.status === "approved").length;
            const rejectedCount = group.videos.filter((v) => v.status === "rejected").length;

            return (
              <Link
                key={group.trainerId}
                href={`/admin/videos/${group.trainerId}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-40 w-full bg-gray-100">
                  {group.photo ? (
                    <img src={group.photo} alt={group.trainerName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-gray-300">
                      {group.trainerName?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-black">{group.trainerName}</h3>
                    <span className="text-xs text-gray-500">
                      {group.videos.length} video{group.videos.length !== 1 && "s"}
                    </span>
                  </div>

                  {group.specialization && (
                    <p className="text-sm text-gray-500 mb-1">{group.specialization}</p>
                  )}
                  {group.location && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <MapPin size={11} /> {group.location}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {pendingCount > 0 && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700">
                        {pendingCount} pending
                      </span>
                    )}
                    {approvedCount > 0 && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                        {approvedCount} approved
                      </span>
                    )}
                    {rejectedCount > 0 && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700">
                        {rejectedCount} rejected
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}