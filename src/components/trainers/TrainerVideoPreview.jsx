import Link from "next/link";
import { LockKeyhole, Play, ArrowRight, Video } from "lucide-react";

export default function TrainerVideoPreview({
  trainerId,
  trainerName,
  videos,
  hasUnlocked,
  canPreviewAllVideos = false,
}) {
  const previewVideos = videos.slice(0, 2);

  if (previewVideos.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
            Training library
          </p>

          <h2 className="text-2xl font-black text-black">
            Videos by {trainerName.split(" ")[0]}
          </h2>
        </div>

        <Link
          href={`/trainers/${trainerId}/videos`}
          className="group hidden items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-black/60 sm:inline-flex"
        >
          View all videos

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {previewVideos.map((video, index) => {
          const isDemo = index === 0;

          // Trainer/admin can preview everything
          const isAccessible = isDemo || hasUnlocked || canPreviewAllVideos;
          const isLocked = !isAccessible;

          const cardContent = (
            <article
              className={`group relative overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 ${
                isLocked
                  ? "cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      isLocked
                        ? "scale-105 blur-[2px]"
                        : "group-hover:scale-105"
                    }`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <Video size={34} className="text-gray-400" />
                  </div>
                )}

                <div
                  className={`absolute inset-0 ${
                    isLocked ? "bg-black/60" : "bg-black/20"
                  }`}
                />

                {isDemo && (
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                    Demo video
                  </span>
                )}

                {isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                      <LockKeyhole size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Members-only video</p>
                      <p className="mt-1 text-xs text-white/70">
                        Book a session to unlock
                      </p>
                    </div>
                  </div>
                )}

                {!isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play size={19} className="ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}

                {video.duration && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
                    {video.duration}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-black">
                  {video.title}
                </h3>

                <p className="mt-1 text-sm text-black/50">
                  {isDemo
                    ? "Watch this free introduction"
                    : isAccessible
                    ? "Included with your training access"
                    : "Available after booking"}
                </p>
              </div>
            </article>
          );

          if (isLocked) {
            return (
              <div key={video._id || video.id || index}>
                {cardContent}
              </div>
            );
          }

          return (
            <Link
              key={video._id || video.id || index}
              href={`/videos/${video._id || video.id}`}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>

      <Link
        href={`/trainers/${trainerId}/videos`}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white sm:hidden"
      >
        View all videos by {trainerName.split(" ")[0]}

        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </section>
  );
}