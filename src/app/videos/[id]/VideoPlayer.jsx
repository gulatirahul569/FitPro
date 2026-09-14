"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoPlayer({ videoUrl, thumbnail, title, isPlayable }) {
  const [playing, setPlaying] = useState(false);

  if (playing && isPlayable) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-black mb-6">
        <video src={videoUrl} controls autoPlay className="w-full max-h-[32rem] object-contain bg-black" />
      </div>
    );
  }

  return (
    <button
      onClick={() => isPlayable && setPlaying(true)}
      className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden bg-black mb-6 block"
    >
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="h-full w-full object-cover opacity-70" />
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
          <Play size={28} className="text-black ml-1" fill="black" />
        </div>
      </div>
    </button>
  );
}