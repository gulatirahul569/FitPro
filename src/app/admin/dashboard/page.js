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
  Building2,
  Video,
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
    totalGyms,
    pendingApplications,
    pendingListingRequests,
    allBookings,
    completedPaidBookings,
    recentApplications,
    totalReviews,
    pendingVideos,
    recentBookings,
    recentGyms,
  ] = await Promise.all([
    db.collection("users").countDocuments(),
    db.collection("users").countDocuments({ role: "trainer" }),
    db.collection("gyms").countDocuments(),
    db
      .collection("trainerApplications")
      .countDocuments({ status: "pending" })
      .catch(() => 0),
    countPendingListingRequests().catch(() => 0),
    getAllBookings(),
    getCompletedPaidBookings(),
    db
      .collection("trainerApplications")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),
    db.collection("reviews").countDocuments().catch(() => 0),
    db
      .collection("trainerVideos")
      .countDocuments({ status: "pending" })
      .catch(() => 0),
    db.collection("bookings").find({}).sort({ createdAt: -1 }).limit(3).toArray(),
    db.collection("gyms").find({}).sort({ createdAt: -1 }).limit(3).toArray(),
  ]);

  const trainerIds = [...new Set(completedPaidBookings.map((b) => b.trainerId))];

  const profiles = await db
    .collection("trainerProfiles")
    .find({ userId: { $in: trainerIds } })
    .toArray();

  const priceMap = new Map(
    profiles.map((profile) => [profile.userId, Number(profile.price) || 0])
  );

  const estimatedRevenue = completedPaidBookings.reduce(
    (sum, booking) => sum + (priceMap.get(booking.trainerId) || 0),
    0
  );

  const pendingBookings = allBookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      iconColor: "text-blue-600",
      href: "/admin/users",
    },
    {
      label: "Total Trainers",
      value: totalTrainers,
      icon: Dumbbell,
      iconColor: "text-orange-500",
      href: "/admin/trainers",
    },
    {
      label: "Total Gyms",
      value: totalGyms,
      icon: Building2,
      iconColor: "text-purple-600",
      href: "/admin/gyms",
    },
    {
      label: "Pending Applications",
      value: pendingApplications,
      icon: ClipboardList,
      iconColor: "text-yellow-600",
      href: "/admin/applications",
    },
    {
      label: "Listing Requests",
      value: pendingListingRequests,
      icon: ClipboardCheck,
      iconColor: "text-cyan-600",
      href: "/admin/listing-requests",
    },
    {
      label: "Pending Videos",
      value: pendingVideos,
      icon: Video,
      iconColor: "text-red-500",
      href: "/admin/videos",
    },
    {
      label: "Total Bookings",
      value: allBookings.length,
      icon: Calendar,
      iconColor: "text-indigo-600",
      href: "/admin/bookings",
    },
    {
      label: "Est. Revenue",
      value: `₹${estimatedRevenue.toLocaleString("en-IN")}`,
      icon: CreditCard,
      iconColor: "text-green-600",
      href: "/admin/payments",
    },
  ];

  const activity = recentApplications.map((app) => ({
    type: "application",
    text: `${app.name} applied to become a trainer`,
    time: app.createdAt,
    status: app.status,
  }));

  const bookingsList = recentBookings.map((b) => ({
    _id: b._id.toString(),
    userName: b.userName || "User",
    trainerName: b.trainerName || "Trainer",
    type: b.type,
    status: b.status,
    date: b.date,
    time: b.time,
    createdAt: b.createdAt,
  }));

  const gymsList = recentGyms.map((g) => ({
    _id: g._id.toString(),
    name: g.name,
    location: g.location,
    createdAt: g.createdAt,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">
        Welcome, {session.user.name?.split(" ")[0]}
      </h1>

      <p className="text-gray-500 mb-8">
        Here&apos;s an overview of the FitPro platform.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white flex gap-5 items-center rounded-2xl border border-gray-200 p-4 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center   group-hover:text-white transition-colors duration-500">
                <Icon
                  size={20}
                  className={`${stat.iconColor} ${stat.hoverIconColor}`}
                />
              </div>
            <div>
              <p className="text-xl font-bold text-black">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Row 1: Recent Applications + Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">
              Recent Applications
            </h2>

            <Link
              href="/admin/applications"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14}  />
            </Link>
          </div>

          {activity.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No applications yet.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <p className="text-sm text-black">{item.text}</p>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                        item.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : item.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="text-[10px] text-gray-400">
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

        {/* Platform Health */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">
              Platform Health
            </h2>
            <span className="text-xs text-gray-400">Live overview</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={15} className="text-indigo-600" />
                Pending Bookings
              </span>
              <span className="font-semibold text-black">{pendingBookings}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Star size={15} className="text-yellow-500" />
                Total Reviews
              </span>
              <span className="font-semibold text-black">{totalReviews}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Users size={15} className="text-blue-600" />
                Regular Users
              </span>
              <span className="font-semibold text-black">
                {Math.max(0, totalUsers - totalTrainers - 1)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Building2 size={15} className="text-purple-600" />
                Partner Gyms
              </span>
              <span className="font-semibold text-black">{totalGyms}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Video size={15} className="text-red-500" />
                Pending Videos
              </span>
              <span className="font-semibold text-black">{pendingVideos}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Bookings + Recent Gyms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">
              Recent Bookings
            </h2>

            <Link
              href="/admin/bookings"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14}  />
            </Link>
          </div>

          {bookingsList.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No bookings yet.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {bookingsList.map((booking) => (
                <div key={booking._id} className="py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">
                        {booking.userName} → {booking.trainerName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {booking.type === "session" ? "Paid" : "Demo"} •{" "}
                        {booking.date}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                        booking.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : booking.status === "confirmed"
                          ? "bg-blue-50 text-blue-700"
                          : booking.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">Recent Gyms</h2>

            <Link
              href="/admin/gyms"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14}  />
            </Link>
          </div>

          {gymsList.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No gyms added yet.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {gymsList.map((gym) => (
                <div key={gym._id} className="py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">{gym.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {gym.location}
                      </p>
                    </div>

                    <span className="text-[10px] text-gray-400">
                      {new Date(gym.createdAt).toLocaleDateString("en-IN", {
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
      </div>
    </div>
  );
}