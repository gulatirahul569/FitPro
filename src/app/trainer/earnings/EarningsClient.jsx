"use client";

import { useEffect, useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
  Wallet,
} from "lucide-react";

export default function EarningsClient() {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEarnings() {
      try {
        const response = await fetch("/api/trainer/earnings");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load earnings.");
        }

        setEarnings(data.earnings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadEarnings();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-0 sm:p-6">
        {error}
      </div>
    );
  }

  if (!earnings) {
    return null;
  }

  const statCards = [
    {
      title: "Total Earnings",
      value: `₹${earnings.totalEarnings.toLocaleString("en-IN")}`,
      description: "From completed paid sessions",
      icon: Wallet,
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "This Month",
      value: `₹${earnings.thisMonthEarnings.toLocaleString("en-IN")}`,
      description: "Completed paid sessions",
      icon: TrendingUp,
      iconColor: "bg-green-50 text-green-600",
    },
    {
      title: "Price / Session",
      value: `₹${earnings.pricePerSession.toLocaleString("en-IN")}`,
      description: "Current profile price",
      icon: IndianRupee,
      iconColor: "bg-purple-50 text-purple-600",
    },
    {
      title: "Completed Sessions",
      value: earnings.completedSessions,
      description: `${earnings.paidCompletedSessions} paid sessions`,
      icon: CheckCircle2,
      iconColor: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5  pb-6 sm:space-y-6 sm:px-6 lg:px-0">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Earnings
        </h1>

        <p className="mt-1 text-sm leading-relaxed text-gray-500">
          Track your estimated earnings and completed sessions.
        </p>
      </div>

      {/* Estimated earnings notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

        <div className="min-w-0">
          <p className="font-medium text-blue-900">
            Estimated Earnings
          </p>

          <p className="mt-1 text-sm leading-relaxed text-blue-700">
            These earnings are calculated from completed paid sessions using
            your current session price. Actual payments will be tracked once
            payment integration is added.
          </p>
        </div>
      </div>

      {/* Main statistics */}
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 truncate text-sm font-bold text-gray-900 sm:text-2xl">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${card.iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Session overview */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
          Session Overview
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatusCard
            icon={CheckCircle2}
            title="Completed"
            value={earnings.completedSessions}
            iconClassName="bg-green-50 text-green-600"
          />

          <StatusCard
            icon={CalendarCheck}
            title="Confirmed"
            value={earnings.confirmedSessions}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <StatusCard
            icon={Clock3}
            title="Pending"
            value={earnings.pendingSessions}
            iconClassName="bg-yellow-50 text-yellow-600"
          />

          <StatusCard
            icon={XCircle}
            title="Cancelled"
            value={earnings.cancelledSessions}
            iconClassName="bg-red-50 text-red-600"
          />
        </div>
      </div>

      {/* Monthly summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              This Month
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Completed sessions this month
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-2xl font-bold text-gray-900">
              {earnings.thisMonthSessions}
            </p>

            <p className="text-xs text-gray-500 sm:text-sm">
              completed
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Paid Sessions</p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              {earnings.thisMonthPaidSessions}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Monthly Earnings</p>

            <p className="mt-1 break-words text-xl font-semibold text-gray-900">
              ₹{earnings.thisMonthEarnings.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Recent sessions */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            Recent Completed Sessions
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Your latest completed sessions and estimated earnings.
          </p>
        </div>

        {earnings.recentBookings.length === 0 ? (
          <div className="p-8 text-center sm:p-10">
            <Wallet className="mx-auto h-10 w-10 text-gray-300" />

            <h3 className="mt-3 font-medium text-gray-900">
              No completed sessions yet
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Your completed sessions will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {earnings.recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-gray-900">
                      {booking.clientName || "Client"}
                    </h3>

                    <p className="mt-0.5 truncate text-sm text-gray-500">
                      {booking.clientEmail}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-base font-semibold text-gray-900 sm:text-lg">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Estimated
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      booking.type === "session"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {booking.type === "session"
                      ? "Paid Session"
                      : "Free Demo"}
                  </span>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
                    {booking.date}
                  </span>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
                    {booking.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, title, value, iconClassName }) {
  return (
    <div className="min-w-0 flex gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-4 sm:p-4">
      <div
        className={`mb-2 inline-flex rounded-xl p-2.5 sm:mb-0 sm:p-3 ${iconClassName}`}
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs text-gray-500 sm:text-sm">
          {title}
        </p>

        <p className="text-lg font-bold text-gray-900 sm:text-xl">
          {value}
        </p>
      </div>
    </div>
  );
}