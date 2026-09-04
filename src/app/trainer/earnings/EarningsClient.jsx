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
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
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
    },
    {
      title: "This Month",
      value: `₹${earnings.thisMonthEarnings.toLocaleString("en-IN")}`,
      description: "Completed paid sessions",
      icon: TrendingUp,
    },
    {
      title: "Price / Session",
      value: `₹${earnings.pricePerSession.toLocaleString("en-IN")}`,
      description: "Current profile price",
      icon: IndianRupee,
    },
    {
      title: "Completed Sessions",
      value: earnings.completedSessions,
      description: `${earnings.paidCompletedSessions} paid sessions`,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Earnings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your estimated earnings and completed sessions.
        </p>
      </div>

      {/* Estimated Earnings Notice */}
      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

        <div>
          <p className="font-medium text-blue-900">
            Estimated Earnings
          </p>

          <p className="mt-1 text-sm text-blue-700">
            These earnings are calculated from completed paid
            sessions using your current session price. Actual
            payments will be tracked once payment integration is
            added.
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {card.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-gray-100 p-3">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Booking Status */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Session Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            icon={CheckCircle2}
            title="Completed"
            value={earnings.completedSessions}
          />

          <StatusCard
            icon={CalendarCheck}
            title="Confirmed"
            value={earnings.confirmedSessions}
          />

          <StatusCard
            icon={Clock3}
            title="Pending"
            value={earnings.pendingSessions}
          />

          <StatusCard
            icon={XCircle}
            title="Cancelled"
            value={earnings.cancelledSessions}
          />
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              This Month
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Completed sessions this month
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-2xl font-bold text-gray-900">
              {earnings.thisMonthSessions}
            </p>

            <p className="text-sm text-gray-500">
              total completed
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Paid Sessions
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              {earnings.thisMonthPaidSessions}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Monthly Earnings
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-900">
              ₹{earnings.thisMonthEarnings.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Completed Sessions */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Completed Sessions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest completed sessions and estimated earnings.
          </p>
        </div>

        {earnings.recentBookings.length === 0 ? (
          <div className="p-10 text-center">
            <Wallet className="mx-auto h-10 w-10 text-gray-300" />

            <h3 className="mt-3 font-medium text-gray-900">
              No completed sessions yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your completed sessions will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {earnings.recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {booking.clientName || "Client"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {booking.clientEmail}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
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

                <div className="sm:text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{booking.amount.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Estimated
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="rounded-xl bg-gray-100 p-3">
        <Icon className="h-5 w-5 text-gray-700" />
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <p className="text-xl font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}