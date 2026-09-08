import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCompletedPaidBookings } from "@/lib/models/booking";
import { getDb } from "@/lib/db";
import { AlertTriangle, IndianRupee, TrendingUp, Users } from "lucide-react";

export default async function AdminPaymentsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const completedBookings = await getCompletedPaidBookings();
  const db = await getDb();

  // Build a price lookup so we can estimate revenue per completed session
  const trainerIds = [...new Set(completedBookings.map((b) => b.trainerId))];
  const profiles = await db
    .collection("trainerProfiles")
    .find({ userId: { $in: trainerIds } })
    .toArray();
  const priceMap = new Map(profiles.map((p) => [p.userId, Number(p.price) || 0]));

  const enriched = completedBookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toISOString(),
    estimatedAmount: priceMap.get(b.trainerId) || 0,
  }));

  const totalEstimatedRevenue = enriched.reduce((sum, b) => sum + b.estimatedAmount, 0);

  // Per-trainer breakdown
  const trainerRevenueMap = new Map();
  enriched.forEach((b) => {
    const current = trainerRevenueMap.get(b.trainerId) || {
      trainerName: b.trainerName,
      sessions: 0,
      revenue: 0,
    };
    current.sessions += 1;
    current.revenue += b.estimatedAmount;
    trainerRevenueMap.set(b.trainerId, current);
  });
  const trainerBreakdown = Array.from(trainerRevenueMap.values()).sort(
    (a, b) => b.revenue - a.revenue
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Payments</h1>
        <p className="text-gray-500 mt-1">Estimated revenue from completed paid sessions.</p>
      </div>

      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
        <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          No payment gateway is connected yet. These figures are <strong>estimates</strong> —
          calculated as each trainer's listed monthly price × their completed paid sessions —
          not actual processed transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <IndianRupee size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">₹{totalEstimatedRevenue.toLocaleString("en-IN")}</p>
          <p className="text-sm text-gray-500">Estimated Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{enriched.length}</p>
          <p className="text-sm text-gray-500">Completed Paid Sessions</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Users size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{trainerBreakdown.length}</p>
          <p className="text-sm text-gray-500">Earning Trainers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-black">Revenue by Trainer</h2>
        </div>

        {trainerBreakdown.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No completed paid sessions yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {trainerBreakdown.map((t, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    {t.trainerName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-black text-sm">{t.trainerName}</p>
                    <p className="text-xs text-gray-500">
                      {t.sessions} session{t.sessions !== 1 && "s"} completed
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-black">₹{t.revenue.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}