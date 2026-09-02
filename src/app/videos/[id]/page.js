import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, Star, Eye, Clock } from "lucide-react";
import { videos } from "@/data/videos";

export default async function VideoDetailPage({ params }) {
  const { id } = await params;
  const video = videos.find((v) => v.id === Number(id));

  if (!video) return notFound();

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Videos
        </Link>

        {/* Video player placeholder */}
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden bg-black mb-6">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Play size={28} className="text-black ml-1" fill="black" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-black mb-3">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-yellow-500" fill="currentColor" />
            <span className="font-medium text-black">{video.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye size={16} />
            {video.views} views
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            {video.duration}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-black">
            {video.trainer.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-black">{video.trainer}</p>
            <Link
              href={`/trainers/${video.trainerId}`}
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              View trainer profile →
            </Link>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{video.description}</p>
      </div>
    </section>
  );
}