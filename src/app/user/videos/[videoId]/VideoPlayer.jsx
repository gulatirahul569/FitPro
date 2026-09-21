"use client";

import { Play } from "lucide-react";

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  isPlayable,
  isLocked,
  isDemo,
}) {
  if (!isPlayable || isLocked) {
    // Locked state – show thumbnail + lock overlay
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
            <Play size={48} className="opacity-40" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/80 text-white">
            <Play size={28} />
          </div>
        </div>
      </div>
    );
  }

  // Playable state – render iframe
  return (
    <div className="aspect-video w-full overflow-hidden bg-black">
      <iframe
        src={videoUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}