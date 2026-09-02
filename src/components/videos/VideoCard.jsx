import Link from "next/link";
import { Play, Star } from "lucide-react";

export default function VideoCard({ video }) {
  return (
    <Link
      href={`/videos/${video.id}`}
      className="group rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 block"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={24} className="text-black ml-1" fill="black" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
          {video.duration}
        </span>
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
  );
}