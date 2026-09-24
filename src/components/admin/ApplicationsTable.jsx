"use client";

import { useState } from "react";
import Link from "next/link";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ApplicationsTable({ applications }) {
  const [items, setItems] = useState(applications);
  const [loadingId, setLoadingId] = useState(null);

  const updateApplication = async (id, status) => {
    setLoadingId(id);

    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setItems((current) =>
        current.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      alert(error.message || "Unable to update the application.");
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 text-center">
        <p className="text-sm text-gray-500">No trainer applications yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Mobile card layout */}
      <div className="divide-y divide-gray-100 md:hidden">
        {items.map((application) => {
          const isLoading = loadingId === application._id;

          return (
            <div key={application._id} className="p-4 sm:p-5">
              {/* Applicant */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <p className="font-semibold text-black text-sm truncate">
                    {application.name || "Unnamed Applicant"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 truncate">
                    {application.email || "No email provided"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                    statusStyles[application.status] || statusStyles.pending
                  }`}
                >
                  {application.status}
                </span>
              </div>

              {/* Application details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Specialization
                  </p>
                  <p className="text-sm text-gray-700 break-words">
                    {application.specialization || "—"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Experience
                  </p>
                  <p className="text-sm text-gray-700">
                    {application.experience
                      ? `${application.experience} years`
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Link
                  href={`/admin/applications/${application._id}`}
                  className="flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2.5 text-xs font-semibold text-black transition-colors hover:border-black"
                >
                  View Details
                </Link>

                {application.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        updateApplication(application._id, "approved")
                      }
                      disabled={isLoading}
                      className="rounded-lg bg-black px-3 py-2.5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? "Updating..." : "Approve"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateApplication(application._id, "rejected")
                      }
                      disabled={isLoading}
                      className="rounded-lg border border-red-200 px-3 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide">
                Applicant
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide">
                Specialization
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide">
                Experience
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((application) => {
              const isLoading = loadingId === application._id;

              return (
                <tr
                  key={application._id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-black">
                      {application.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {application.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-700">
                    {application.specialization || "—"}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-700">
                    {application.experience
                      ? `${application.experience} years`
                      : "—"}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusStyles[application.status] ||
                        statusStyles.pending
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/applications/${application._id}`}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-black transition-colors hover:border-black"
                      >
                        View
                      </Link>

                      {application.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              updateApplication(application._id, "approved")
                            }
                            disabled={isLoading}
                            className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isLoading ? "Updating..." : "Approve"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateApplication(application._id, "rejected")
                            }
                            disabled={isLoading}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 