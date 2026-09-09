"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2, MapPin } from "lucide-react";

const emptyForm = {
  name: "",
  location: "",
  address: "",
  description: "",
  image: "",
  amenitiesInput: "",
  phone: "",
};

export default function GymsManager({ initialGyms }) {
  const [gyms, setGyms] = useState(initialGyms);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (gym) => {
    setForm({
      name: gym.name,
      location: gym.location,
      address: gym.address || "",
      description: gym.description || "",
      image: gym.image || "",
      amenitiesInput: (gym.amenities || []).join(", "),
      phone: gym.phone || "",
    });
    setEditingId(gym._id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const amenities = form.amenitiesInput
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const payload = {
      name: form.name,
      location: form.location,
      address: form.address,
      description: form.description,
      image: form.image,
      amenities,
      phone: form.phone,
    };

    try {
      const url = editingId ? `/api/admin/gyms/${editingId}` : "/api/admin/gyms";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editingId) {
        setGyms((current) =>
          current.map((g) => (g._id === editingId ? { ...g, ...data.gym, amenities } : g))
        );
      } else {
        setGyms((current) => [{ ...data.gym, _id: data.gym._id.toString() }, ...current]);
      }

      setShowForm(false);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this gym? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/gyms/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setGyms((current) => current.filter((g) => g._id !== id));
    } catch (err) {
      alert("Failed to delete gym.");
    }
  };

  return (
    <div>
      <button
        onClick={openCreateForm}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors mb-6"
      >
        <Plus size={16} />
        Add Gym
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-black">
                {editingId ? "Edit Gym" : "Add New Gym"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Gym Name" name="name" value={form.name} onChange={handleChange} required />
              <FormField label="Location (City)" name="location" value={form.location} onChange={handleChange} required />
              <FormField label="Full Address" name="address" value={form.address} onChange={handleChange} />
              <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <FormField
                label="Amenities (comma-separated)"
                name="amenitiesInput"
                value={form.amenitiesInput}
                onChange={handleChange}
                placeholder="e.g. Pool, Sauna, Free Parking"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Gym"}
              </button>
            </form>
          </div>
        </div>
      )}

      {gyms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No gyms added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gyms.map((gym) => (
            <div key={gym._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="h-36 bg-gray-100">
                {gym.image ? (
                  <img src={gym.image} alt={gym.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-300 text-3xl font-bold">
                    {gym.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-black">{gym.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-3">
                  <MapPin size={12} /> {gym.location}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(gym)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:border-black transition-colors"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(gym._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} /> Delete
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