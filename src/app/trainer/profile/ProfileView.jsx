"use client";

import { useState } from "react";
import { Star, MapPin, Clock, CheckCircle2, BadgeCheck, Pencil, Globe, EyeOff } from "lucide-react";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileView({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [listingError, setListingError] = useState("");

  const hasProfileData = data.specialization || data.bio;

  const handleToggleListing = async () => {
    setListingLoading(true);
    setListingError("");

    try {
      const res = await fetch("/api/trainer/profile/toggle-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listed: !data.isListed }),
      });

      const result = await res.json();

      if (!res.ok) {
        setListingError(result.error || "Something went wrong.");
        return;
      }

      setData({ ...data, isListed: result.profile.isListed });
    } catch (err) {
      setListingError("Something went wrong. Please try again.");
    } finally {
      setListingLoading(false);
    }
  };

  if (isEditing) {
    return (
      <ProfileEditForm
        initialData={data}
        onCancel={() => setIsEditing(false)}
        onSaved={(updated) => {
          setData(updated);
          setIsEditing(false);
        }}
      />
    );
  }

  if (!hasProfileData) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
        <p className="text-gray-500 text-sm mb-4">
          You haven't completed your trainer profile yet — clients can't find you until you do.
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Pencil size={15} />
          Complete Your Profile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: main content, mirrors public /trainers/[id] layout */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="w-full sm:w-56 h-64 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
              {data.photo ? (
                <img src={data.photo} alt={data.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300">
                  {data.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-black">{data.name}</h2>
                <BadgeCheck size={20} className="text-black" />
              </div>
              <p className="text-lg text-gray-600 mb-4">{data.specialization}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                  <span className="font-medium text-black">New</span> — no ratings yet
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {data.location || "Not set"}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {data.experience || "Not set"}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-black mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{data.bio || "No bio added yet."}</p>
          </div>

          {data.specialties?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-black mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-3">
                {data.specialties.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50"
                  >
                    <CheckCircle2 size={15} className="text-black" />
                    <span className="text-sm font-medium text-black">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Availability</h3>
            <div className="rounded-2xl border border-gray-200 p-5 flex items-center gap-3">
              <Clock size={18} className="text-gray-500" />
              <p className="text-gray-700">{data.availability || "Not set"}</p>
            </div>
          </div>
        </div>

        {/* Right: summary + edit/listing actions instead of booking buttons */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Your listed price</p>
            <p className="text-3xl font-bold text-black mb-6">
              {data.price ? `₹${data.price}` : "—"}
              <span className="text-base font-normal text-gray-500">/month</span>
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors mb-3"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

            <button
              onClick={handleToggleListing}
              disabled={listingLoading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors mb-3 disabled:opacity-60 ${
                data.isListed
                  ? "border border-gray-300 text-gray-700 hover:border-gray-400"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {data.isListed ? <EyeOff size={16} /> : <Globe size={16} />}
              {listingLoading
                ? "Updating..."
                : data.isListed
                ? "Unlist from Trainers Page"
                : "List My Profile"}
            </button>

            {data.isListed && (
              <p className="text-xs text-green-600 text-center mb-3">
                ✓ Live on the public Trainers page
              </p>
            )}

            {listingError && (
              <p className="text-xs text-red-600 text-center mb-3">{listingError}</p>
            )}

            <div className="border-t border-gray-100 mt-6 pt-6 space-y-3 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="text-black font-medium">{data.phone || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>Certification</span>
                <span className="text-black font-medium text-right">{data.certification || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span className="text-black font-medium">{data.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}