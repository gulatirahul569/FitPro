"use client";

import { useState } from "react";
import { Play, CheckCircle2, XCircle, Star, X } from "lucide-react";

export default function TrainerVideoReview({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);
  const [loadingId, setLoadingId] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleDecision = async (id, decision) => {
    setLoadingId(id);

    try {
      const res = await fetch(`/api/admin/videos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setVideos((current) =>
        current.map((v) => (v._id === id ? { ...v, status: decision } : v))
      );
      setPreviewVideo(null);
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
        This trainer hasn't uploaded any videos yet.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <div key={video._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setPreviewVideo(video)}
              className="relative h-40 w-full bg-gray-100 block group"
            >
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-300">
                  <Play size={28} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all">
                  <Play size={18} className="text-black opacity-0 group-hover:opacity-100 ml-0.5" fill="black" />
                </div>
              </div>
              {video.isDemo && (
                <span className="absolute top-2 left-2 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                  <Star size={11} fill="currentColor" /> Demo
                </span>
              )}
            </button>
            <div className="p-4">
              <p className="font-medium text-black text-sm mb-0.5 truncate">{video.title}</p>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(video.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {video.status === "pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(video._id, "approved")}
                    disabled={loadingId === video._id}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    <CheckCircle2 size={12} /> Approve
                  </button>
                  <button
                    onClick={() => handleDecision(video._id, "rejected")}
                    disabled={loadingId === video._id}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    <XCircle size={12} /> Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    video.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {video.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setPreviewVideo(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>

            <video src={previewVideo.videoUrl} controls autoPlay className="w-full max-h-[70vh] bg-black" />

            <div className="p-5">
              <h3 className="font-semibold text-black mb-1">{previewVideo.title}</h3>
              {previewVideo.description && (
                <p className="text-sm text-gray-600 mt-2">{previewVideo.description}</p>
              )}

              {previewVideo.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDecision(previewVideo._id, "approved")}
                    disabled={loadingId === previewVideo._id}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleDecision(previewVideo._id, "rejected")}
                    disabled={loadingId === previewVideo._id}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}