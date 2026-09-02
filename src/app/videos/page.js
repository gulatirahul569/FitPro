"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { videos } from "@/data/videos";
import VideoCard from "@/components/videos/VideoCard";

export default function VideosPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.trainer.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b border-gray-100 py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Fitness Videos
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Free workout videos uploaded by our certified trainers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="relative max-w-md mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos or trainers..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
          />
        </div>

        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold text-black">{filtered.length}</span>{" "}
          video{filtered.length !== 1 && "s"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500">
            No videos match your search.
          </div>
        )}
      </div>
    </section>
  );
}