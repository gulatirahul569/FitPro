import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Calendar,
  Wallet,
  Star,
  Video,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

export default async function TrainerDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const firstName = session.user.name?.split(" ")[0];

  // Dummy data — will be replaced with real MongoDB queries once backend APIs are built
  const stats = [
    { label: "Total Clients", value: "24", icon: Users, change: "+3 this month" },
    { label: "Active Programs", value: "6", icon: Video, change: "2 in draft" },
    { label: "Upcoming Sessions", value: "8", icon: Calendar, change: "Next: Today, 5 PM" },
    { label: "This Month's Earnings", value: "₹18,400", icon: Wallet, change: "+12% vs last month" },
  ];

  const recentBookings = [
    { client: "Ananya Verma", type: "1-on-1 Strength Session", time: "Today, 5:00 PM", status: "confirmed" },
    { client: "Rohan Mehta", type: "Free Demo Call", time: "Tomorrow, 9:00 AM", status: "pending" },
    { client: "Priya Nair", type: "Monthly Check-in", time: "Fri, 11:00 AM", status: "confirmed" },
  ];

  const recentReviews = [
    { client: "Ananya Verma", rating: 5, comment: "Best trainer I've worked with — sessions are always well-structured." },
    { client: "Karan Bedi", rating: 4, comment: "Great communication and flexible scheduling." },
  ];

  const quickActions = [
    { label: "Upload Video", href: "/trainer/videos", icon: Video },
    { label: "View Schedule", href: "/trainer/schedule", icon: Clock },
    { label: "Manage Clients", href: "/trainer/clients", icon: Users },
  ];

  return (
    <div>
      {/* Profile summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
            {firstName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Welcome back, {firstName}</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your training business.</p>
          </div>
        </div>

        <div className="flex gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-black hover:border-black transition-colors"
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon size={20} className="text-black" />
                </div>
              </div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">Recent Bookings</h2>
            <Link
              href="/trainer/bookings"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-gray-100">
            {recentBookings.map((booking, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-black text-sm">{booking.client}</p>
                  <p className="text-xs text-gray-500">{booking.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">{booking.time}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reviews */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-black">Recent Reviews</h2>
            <Link
              href="/trainer/reviews"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentReviews.map((review, i) => (
              <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-black text-sm">{review.client}</p>
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}