import Link from "next/link";
import { videos } from "@/data/videos";
import VideoCard from "@/components/videos/VideoCard";
import Reveal from "@/components/ui/Reveal";

export default function VideoSection() {
  const featured = videos.slice(0, 3);

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
            Explore Fitness Videos
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Free workouts uploaded by our certified trainers
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((video, index) => (
            <Reveal key={video.id} delay={index * 120}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="flex justify-center mt-12">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Explore All Videos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}