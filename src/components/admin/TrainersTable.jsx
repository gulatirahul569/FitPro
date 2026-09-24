"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, AlertCircle } from "lucide-react";

export default function TrainersTable({ trainers }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return trainers.filter(
      (trainer) =>
        trainer.name?.toLowerCase().includes(query.toLowerCase()) ||
        trainer.email?.toLowerCase().includes(query.toLowerCase())
    );
  }, [trainers, query]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6 w-full max-w-md">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search trainers..."
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500 text-sm">
          No trainers found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Desktop-only headers */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <div className="col-span-3">Trainer</div>
            <div className="col-span-2">Specialization</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Profile Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map((trainer) => {
              const profileStatus = !trainer.hasProfile
                ? "No profile yet"
                : trainer.isListed
                ? "Live on Trainers page"
                : "Profile incomplete / unlisted";

              return (
                <div
                  key={trainer.userId}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  {/* Trainer identity */}
                  <div className="md:col-span-3 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      {trainer.name?.charAt(0)?.toUpperCase() || "T"}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-black text-sm truncate">
                        {trainer.name || "Unnamed Trainer"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {trainer.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile details; desktop columns */}
                  <div className="grid grid-cols-2 gap-4 md:contents">
                    <div className="md:col-span-2 min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1 md:hidden">
                        Specialization
                      </p>
                      <p className="text-sm text-gray-700 truncate">
                        {trainer.specialization || "—"}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1 md:hidden">
                        Session Price
                      </p>
                      <p className="text-sm text-gray-700">
                        {trainer.price ? `₹${trainer.price}` : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Profile status */}
                  <div className="md:col-span-3">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1 md:hidden">
                      Profile Status
                    </p>

                    {!trainer.hasProfile ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                        <AlertCircle size={12} className="text-red-500" />
                        {profileStatus}
                      </span>
                    ) : trainer.isListed ? (
                      <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                        {profileStatus}
                      </span>
                    ) : (
                      <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700">
                        {profileStatus}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex flex-col md:flex-row md:justify-end">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1 md:hidden">
                      Actions
                    </p>

                    {trainer.isListed ? (
                      <Link
                        href={`/trainers/${trainer.userId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium hover:border-black hover:bg-gray-50 transition-colors"
                      >
                        View Profile
                        <ExternalLink size={12} className="text-blue-600" />
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-400 py-2 md:py-0">
                        Not public yet
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}