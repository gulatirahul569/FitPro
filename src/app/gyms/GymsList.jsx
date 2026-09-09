"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, MapPin, Users } from "lucide-react";

export default function GymsList({ gyms }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return gyms.filter(
      (g) =>
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.location.toLowerCase().includes(query.toLowerCase())
    );
  }, [gyms, query]);

  return (
    <div>
      <div className="relative max-w-md mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search gyms by name or location..."
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
        />
      </div>

      <p className="text-sm text-gray-500 mb-6">
        <span className="font-semibold text-black">{filtered.length}</span> gym
        {filtered.length !== 1 && "s"} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-500 text-sm">No gyms match your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((gym) => (
            <Link
              key={gym._id}
              href={`/gyms/${gym._id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {gym.image ? (
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300">
                    {gym.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-black mb-1">{gym.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                  <MapPin size={13} /> {gym.location}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Users size={13} />
                  {gym.trainerCount} trainer{gym.trainerCount !== 1 && "s"} affiliated
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}