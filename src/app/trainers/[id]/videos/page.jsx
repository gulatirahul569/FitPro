import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Play,
  Video,
} from "lucide-react";

import { getTrainerProfile } from "@/lib/models/trainerProfile";
import { getVideosByTrainer } from "@/lib/models/video";
import { hasUnlockedTrainerVideos } from "@/lib/models/booking";
import { auth } from "@/auth";

export default async function TrainerVideosPage({ params }) {
  const { id } = await params;

  const trainer = await getTrainerProfile(id);

  if (!trainer || !trainer.isListed) {
    notFound();
  }

  const session = await auth();

  const allVideos = await getVideosByTrainer(id);

  /*
    Important:
    Filter approved videos, then sort oldest -> newest.

    videos[0] is now the earliest uploaded approved video
    and will always become the free Demo Video.
  */
  const videos = allVideos
    .filter((video) => video.status === "approved")
    .sort((firstVideo, secondVideo) => {
      const firstVideoDate = new Date(
        firstVideo.createdAt || firstVideo.uploadedAt || 0
      ).getTime();

      const secondVideoDate = new Date(
        secondVideo.createdAt || secondVideo.uploadedAt || 0
      ).getTime();

      return firstVideoDate - secondVideoDate;
    })
    .map((video) => ({
      ...video,
      _id: video._id.toString(),
    }));

  const hasUnlocked = session?.user
    ? await hasUnlockedTrainerVideos(session.user.id, id)
    : false;

  return (
    <section className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
        {/* Back button */}
        <Link
          href={`/trainers/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-black/55 transition-all duration-300 hover:-translate-x-1 hover:text-black"
        >
          <ArrowLeft size={17} />
          Back to {trainer.name}
        </Link>

        {/* Page heading */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
            Training library
          </p>

          <h1 className="text-4xl font-black tracking-tight text-black md:text-5xl">
            Videos by {trainer.name}
          </h1>

          <p className="mt-4 text-base leading-7 text-black/60">
            Explore workouts, tips, and training sessions created by{" "}
            {trainer.name.split(" ")[0]}. The first video is available as a
            free demo. Book a session to unlock the complete training library.
          </p>
        </div>

        {/* Empty state */}
        {videos.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <Video size={26} className="text-black/40" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-black">
              No videos available yet
            </h2>

            <p className="mt-2 text-sm text-black/50">
              New training content will appear here soon.
            </p>
          </div>
        ) : (
          <>
            {/* Information banner */}
            {!hasUnlocked && (
              <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-black">
                    Start with the free demo video
                  </p>

                  <p className="mt-1 text-sm text-black/55">
                    Book a session with {trainer.name.split(" ")[0]} to unlock
                    every training video.
                  </p>
                </div>

                <Link
                  href={`/trainers/${id}`}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
                >
                  View trainer

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            )}

            {/* Videos */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => {
                /*
                  Because `videos` is oldest -> newest:
                  index 0 = trainer's first approved upload = free demo.
                */
                const isDemo = index === 0;
                const isLocked = !isDemo && !hasUnlocked;
                const videoId = video._id || video.id;

                const content = (
                  <article
                    className={`group h-full overflow-hidden rounded-3xl border border-black/10 bg-white transition-all duration-300 ${
                      isLocked
                        ? "cursor-not-allowed"
                        : "hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className={`h-full w-full object-cover transition-transform duration-700 ${
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
                          isLocked
                            ? "bg-black/65"
                            : "bg-black/20 transition-colors duration-300 group-hover:bg-black/35"
                        }`}
                      />

                      {/* Demo tag */}
                      {isDemo && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-sm">
                          Demo video
                        </span>
                      )}

                      {/* Locked tag */}
                      {isLocked && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                          Members only
                        </span>
                      )}

                      {/* Play or lock content */}
                      {isLocked ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-white">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg">
                            <LockKeyhole size={21} />
                          </div>

                          <div>
                            <p className="text-sm font-bold">Locked content</p>

                            <p className="mt-1 text-xs text-white/70">
                              Book a session to unlock
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Play
                              size={22}
                              className="ml-1"
                              fill="currentColor"
                            />
                          </div>
                        </div>
                      )}

                      {/* Video duration */}
                      {video.duration && video.duration !== "—" && (
                        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex min-h-[145px] flex-col p-5">
                      <h2 className="line-clamp-2 text-lg font-black leading-snug text-black">
                        {video.title}
                      </h2>

                      <p className="mt-2 text-sm text-black/50">
                        {isDemo
                          ? "Free introduction video"
                          : hasUnlocked
                          ? "Training video unlocked"
                          : "Unlock this video after booking"}
                      </p>

                      <span
                        className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold ${
                          isLocked ? "text-black/35" : "text-black"
                        }`}
                      >
                        {isLocked ? "Locked" : "Watch video"}

                        {!isLocked && (
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        )}
                      </span>
                    </div>
                  </article>
                );

                if (isLocked) {
                  return <div key={videoId}>{content}</div>;
                }

                return (
                  <Link key={videoId} href={`/videos/${videoId}`}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}