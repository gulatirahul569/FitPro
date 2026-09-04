"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Award, Briefcase, IndianRupee, ImageIcon, Clock, Save, X } from "lucide-react";

const categories = [
  { label: "Select a category", value: "" },
  { label: "Muscle Building", value: "muscle-building" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Yoga & Mobility", value: "yoga-mobility" },
  { label: "Fitness & Cardio", value: "fitness-cardio" },
];

export default function ProfileEditForm({ initialData, onCancel, onSaved }) {
  const [form, setForm] = useState({
    ...initialData,
    specialtiesInput: initialData.specialties?.join(", ") || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const specialties = form.specialtiesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      photo: form.photo,
      phone: form.phone,
      specialization: form.specialization,
      category: form.category,
      experience: form.experience,
      certification: form.certification,
      location: form.location,
      price: form.price,
      bio: form.bio,
      specialties,
      availability: form.availability,
    };

    try {
      const res = await fetch("/api/trainer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      onSaved({ ...form, specialties });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8"
    >
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <Field label="Full Name" name="name" icon={User} value={form.name} onChange={handleChange} disabled />
        <Field label="Email" name="email" icon={Mail} value={form.email} onChange={handleChange} disabled />
        <Field label="Photo URL" name="photo" icon={ImageIcon} value={form.photo} onChange={handleChange} placeholder="https://..." />
        <Field label="Phone" name="phone" icon={Phone} value={form.phone} onChange={handleChange} />
        <Field label="Location" name="location" icon={MapPin} value={form.location} onChange={handleChange} />
        <Field label="Specialization" name="specialization" icon={Award} value={form.specialization} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <Field label="Experience" name="experience" icon={Briefcase} value={form.experience} onChange={handleChange} placeholder="e.g. 5 years" />
        <Field label="Certification" name="certification" icon={Award} value={form.certification} onChange={handleChange} />
        <Field label="Monthly Price (₹)" name="price" icon={IndianRupee} value={form.price} onChange={handleChange} />
        <Field label="Availability" name="availability" icon={Clock} value={form.availability} onChange={handleChange} placeholder="e.g. Mon–Sat, 6 AM – 8 PM" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Specialties (comma-separated)
        </label>
        <input
          type="text"
          name="specialtiesInput"
          value={form.specialtiesInput}
          onChange={handleChange}
          placeholder="e.g. Strength Training, Injury Prevention, Nutrition Coaching"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
        <textarea
          name="bio"
          rows={4}
          value={form.bio}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors"
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, icon: Icon, value, onChange, disabled = false, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all ${
            disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
}