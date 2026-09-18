"use client";

import { useState } from "react";
import { LockKeyhole, LoaderCircle, Play, VideoOff } from "lucide-react";

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  isPlayable,
  isLocked,
  isDemo,
}) {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    if (!isPlayable || isLocked) {
      return;
    }

    setIsLoading(true);
    setPlaying(true);
  };

  if (playing && isPlayable && !isLocked) {
    return (
      <div className="relative aspect-video w-full bg-black">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <LoaderCircle size={32} className="animate-spin text-white" />
          </div>
        )}

        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          onCanPlay={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className="h-full w-full bg-black object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className={`h-full w-full object-cover ${
            isLocked ? "scale-105 blur-sm opacity-50" : "opacity-70"
          }`}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-gray-800 to-black" />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute left-5 top-5">
        <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {isLocked ? "Locked video" : isDemo ? "Free demo" : "Trainer video"}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
        {isLocked ? (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl">
              <LockKeyhole size={26} />
            </div>

            <div>
              <p className="text-lg font-bold">This video is locked</p>

              <p className="mt-1 text-sm text-white/70">
                Book a session to unlock this trainer’s videos.
              </p>
            </div>
          </>
        ) : isPlayable ? (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <Play size={27} className="ml-1" fill="currentColor" />
          </button>
        ) : (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl">
              <VideoOff size={25} />
            </div>

            <div>
              <p className="text-lg font-bold">Video preview only</p>

              <p className="mt-1 text-sm text-white/70">
                Full video will be available soon.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
        <p className="max-w-2xl text-xl font-bold leading-tight md:text-2xl">
          {title}
        </p>
      </div>
    </div>
  );
}