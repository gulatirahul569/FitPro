"use client";

import { useEffect, useState } from "react";
import { Play, Search, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function UserVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadVideos() {
      try {
        const res = await fetch("/api/user/videos");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load videos");
        }

        if (!cancelled) {
          setVideos(data.videos || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  const clearSearch = () => setQuery("");

  if (loading) {
    return (
      <div>
        <Reveal>
          <h1 className="text-2xl font-bold text-black">My Videos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your paid training sessions and recorded workouts.
          </p>
        </Reveal>

        <div className="mt-10 text-sm text-black/50">Loading your videos…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Reveal>
          <h1 className="text-2xl font-bold text-black">My Videos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your paid training sessions and recorded workouts.
          </p>
        </Reveal>

        <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Reveal>
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-black">My Videos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your paid training sessions and recorded workouts.
          </p>
        </div>
      </Reveal>

      {/* Search */}
      <Reveal delay={80}>
        <div className="mt-6 rounded-2xl border border-black/10 bg-gray-50 p-4 sm:p-5">
          <div className="relative">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
            />

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your videos..."
              className="w-full rounded-xl border border-black/10 bg-white py-3 pl-12 pr-11 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-black focus:ring-4 focus:ring-black/5"
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
        </div>
      </Reveal>

      {/* Count */}
      <Reveal delay={120}>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-bold text-black">
            {filteredVideos.length} video
            {filteredVideos.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </Reveal>

      {/* Videos grid */}
      {filteredVideos.length === 0 ? (
        <Reveal delay={160}>
          <div className="mt-8 rounded-3xl border border-dashed border-black/15 bg-gray-100 px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-sm">
              <Play size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-black">
              No videos found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
              You don’t have any paid session videos yet. Book a session with a
              trainer to unlock their videos here.
            </p>

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
              >
                Show all videos
              </button>
            )}
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video, index) => (
            <Reveal key={video.id} delay={Math.min(index * 80, 400)}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
function VideoCard({ video }) {
  return (
    <a
      href={`/user/videos/${video.id}`}
      className="group block h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 ease-out" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-black">
            <Play size={20} />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-black">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">{video.trainerName}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-black">
            Watch session
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 ease-out group-hover:translate-x-1">
            <Play size={14} />
          </span>
        </div>
      </div>
    </a>
  );
}