import Link from "next/link";
import { videos } from "@/data/videos";
import VideoCard from "@/components/videos/VideoCard";

export default function VideoSection() {
  const featured = videos.slice(0, 3);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Explore Fitness Videos
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Free workouts uploaded by our certified trainers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/videos"
            className="px-6 py-3 rounded-lg border border-black text-black font-medium hover:bg-black hover:text-white transition-colors"
          >
            Explore All Videos
          </Link>
        </div>
      </div>
    </section>
  );
}