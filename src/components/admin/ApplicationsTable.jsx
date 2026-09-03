"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApplicationsTable({ applications }) {
  const [items, setItems] = useState(applications);
  const [loadingId, setLoadingId] = useState(null);

  const updateApplication = async (id, status) => {
    setLoadingId(id);

    try {
      const response = await fetch(
        `/api/admin/applications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setItems((current) =>
        current.map((item) =>
          item._id === id
            ? { ...item, status }
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">
          No trainer applications yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

      <div className="overflow-x-auto">

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

            {items.map((application) => (
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

                <td className="px-6 py-5 text-sm">
                  {application.specialization}
                </td>

                <td className="px-6 py-5 text-sm">
                  {application.experience} years
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      application.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : application.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {application.status}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Link
                      href={`/admin/applications/${application._id}`}
                      className="border border-gray-200 px-3 py-2 text-xs font-semibold hover:border-black"
                    >
                      View
                    </Link>

                    {application.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateApplication(
                              application._id,
                              "approved"
                            )
                          }
                          disabled={loadingId === application._id}
                          className="bg-black px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateApplication(
                              application._id,
                              "rejected"
                            )
                          }
                          disabled={loadingId === application._id}
                          className="border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}