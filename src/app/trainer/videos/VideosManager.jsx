"use client";

import { useState } from "react";
import { Plus, X, Trash2, Play, Star, Lock, Upload as UploadIcon } from "lucide-react";

const emptyForm = { title: "", description: "" };

export default function VideosManager({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const hasDemo = videos.some((v) => v.isDemo);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Upload video file through our server route, which forwards it to Blob
      const videoRes = await fetch(
        `/api/trainer/videos/upload?filename=${encodeURIComponent(videoFile.name)}`,
        {
          method: "POST",
          body: videoFile,
        }
      );

      if (!videoRes.ok) throw new Error("Video upload failed.");
      const videoBlob = await videoRes.json();

      // Optionally upload a thumbnail image too
      let thumbnailUrl = "";
      if (thumbnailFile) {
        const thumbRes = await fetch(
          `/api/trainer/videos/upload?filename=${encodeURIComponent(thumbnailFile.name)}`,
          {
            method: "POST",
            body: thumbnailFile,
          }
        );
        if (thumbRes.ok) {
          const thumbBlob = await thumbRes.json();
          thumbnailUrl = thumbBlob.url;
        }
      }

      // Now create the video record with the real hosted URLs
      const res = await fetch("/api/trainer/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          videoUrl: videoBlob.url,
          thumbnail: thumbnailUrl,
          isDemo: !hasDemo,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setVideos((current) => [{ ...data.video, _id: data.video._id.toString() }, ...current]);
      setForm(emptyForm);
      setVideoFile(null);
      setThumbnailFile(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSetDemo = async (id) => {
    try {
      const res = await fetch(`/api/trainer/videos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setDemo" }),
      });
      if (!res.ok) throw new Error("Failed");

      setVideos((current) => current.map((v) => ({ ...v, isDemo: v._id === id })));
    } catch (err) {
      alert("Failed to update demo video.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return;

    try {
      const res = await fetch(`/api/trainer/videos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setVideos((current) => current.filter((v) => v._id !== id));
    } catch (err) {
      alert("Failed to delete video.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors mb-6"
      >
        <Plus size={16} /> Upload Video
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setShowForm(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-black">Upload Video</h3>
              <button
                onClick={() => !saving && setShowForm(false)}
                className="text-gray-400 hover:text-black disabled:opacity-40"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Video File</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm file:font-medium hover:file:bg-gray-200 file:cursor-pointer"
                  />
                </div>
                {videoFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Thumbnail Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm file:font-medium hover:file:bg-gray-200 file:cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none"
                />
              </div>

              {!hasDemo && (
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  This will automatically become your free Demo video, since you don't have one yet.
                </p>
              )}

              <p className="text-xs text-gray-500 bg-yellow-50 rounded-lg px-3 py-2">
                All uploads are reviewed by an admin before appearing publicly.
              </p>

              {saving && (
                <p className="text-xs text-gray-500 text-center">
                  Uploading — this may take a moment for larger files...
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                <UploadIcon size={16} />
                {saving ? "Uploading..." : "Upload Video"}
              </button>
            </form>
          </div>
        </div>
      )}

      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No videos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
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
                {!video.isDemo && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-gray-700">
                    <Lock size={11} /> Locked
                  </span>
                )}
                <span
                  className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full capitalize ${
                    video.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : video.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {video.status}
                </span>
              </div>
              <div className="p-4">
                <p className="font-medium text-black text-sm mb-3 truncate">{video.title}</p>
                <div className="flex gap-2">
                  {!video.isDemo && (
                    <button
                      onClick={() => handleSetDemo(video._id)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:border-black transition-colors"
                    >
                      Make Demo
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FormField({ label, name, value, onChange, placeholder = "", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
      />
    </div>
  );
}