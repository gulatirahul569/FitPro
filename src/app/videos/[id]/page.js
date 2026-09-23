import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  LockKeyhole,
  PlayCircle,
  Star,
  UserRound,
} from "lucide-react";

import { videos as mockVideos } from "@/data/videos";
import {
  getApprovedVideoById,
  getVideosByTrainer,
  trainerOwnsVideo,
} from "@/lib/models/video";
import { hasUnlockedTrainerVideos } from "@/lib/models/booking";
import { auth } from "@/auth";

import VideoPlayer from "./VideoPlayer";
import Reveal from "@/components/ui/Reveal";

async function getVideo(id) {
  const numericId = Number(id);

  /*
    Mock videos remain available to everyone.
  */
  if (!Number.isNaN(numericId)) {
    const mockVideo = mockVideos.find((video) => video.id === numericId);

    if (!mockVideo) {
      return null;
    }

    return {
      id: mockVideo.id,
      title: mockVideo.title,
      trainer: mockVideo.trainer,
      trainerId: mockVideo.trainerId || null,
      thumbnail: mockVideo.thumbnail,
      videoUrl: mockVideo.videoUrl,
      description: mockVideo.description,
      rating: mockVideo.rating || 5,
      duration: mockVideo.duration || "—",
      views: mockVideo.views || "New",
      isMockVideo: true,
    };
  }

  const databaseVideo = await getApprovedVideoById(id);

  if (!databaseVideo) {
    return null;
  }

  return {
    id: databaseVideo._id.toString(),
    title: databaseVideo.title,
    trainer: databaseVideo.trainerName,
    trainerId: databaseVideo.trainerId?.toString(),
    thumbnail: databaseVideo.thumbnail,
    videoUrl: databaseVideo.videoUrl,
    description: databaseVideo.description,
    rating: databaseVideo.rating || 5,
    duration: databaseVideo.duration || "—",
    views: databaseVideo.views || "New",
    createdAt: databaseVideo.createdAt,
    uploadedAt: databaseVideo.uploadedAt,
    isMockVideo: false,
  };
}

async function getVideoAccess(video, session) {
  /*
    Mock videos remain available to everyone.
  */
  if (video.isMockVideo) {
    return {
      isDemo: true,
      hasAccess: true,
    };
  }

  /*
    A database video without a trainer relation cannot be
    checked against booking access. Treat it as not playable.
  */
  if (!video.trainerId) {
    return {
      isDemo: false,
      hasAccess: false,
    };
  }

  /*
    Admins and the trainer who owns this video always have access.
  */
  if (session?.user) {
    const isAdmin = session.user.role === "admin";

    const isTrainerOwner =
      session.user.role === "trainer" &&
      (await trainerOwnsVideo(session.user.id, video.id));

    if (isAdmin || isTrainerOwner) {
      return {
        isDemo: false,
        hasAccess: true,
      };
    }
  }

  /*
    Get all videos from this trainer, keep approved content,
    then sort old -> new.

    The first entry is the trainer's oldest approved upload,
    which is the free demo video.
  */
  const trainerVideos = await getVideosByTrainer(video.trainerId);

  const approvedVideos = trainerVideos
    .filter((item) => item.status === "approved")
    .sort((firstVideo, secondVideo) => {
      const firstDate = new Date(
        firstVideo.createdAt || firstVideo.uploadedAt || 0
      ).getTime();

      const secondDate = new Date(
        secondVideo.createdAt || secondVideo.uploadedAt || 0
      ).getTime();

      return firstDate - secondDate;
    });

  const firstUploadedVideo = approvedVideos[0];

  /*
    Compare MongoDB IDs safely.
  */
  const isDemo =
    firstUploadedVideo &&
    firstUploadedVideo._id.toString() === String(video.id);

  /*
    The demo is public.
  */
  if (isDemo) {
    return {
      isDemo: true,
      hasAccess: true,
    };
  }

  /*
    Every other video requires login plus unlocked booking access.
  */
  if (!session?.user?.id) {
    return {
      isDemo: false,
      hasAccess: false,
    };
  }

  const hasUnlocked = await hasUnlockedTrainerVideos(
    session.user.id,
    video.trainerId
  );

  return {
    isDemo: false,
    hasAccess: hasUnlocked,
  };
}

export default async function VideoDetailPage({ params }) {
  const { id } = await params;

  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  const session = await auth();

  /*
    Server-side authorization:
    This must happen before passing `videoUrl` into VideoPlayer.
  */
  const { isDemo, hasAccess } = await getVideoAccess(video, session);

  const trainerInitial = video.trainer?.charAt(0)?.toUpperCase() || "F";

  /*
    Never expose a locked video URL to an unauthorised browser.
  */
  const safeVideoUrl = hasAccess ? video.videoUrl : null;

  return (
    <section className="min-h-screen bg-gray-50 pt-10 md:pt-20 lg:pt-20">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
        <Link
          href="/videos"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-black/55 transition-all duration-300 hover:-translate-x-1 hover:text-black"
        >
          <ArrowLeft size={17} />
          Back to videos
        </Link>

        {/* Video player */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-xl shadow-black/10">
            <VideoPlayer
              videoUrl={safeVideoUrl}
              thumbnail={video.thumbnail}
              title={video.title}
              isPlayable={Boolean(safeVideoUrl)}
              isLocked={!hasAccess}
              isDemo={isDemo}
            />
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Main details */}
          <div>
            <Reveal delay={80}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                {isDemo ? "Free demo video" : "Trainer video"}
              </p>

              <h1 className="text-3xl font-black leading-tight text-black sm:text-4xl md:text-5xl">
                {video.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-black/10 py-5 text-sm text-black/55">
                <div className="flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-bold text-black">
                    {Number(video.rating || 0).toFixed(1)}
                  </span>

                  <span>rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye size={17} />
                  <span>{video.views} views</span>
                </div>

                {video.duration && video.duration !== "—" && (
                  <div className="flex items-center gap-2">
                    <Clock size={17} />
                    <span>{video.duration}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {hasAccess ? (
                    <>
                      <PlayCircle size={17} />
                      <span>{isDemo ? "Free demo" : "Unlocked"}</span>
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={17} />
                      <span>Locked content</span>
                    </>
                  )}
                </div>
              </div>
            </Reveal>

            {!hasAccess && (
              <Reveal delay={120}>
                <div className="mt-7 rounded-2xl border border-black/10 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <LockKeyhole size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-black">
                        This video is locked
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-black/55">
                        Book a session with {video.trainer || "this trainer"} to
                        unlock their complete training video library.
                      </p>

                      {video.trainerId && (
                        <Link
                          href={`/trainers/${video.trainerId}`}
                          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
                        >
                          View trainer and book

                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={160}>
              <div className="mt-8">
                <h2 className="text-2xl font-black text-black">
                  About this workout
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
                  {video.description ||
                    "Follow this trainer-led workout at your own pace and focus on good form throughout the session."}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Trainer card */}
          <Reveal delay={200}>
            <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">
                Created by
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-lg font-black text-white">
                  {trainerInitial}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-black">
                    {video.trainer || "FitPro Trainer"}
                  </p>

                  <p className="mt-1 text-sm text-black/45">
                    Certified fitness trainer
                  </p>
                </div>
              </div>

              {video.trainerId ? (
                <Link
                  href={`/trainers/${video.trainerId}`}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-black px-4 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  <UserRound size={17} />
                  View trainer profile

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-gray-50 px-4 py-3 text-sm font-semibold text-black/45">
                  <UserRound size={17} />
                  FitPro trainer
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}