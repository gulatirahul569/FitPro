"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

export default function TrainerRequestsList({ initialPending, initialApproved }) {
  const [pending, setPending] = useState(initialPending);
  const [approved, setApproved] = useState(initialApproved);
  const [loadingId, setLoadingId] = useState(null);

  const handleDecision = async (userId, decision) => {
    setLoadingId(userId);

    try {
      const res = await fetch(`/api/gym-owner/trainers/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const trainer = pending.find((t) => t.userId === userId);
      setPending((current) => current.filter((t) => t.userId !== userId));

      if (decision === "approved" && trainer) {
        setApproved((current) => [{ ...trainer, gymStatus: "approved" }, ...current]);
      }
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Pending requests */}
      <div>
        <h2 className="text-lg font-semibold text-black mb-4">
          Pending Requests ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
            No pending requests.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((trainer) => (
              <div
                key={trainer.userId}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {trainer.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-black text-sm">{trainer.name}</p>
                  <p className="text-xs text-gray-500">
                    {trainer.specialization} • {trainer.experience}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/trainers/${trainer.userId}`}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium hover:border-black transition-colors"
                  >
                    View <ExternalLink size={12} />
                  </Link>
                  <button
                    onClick={() => handleDecision(trainer.userId, "approved")}
                    disabled={loadingId === trainer.userId}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    <CheckCircle2 size={13} /> Approve
                  </button>
                  <button
                    onClick={() => handleDecision(trainer.userId, "rejected")}
                    disabled={loadingId === trainer.userId}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved trainers */}
      <div>
        <h2 className="text-lg font-semibold text-black mb-4">
          Approved Trainers ({approved.length})
        </h2>

        {approved.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
            No approved trainers yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approved.map((trainer) => (
              <div
                key={trainer.userId}
                className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {trainer.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-black text-sm truncate">{trainer.name}</p>
                  <p className="text-xs text-gray-500 truncate">{trainer.specialization}</p>
                </div>
                <Link
                  href={`/trainers/${trainer.userId}`}
                  target="_blank"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}