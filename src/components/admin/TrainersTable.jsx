"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, AlertCircle } from "lucide-react";

export default function TrainersTable({ trainers }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return trainers.filter(
      (t) =>
        t.name?.toLowerCase().includes(query.toLowerCase()) ||
        t.email?.toLowerCase().includes(query.toLowerCase())
    );
  }, [trainers, query]);

  return (
    <div>
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search trainers..."
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No trainers found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <div className="col-span-3">Trainer</div>
            <div className="col-span-2">Specialization</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Profile Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map((trainer) => (
              <div
                key={trainer.userId}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {trainer.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">{trainer.name}</p>
                    <p className="text-xs text-gray-500 truncate">{trainer.email}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-700">{trainer.specialization || "—"}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-700">{trainer.price ? `₹${trainer.price}` : "—"}</p>
                </div>

                <div className="md:col-span-3">
                  {!trainer.hasProfile ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                      <AlertCircle size={12} />
                      No profile yet
                    </span>
                  ) : trainer.isListed ? (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                      Live on Trainers page
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700">
                      Profile incomplete / unlisted
                    </span>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-start md:justify-end">
                  {trainer.isListed ? (
                    <Link
                      href={`/trainers/${trainer.userId}`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium hover:border-black transition-colors"
                    >
                      View Profile
                      <ExternalLink size={12} />
                    </Link>
                  ) : (
                    <span className="text-xs text-gray-400">Not public yet</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}