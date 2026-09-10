"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function GymProfileEditor({ gym }) {
  const [form, setForm] = useState({
    ...gym,
    amenitiesInput: gym.amenities.join(", "),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const amenities = form.amenitiesInput
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/gym-owner/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: form.location,
          address: form.address,
          description: form.description,
          image: form.image,
          amenities,
          phone: form.phone,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Gym profile updated successfully.");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 max-w-2xl">
      {message && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          {message}
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Gym Name</label>
        <input
          type="text"
          value={form.name}
          disabled
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-gray-400 mt-1">Name changes require admin approval — contact support.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <Field label="Location (City)" name="location" value={form.location} onChange={handleChange} />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div className="mb-5">
        <Field label="Full Address" name="address" value={form.address} onChange={handleChange} />
      </div>

      <div className="mb-5">
        <Field label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className="mb-5">
        <Field
          label="Amenities (comma-separated)"
          name="amenitiesInput"
          value={form.amenitiesInput}
          onChange={handleChange}
          placeholder="e.g. Pool, Sauna, Free Parking"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
      >
        <Save size={18} />
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
      />
    </div>
  );
}