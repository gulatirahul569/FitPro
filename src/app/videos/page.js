"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Play,
  Search,
  Star,
  Video,
  X,
} from "lucide-react";

import { videos as mockVideos } from "@/data/videos";

function VideosContent() {
  const [query, setQuery] = useState("");
  const [dbVideos, setDbVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/api/videos/public");
        const data = await response.json();

        setDbVideos(data.videos || []);
      } catch {
        setDbVideos([]);
      } finally {
        setIsLoading(false);

        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      }
    };

    loadVideos();
  }, []);

  const allVideos = useMemo(() => {
    return [...mockVideos, ...dbVideos];
  }, [dbVideos]);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allVideos.filter((video) => {
      return (
        video.title?.toLowerCase().includes(normalizedQuery) ||
        video.trainer?.toLowerCase().includes(normalizedQuery) ||
        video.category?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [allVideos, query]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <section className="min-h-screen bg-white pt-20">
      {/* =====================================================
          TOP INTRODUCTION
      ====================================================== */}
      <div className="border-b border-black/10 bg-gray-50 px-6 py-12 md:px-12 md:py-16 md:pt-8">
        <div className="mx-auto max-w-7xl ">
          

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* ================= IMAGE / LEFT (desktop). Mobile: order-2 pushes it below the text — lg:order-none restores default order on desktop. ================= */}
            <div
              className={`relative order-2 transition-all duration-700 lg:order-none ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {/* Offset image frame */}
              <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border border-black/10 bg-white md:block" />

              <div className="relative h-[330px] overflow-hidden rounded-3xl bg-gray-200 sm:h-[400px] md:h-[570px]">
                <img
                  src="https://images.pexels.com/photos/4057533/pexels-photo-4057533.jpeg"
                  alt="Person exercising during a fitness workout"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                    Train on your schedule
                  </p>

                  <p className="max-w-sm text-2xl font-bold leading-tight md:text-3xl">
                    Press play and make progress from anywhere.
                  </p>
                </div>
              </div>
            </div>

            {/* ================= CONTENT / RIGHT (desktop). Mobile: order-1 brings it above the image — lg:order-none restores default order on desktop. ================= */}
            <div
              className={`order-1 transition-all delay-100 duration-700 lg:order-none ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                Fitness Video Library
              </p>

              <h1 className="text-4xl font-black uppercase leading-[1.02] text-black sm:text-5xl md:text-6xl">
                Choose a workout
                <br />
                <span className="text-black/20">that moves you.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
                Explore free demo videos from certified FitPro trainers. Choose
                a workout based on your goal, your energy, and the time you
                have available today.
              </p>

              {/* Explanation points */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Play size={16} fill="currentColor" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Start with a demo
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      Watch trainer-led workouts before choosing a training
                      plan or booking a session.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Train at your pace
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      Pick shorter sessions for busy days or longer workouts
                      when you are ready for a challenge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Learn from certified trainers
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      Get simple, practical guidance that helps you exercise
                      with more confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CHOOSE VIDEO + SEARCH
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div
          className={`transition-all duration-700 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Section heading */}
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                Explore videos
              </p>

              <h2 className="text-3xl font-black text-black">
                Choose your video.
              </h2>
            </div>

            {!isLoading && (
              <p className="text-sm text-black/50">
                <span className="font-bold text-black">
                  {filteredVideos.length}
                </span>{" "}
                video{filteredVideos.length !== 1 && "s"} available
              </p>
            )}
          </div>

          {/* Search panel */}
          <div className="rounded-3xl border border-black/10 bg-gray-50 p-4 sm:p-5">
            <div className="relative max-w-2xl">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
              />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by video name, trainer, or workout type..."
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
              <div className="mt-4 flex items-center gap-2 border-t border-black/5 pt-4">
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
        </div>

        {/* =====================================================
            VIDEO CARDS
        ====================================================== */}
        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-black/5 bg-white"
              >
                <div className="aspect-video animate-pulse bg-gray-100" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => {
              const videoId = video._id || video.id;

              return (
                <div
                  key={videoId}
                  className={`transition-all duration-700 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${Math.min(index * 80, 480)}ms`,
                  }}
                >
                  <Link
                    href={`/videos/${videoId}`}
                    className="group block h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                          <Video size={36} />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />

                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                        Free video
                      </span>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play
                            size={22}
                            className="ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>

                      {video.duration && video.duration !== "—" && (
                        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex min-h-[158px] flex-col p-5">
                      <h3 className="line-clamp-2 text-lg font-black leading-snug text-black">
                        {video.title}
                      </h3>

                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-black/10 pt-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">
                            Trainer
                          </p>

                          <p className="mt-1 line-clamp-1 text-sm font-semibold text-black/65">
                            {video.trainer || "FitPro Trainer"}
                          </p>
                        </div>

                        {video.rating && (
                          <div className="flex items-center gap-1 text-sm font-bold text-black">
                            <Star
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            {video.rating}
                          </div>
                        )}
                      </div>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors duration-300 group-hover:text-black/55">
                        Watch video

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-gray-50 px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-sm">
              <Search size={25} />
            </div>

            <h2 className="mt-5 text-xl font-black text-black">
              No videos found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
              Try another video name, trainer, or workout type.
            </p>

            <button
              type="button"
              onClick={clearSearch}
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
            >
              Show all videos
            </button>
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
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-black" />

            <p className="text-sm text-black/50">Loading videos...</p>
          </div>
        </section>
      }
    >
      <VideosContent />
    </Suspense>
  );
}