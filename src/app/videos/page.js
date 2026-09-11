"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Play, Search, Star } from "lucide-react";
import { videos as mockVideos } from "@/data/videos";

function VideosContent() {
  const [query, setQuery] = useState("");
  const [dbVideos, setDbVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos/public")
      .then((res) => res.json())
      .then((data) => setDbVideos(data.videos || []))
      .catch(() => setDbVideos([]));
  }, []);

  const allVideos = useMemo(() => [...mockVideos, ...dbVideos], [dbVideos]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allVideos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.trainer?.toLowerCase().includes(q)
    );
  }, [allVideos, query]);

  return (
    <section className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Fitness Videos
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Free demo videos from our certified trainers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        <div className="relative max-w-md mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos or trainers..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
          />
        </div>

        <p className="text-sm text-gray-500 mb-8">
          <span className="font-semibold text-black">{filtered.length}</span> videos
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500 text-sm">No videos match your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                      <Play size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-black ml-1" fill="black" />
                    </div>
                  </div>
                  {video.duration && video.duration !== "—" && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-black mb-1">{video.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{video.trainer}</span>
                    <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      {video.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function VideosPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-sm text-gray-500">Loading videos...</p>
        </section>
      }
    >
      <VideosContent />
    </Suspense>
  );
}