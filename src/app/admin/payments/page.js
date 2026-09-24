import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCompletedPaidBookings } from "@/lib/models/booking";
import { getDb } from "@/lib/db";
import {
  AlertTriangle,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";

export default async function AdminPaymentsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const completedBookings = await getCompletedPaidBookings();
  const db = await getDb();

  // Build a price lookup so we can estimate revenue per completed session
  const trainerIds = [
    ...new Set(completedBookings.map((booking) => booking.trainerId)),
  ];

  const profiles = await db
    .collection("trainerProfiles")
    .find({ userId: { $in: trainerIds } })
    .toArray();

  const priceMap = new Map(
    profiles.map((profile) => [profile.userId, Number(profile.price) || 0])
  );

  const enriched = completedBookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    createdAt: booking.createdAt?.toISOString(),
    estimatedAmount: priceMap.get(booking.trainerId) || 0,
  }));

  const totalEstimatedRevenue = enriched.reduce(
    (sum, booking) => sum + booking.estimatedAmount,
    0
  );

  // Per-trainer breakdown
  const trainerRevenueMap = new Map();

  enriched.forEach((booking) => {
    const current = trainerRevenueMap.get(booking.trainerId) || {
      trainerName: booking.trainerName,
      sessions: 0,
      revenue: 0,
    };

    current.sessions += 1;
    current.revenue += booking.estimatedAmount;

    trainerRevenueMap.set(booking.trainerId, current);
  });

  const trainerBreakdown = Array.from(trainerRevenueMap.values()).sort(
    (a, b) => b.revenue - a.revenue
  );

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Payments</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Estimated revenue from completed paid sessions.
        </p>
      </div>

      {/* Important payment notice */}
      <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 mb-8">
        <AlertTriangle
          size={18}
          className="mt-0.5 shrink-0 text-yellow-600"
        />

        <p className="text-sm leading-relaxed text-yellow-800">
          No payment gateway is connected yet. These figures are{" "}
          <strong>estimates</strong> — calculated as each trainer&apos;s
          listed monthly price × their completed paid sessions — not actual
          processed transactions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <IndianRupee size={20} className="text-green-600" />
          </div>

          <p className="text-2xl font-bold text-black break-words">
            ₹{totalEstimatedRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500">Estimated Total Revenue</p>
        </div>

        {/* Completed sessions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-blue-600" />
          </div>

          <p className="text-2xl font-bold text-black">{enriched.length}</p>
          <p className="text-sm text-gray-500">Completed Paid Sessions</p>
        </div>

        {/* Earning trainers */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 min-[420px]:col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Users size={20} className="text-purple-600" />
          </div>

          <p className="text-2xl font-bold text-black">
            {trainerBreakdown.length}
          </p>
          <p className="text-sm text-gray-500">Earning Trainers</p>
        </div>
      </div>

      {/* Revenue by trainer */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-black">Revenue by Trainer</h2>
        </div>

        {trainerBreakdown.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-gray-500 text-sm">
            No completed paid sessions yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {trainerBreakdown.map((trainer, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {trainer.trainerName?.charAt(0)?.toUpperCase() || "T"}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">
                      {trainer.trainerName || "Unknown Trainer"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {trainer.sessions} session
                      {trainer.sessions !== 1 ? "s" : ""} completed
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-semibold text-black text-sm sm:text-base">
                    ₹{trainer.revenue.toLocaleString("en-IN")}
                  </p>

                  <p className="text-[11px] text-gray-400 sm:hidden">
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