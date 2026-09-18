"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
  UsersRound,
  X,
} from "lucide-react";

export default function GymsList({ gyms }) {
  const [query, setQuery] = useState("");

  const filteredGyms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return gyms.filter((gym) => {
      return (
        gym.name?.toLowerCase().includes(normalizedQuery) ||
        gym.location?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [gyms, query]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div>
      {/* Search panel */}
      <div className="rounded-3xl border border-black/10 bg-gray-50 p-4 sm:p-5">
        <div className="relative max-w-7xl">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search gym name or location..."
            className="w-full rounded-2xl border border-black/10 bg-white py-3.5 pl-12 pr-11 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-black focus:ring-4 focus:ring-black/5"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {query && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/5 pt-4">
            <span className="text-sm text-black/50">Showing results for:</span>

            <button
              type="button"
              onClick={clearSearch}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-gray-200"
            >
              {query}
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-black text-black">
            {filteredGyms.length} gym
            {filteredGyms.length !== 1 ? "s" : ""} found
          </p>

          <p className="mt-1 text-sm text-black/45">
            Browse gym branches and affiliated trainers.
          </p>
        </div>

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
          >
            <X size={14} />
            Clear search
          </button>
        )}
      </div>

      {/* Cards */}
      {filteredGyms.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGyms.map((gym, index) => (
            <div
              key={gym._id}
              className="translate-y-0 opacity-100 transition-all duration-700"
              style={{
                transitionDelay: `${Math.min(index * 80, 480)}ms`,
              }}
            >
              <Link
                href={`/gyms/${gym._id}`}
                className="group block h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
              >
                {/* Gym image */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  {gym.image ? (
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-5xl font-black text-gray-400">
                      {gym.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-colors duration-300 group-hover:from-black/85" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    <Building2 size={13} />
                    Partner gym
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="line-clamp-1 text-xl font-black">
                      {gym.name}
                    </h3>

                    {gym.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                        <MapPin size={14} />
                        <span className="line-clamp-1">{gym.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Card details */}
                <div className="flex min-h-[165px] flex-col p-5">
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-sm">
                      <UsersRound size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-black">
                        {gym.trainerCount} trainer
                        {gym.trainerCount !== 1 ? "s" : ""}
                      </p>

                      <p className="mt-0.5 text-xs text-black/45">
                        Approved at this branch
                      </p>
                    </div>
                  </div>

                  <span className="mt-auto inline-flex items-center justify-between border-t border-black/10 pt-5 text-sm font-bold text-black">
                    View gym and trainers

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-gray-50 px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-sm">
            <Building2 size={25} />
          </div>

          <h2 className="mt-5 text-xl font-black text-black">
            No gyms found
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
            Try another gym name or location to find a listed branch.
          </p>

          <button
            type="button"
            onClick={clearSearch}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
          >
            Show all gyms
          </button>
        </div>
      )}
    </div>
  );
}