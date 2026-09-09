import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { countPendingListingRequests } from "@/lib/models/trainerProfile";
import { getAllBookings, getCompletedPaidBookings } from "@/lib/models/booking";
import Link from "next/link";
import {
  Users,
  Dumbbell,
  ClipboardList,
  ClipboardCheck,
  CreditCard,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const db = await getDb();

  const [
    totalUsers,
    totalTrainers,
    pendingApplications,
    pendingListingRequests,
    allBookings,
    completedPaidBookings,
    recentApplications,
    totalReviews,
  ] = await Promise.all([
    db.collection("users").countDocuments(),
    db.collection("users").countDocuments({ role: "trainer" }),
    db.collection("trainerApplications").countDocuments({ status: "pending" }).catch(() => 0),
    countPendingListingRequests().catch(() => 0),
    getAllBookings(),
    getCompletedPaidBookings(),
    db
      .collection("trainerApplications")
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray(),
    db.collection("reviews").countDocuments().catch(() => 0),
  ]);

  // Estimated revenue: same logic as the Payments page
  const trainerIds = [...new Set(completedPaidBookings.map((b) => b.trainerId))];
  const profiles = await db
    .collection("trainerProfiles")
    .find({ userId: { $in: trainerIds } })
    .toArray();
  const priceMap = new Map(profiles.map((p) => [p.userId, Number(p.price) || 0]));
  const estimatedRevenue = completedPaidBookings.reduce(
    (sum, b) => sum + (priceMap.get(b.trainerId) || 0),
    0
  );

  const pendingBookings = allBookings.filter((b) => b.status === "pending").length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, href: "/admin/users" },
    { label: "Total Trainers", value: totalTrainers, icon: Dumbbell, href: "/admin/trainers" },
    { label: "Pending Applications", value: pendingApplications, icon: ClipboardList, href: "/admin/applications" },
    { label: "Pending Listing Requests", value: pendingListingRequests, icon: ClipboardCheck, href: "/admin/listing-requests" },
    { label: "Total Bookings", value: allBookings.length, icon: Calendar, href: "/admin/bookings" },
    { label: "Est. Revenue", value: `₹${estimatedRevenue.toLocaleString("en-IN")}`, icon: CreditCard, href: "/admin/payments" },
  ];

  // Build a simple unified recent-activity feed from applications
  const activity = recentApplications.map((app) => ({
    type: "application",
    text: `${app.name} applied to become a trainer`,
    time: app.createdAt,
    status: app.status,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">
        Welcome, {session.user.name?.split(" ")[0]}
      </h1>
      <p className="text-gray-500 mb-8">Here's an overview of the FitPro platform.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                <Icon size={20} className="text-black" />
              </div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">Recent Applications</h2>
            <Link
              href="/admin/applications"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {activity.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No applications yet.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <p className="text-sm text-black">{item.text}</p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                        item.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : item.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.time).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats sidebar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-black mb-5">Platform Health</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={15} /> Pending Bookings
              </span>
              <span className="font-semibold text-black">{pendingBookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Star size={15} /> Total Reviews
              </span>
              <span className="font-semibold text-black">{totalReviews}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Users size={15} /> Regular Users
              </span>
              <span className="font-semibold text-black">{totalUsers - totalTrainers - 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}