"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ApplicationActions({ application }) {
  const router = useRouter();
  const [adminNote, setAdminNote] = useState(application.adminNote || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPending = application.status === "pending";

  const handleAction = async (status) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/applications/${application._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  if (!isPending) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
        <p className="text-sm text-gray-500">
          This application has already been {application.status}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="font-semibold text-black mb-4">Review Application</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Admin Note (optional)
      </label>
      <textarea
        rows={4}
        value={adminNote}
        onChange={(e) => setAdminNote(e.target.value)}
        placeholder="Add a note visible to the applicant, e.g. reason for rejection..."
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none mb-4 text-sm"
      />

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleAction("approved")}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          <CheckCircle2 size={16} />
          {loading ? "Processing..." : "Approve Application"}
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          <XCircle size={16} />
          {loading ? "Processing..." : "Reject Application"}
        </button>
      </div>
    </div>
  );
}