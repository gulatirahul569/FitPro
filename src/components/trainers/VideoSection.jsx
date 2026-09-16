"use client";

import { useState } from "react";
import {
  Play,
  Lock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function VideoSection({ videos, hasUnlocked }) {
  const demoVideo = videos.find((v) => v.isDemo);
  const lockedVideos = videos.filter((v) => !v.isDemo);

  const [playingDemo, setPlayingDemo] = useState(false);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-black mb-4">
        Videos
      </h2>

      {/* DEMO VIDEO */}
      {demoVideo && (
        <div className="relative h-56 rounded-2xl overflow-hidden bg-black mb-5">
          {playingDemo ? (
            <video
              src={demoVideo.videoUrl}
              controls
              autoPlay
              className="h-full w-full object-contain bg-black"
            />
          ) : (
            <button
              onClick={() => setPlayingDemo(true)}
              className="absolute inset-0 w-full h-full"
            >
              {demoVideo.thumbnail && (
                <img
                  src={demoVideo.thumbnail}
                  alt={demoVideo.title}
                  className="h-full w-full object-cover opacity-70"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play
                    size={24}
                    className="text-black ml-1"
                    fill="black"
                  />
                </div>
              </div>

              <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                Free Demo
              </span>

              <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                {demoVideo.title}
              </p>
            </button>
          )}
        </div>
      )}

      {/* LOCKED / PREMIUM VIDEOS */}
      {lockedVideos.length > 0 && (
        <LockedVideosCarousel
          videos={lockedVideos}
          hasUnlocked={hasUnlocked}
        />
      )}
    </div>
  );
}

function LockedVideosCarousel({ videos, hasUnlocked }) {
  const [playingId, setPlayingId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
   * Move ONE video at a time.
   *
   * Example:
   * 0 1  -> first view
   * 1 2  -> second view
   * 2 3  -> third view
   */
  const canGoNext = currentIndex < videos.length - 2;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (!canGoNext) return;

    setPlayingId(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;

    setPlayingId(null);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="relative px-1">
      {/* Carousel viewport */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 50}% - ${
              currentIndex * 8
            }px))`,
          }}
        >
          {videos.map((video) => (
            <div
              key={video._id}
              className="relative h-44 flex-[0_0_calc(50%-8px)] min-w-[calc(50%-8px)] rounded-xl overflow-hidden bg-gray-200"
            >
              {/* Playing video */}
              {hasUnlocked && playingId === video._id ? (
                <video
                  src={video.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-cover bg-black"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (hasUnlocked) {
                      setPlayingId(video._id);
                    }
                  }}
                  disabled={!hasUnlocked}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Thumbnail */}
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={`h-full w-full object-cover ${
                        !hasUnlocked
                          ? "blur-sm scale-105"
                          : ""
                      }`}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-300" />
                  )}

                  {/* Unlocked */}
                  {hasUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
                        <Play
                          size={20}
                          className="text-black ml-1"
                          fill="black"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Locked */
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 text-center px-3">
                      <Lock
                        size={20}
                        className="text-white"
                      />

                      <p className="text-white text-xs font-medium leading-tight">
                        Book a session to unlock
                      </p>
                    </div>
                  )}

                  {/* Video title */}
                  <p className="absolute bottom-2 left-3 right-3 text-left text-white text-xs font-medium truncate drop-shadow-md">
                    {video.title}
                  </p>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}
      {canGoPrev && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous videos"
          className="
            absolute
            left-[-18px]
            top-1/2
            -translate-y-1/2
            z-20
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-gray-200
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-gray-50
            hover:scale-105
            transition-all
          "
        >
          <ChevronLeft
            size={22}
            className="text-black"
          />
        </button>
      )}

      {/* RIGHT ARROW */}
      {canGoNext && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next videos"
          className="
            absolute
            right-[-18px]
            top-1/2
            -translate-y-1/2
            z-20
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-gray-200
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-gray-50
            hover:scale-105
            transition-all
          "
        >
          <ChevronRight
            size={22}
            className="text-black"
          />
        </button>
      )}
    </div>
  );
}