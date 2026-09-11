"use client";

import { useState, useMemo } from "react";
import { Play, CheckCircle2, XCircle, Star } from "lucide-react";

const filters = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "" },
];

export default function AdminVideosReview({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);
  const [filter, setFilter] = useState("pending");
  const [loadingId, setLoadingId] = useState(null);

  const filtered = useMemo(
    () => (filter ? videos.filter((v) => v.status === filter) : videos),
    [videos, filter]
  );

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
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.value ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No videos match this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((video) => (
            <div key={video._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="relative h-40 bg-gray-100">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-300">
                    <Play size={28} />
                  </div>
                )}
                {video.isDemo && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                    <Star size={11} fill="currentColor" /> Demo
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-black text-sm mb-0.5 truncate">{video.title}</p>
                <p className="text-xs text-gray-500 mb-3">{video.trainerName}</p>

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
      )}
    </div>
  );
}