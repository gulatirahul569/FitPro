import Link from "next/link";
import { Play, Star } from "lucide-react";

export default function VideoCard({ video }) {
  return (
    <Link
      href={`/videos/${video.id}`}
      className="group block w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:scale-110">
            <Play size={24} className="ml-1 text-black" fill="black" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
          {video.duration}
        </span>
      </div>

      <div className="p-4">
        <h3 className="mb-1 font-semibold text-black">{video.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{video.trainer}</span>
          <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
            <Star size={14} fill="currentColor" />
            {video.rating}
          </div>
        </div>
      </div>
    </Link>
  );
}