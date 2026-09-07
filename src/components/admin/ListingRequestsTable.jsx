"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

export default function ListingRequestsTable({ requests }) {
  const [items, setItems] = useState(requests);
  const [loadingId, setLoadingId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});

  const handleDecision = async (userId, decision) => {
    setLoadingId(userId);

    try {
      const res = await fetch(`/api/admin/listing-requests/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, adminNote: noteDrafts[userId] || "" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Remove from the pending list once resolved
      setItems((current) => current.filter((r) => r.userId !== userId));
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
        No pending listing requests.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((req) => (
        <div key={req.userId} className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
                {req.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-black">{req.name}</p>
                <p className="text-sm text-gray-500">{req.email}</p>
              </div>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700">
              Pending Review
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Specialization</p>
              <p className="text-black font-medium">{req.specialization}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Location</p>
              <p className="text-black font-medium">{req.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Price</p>
              <p className="text-black font-medium">₹{req.price}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Certification</p>
              <p className="text-black font-medium">{req.certification || "—"}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Bio</p>
            <p className="text-sm text-gray-700 leading-relaxed">{req.bio}</p>
          </div>

          <input
            type="text"
            placeholder="Admin note (optional, e.g. reason for rejection)"
            value={noteDrafts[req.userId] || ""}
            onChange={(e) =>
              setNoteDrafts({ ...noteDrafts, [req.userId]: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black transition-all"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDecision(req.userId, "approved")}
              disabled={loadingId === req.userId}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              <CheckCircle2 size={15} />
              Approve & Go Live
            </button>
            <button
              onClick={() => handleDecision(req.userId, "rejected")}
              disabled={loadingId === req.userId}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              <XCircle size={15} />
              Reject
            </button>
            <Link
              href={`mailto:${req.email}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:border-black transition-colors ml-auto"
            >
              Contact Trainer
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 