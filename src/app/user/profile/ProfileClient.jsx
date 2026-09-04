"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Shield,
} from "lucide-react";

export default function ProfileClient({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialProfile);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setForm(profile);
    setSuccess("");
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setSuccess("");
    setError("");
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          profileImage: form.profileImage,
          bio: form.bio,
          location: form.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }

      setProfile(data.user);
      setForm(data.user);
      setIsEditing(false);
      setSuccess("Profile updated successfully.");

    } catch (err) {
      console.error("Profile update error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">
                {getInitials(profile.name)}
              </div>
            )}

            <h2 className="text-lg font-semibold text-black mt-4">
              {profile.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {profile.email}
            </p>

            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium capitalize">
              <Shield size={13} />
              {profile.role}
            </span>
          </div>

          <div className="border-t border-gray-100 mt-6 pt-5 space-y-4">

            <div className="flex items-center gap-3 text-sm">
              <CalendarDays
                size={17}
                className="text-gray-400 shrink-0"
              />

              <div>
                <p className="text-xs text-gray-400">
                  Member Since
                </p>

                <p className="text-gray-700">
                  {formatDate(profile.createdAt)}
                </p>
              </div>
            </div>

            {profile.location && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin
                  size={17}
                  className="text-gray-400 shrink-0"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="text-gray-700">
                    {profile.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">

          {!isEditing ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your basic account information.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <InfoItem
                  icon={<User size={17} />}
                  label="Full Name"
                  value={profile.name}
                />

                <InfoItem
                  icon={<Mail size={17} />}
                  label="Email Address"
                  value={profile.email}
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Phone Number"
                  value={profile.phone || "Not added"}
                />

                <InfoItem
                  icon={<MapPin size={17} />}
                  label="Location"
                  value={profile.location || "Not added"}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  About Me
                </p>

                <p className="text-sm text-gray-500 leading-6">
                  {profile.bio || "No bio added yet."}
                </p>
              </div>
            </>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSubmit}>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-black">
                  Edit Profile
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update your personal information.
                </p>
              </div>

              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />

                  <p className="text-xs text-gray-400 mt-1.5">
                    Email address cannot be changed here.
                  </p>
                </div>

                {/* Phone + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Chandigarh"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                    />
                  </div>

                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL
                  </label>

                  <input
                    type="url"
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />

                  <p className="text-xs text-gray-400 mt-1.5">
                    Add an image URL for your profile photo.
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us a little about yourself..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />

                  <p className="text-xs text-gray-400 mt-1.5">
                    {form.bio?.length || 0}/500 characters
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-100">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  <Save size={16} />

                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        {icon}
        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="text-sm font-medium text-gray-800 break-words">
        {value}
      </p>
    </div>
  );
}

