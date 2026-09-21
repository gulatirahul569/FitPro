"use client";

import Link from "next/link";
import { Play, Star, Lock, Eye } from "lucide-react";

export default function TrainerVideosList({ video }) {
  // You can adjust the link to whatever detail page you want trainers to use.
  // For now, we’ll reuse the public video detail route if it exists, e.g. /videos/[id]
  const detailHref = `/videos/${video._id}`;

  return (
    <Link
      href={detailHref}
      className="group block h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            <Play size={32} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 ease-out" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {video.isDemo && (
            <span className="flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              Demo
            </span>
          )}

          {!video.isDemo && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
              <Lock size={11} />
              Locked
            </span>
          )}

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
              video.status === "approved"
                ? "bg-green-100 text-green-700"
                : video.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {video.status}
          </span>
        </div>

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

        <div className="mt-2 flex items-center gap-3 text-xs text-black/50">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{video.views || "—"}</span>
          </div>

          {video.duration && (
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>{video.rating || "—"}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-black">
            {video.isDemo ? "Free demo" : "Paid session"}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 ease-out group-hover:translate-x-1">
            <Play size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}