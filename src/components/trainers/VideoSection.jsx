"use client";

import { useState } from "react";
import { Play, Lock } from "lucide-react";

export default function VideoSection({ videos, hasUnlocked }) {
  const demoVideo = videos.find((v) => v.isDemo);
  const lockedVideos = videos.filter((v) => !v.isDemo);
  const [playingDemo, setPlayingDemo] = useState(false);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-black mb-4">Videos</h2>

      {demoVideo && (
        <div className="relative h-56 rounded-2xl overflow-hidden bg-black mb-4">
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
              {demoVideo.thumbnail ? (
                <img
                  src={demoVideo.thumbnail}
                  alt={demoVideo.title}
                  className="h-full w-full object-cover opacity-70"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={24} className="text-black ml-1" fill="black" />
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

      {lockedVideos.length > 0 && (
        <LockedVideosGrid videos={lockedVideos} hasUnlocked={hasUnlocked} />
      )}
    </div>
  );
}

function LockedVideosGrid({ videos, hasUnlocked }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {videos.map((video) => (
        <div key={video._id} className="relative h-32 rounded-xl overflow-hidden bg-gray-200">
          {hasUnlocked && playingId === video._id ? (
            <video src={video.videoUrl} controls autoPlay className="h-full w-full object-cover" />
          ) : (
            <button
              onClick={() => hasUnlocked && setPlayingId(video._id)}
              disabled={!hasUnlocked}
              className="absolute inset-0 w-full h-full"
            >
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`h-full w-full object-cover ${!hasUnlocked ? "blur-sm scale-105" : ""}`}
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}

              {hasUnlocked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play size={22} className="text-white" fill="white" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 text-center px-2">
                  <Lock size={18} className="text-white" />
                  <p className="text-white text-[10px] font-medium leading-tight">
                    Book a session to unlock
                  </p>
                </div>
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}