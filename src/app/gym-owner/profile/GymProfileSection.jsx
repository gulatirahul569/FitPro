"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Edit2, ExternalLink } from "lucide-react";
import GymProfileEditor from "./GymProfileEditor";

export default function GymProfileSection({ gym }) {
  const [editing, setEditing] = useState(false);

  const handleSaved = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <GymProfileEditor
        gym={gym}
        onSaved={handleSaved}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-black">
            <Building2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-black">{gym.name}</h2>
            <p className="text-xs text-gray-500">Your gym profile</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`/gyms/${gym._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:border-black"
          >
            <ExternalLink size={16} />
            Go to live profile
          </a>

          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            <Edit2 size={16} />
            Edit
          </button>
        </div>
      </div>

      {/* Image */}
      {gym.image ? (
        <div className="mb-6 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={gym.image}
            alt={gym.name}
            className="h-56 w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-6 flex h-56 items-center justify-center rounded-2xl bg-gray-100 text-5xl font-black text-gray-300">
          {gym.name?.charAt(0)?.toUpperCase()}
        </div>
      )}

      {/* Details */}
      <div className="space-y-5">
        <DetailRow
          icon={MapPin}
          label="Location"
          value={gym.location || "—"}
        />

        <DetailRow
          icon={MapPin}
          label="Address"
          value={gym.address || "—"}
        />

        <DetailRow
          icon={Phone}
          label="Phone"
          value={gym.phone || "—"}
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Description
          </p>
          <p className="mt-1 text-sm leading-6 text-black/70">
            {gym.description || "No description added yet."}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Amenities
          </p>
          {gym.amenities?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {gym.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-black"
                >
                  {a}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-black/50">No amenities listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-black/80">
          {value}
        </p>
      </div>
    </div>
  );
}