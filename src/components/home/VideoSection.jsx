import Link from "next/link";
import { videos } from "@/data/videos";
import VideoCard from "@/components/videos/VideoCard";
import Reveal from "@/components/ui/Reveal";

export default function VideoSection() {
  const desktopList = videos.slice(0, 8);
  const mobileList = videos.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20">
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-bold text-black md:text-4xl">
            Explore Fitness Videos
          </h2>

          <p className="mb-12 text-center text-gray-500">
            Free workouts uploaded by our certified trainers
          </p>
        </Reveal>
      </div>

      {/* Desktop only: marquee */}
      <div className="hidden md:block">
        <div className="video-marquee-wrap overflow-hidden">
          <div className="video-marquee-track flex w-max gap-6 px-6 md:px-12">
            {[...desktopList, ...desktopList].map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="w-80 flex-shrink-0"
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg"
          >
            Explore All Videos
          </Link>
        </div>
      </div>

      {/* Mobile only: 4-video, 2-column grid */}
      <div className="px-6 md:hidden">
        <div className="grid grid-cols-2 gap-4">
          {mobileList.map((video, index) => (
            <Reveal key={video.id} delay={index * 100}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg"
          >
            Explore All Videos
          </Link>
        </div>
      </div>
    </section>
  );
}