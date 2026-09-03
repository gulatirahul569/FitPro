import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Users, Video, Wallet, TrendingUp } from "lucide-react";

export default async function TrainerDashboardPage() {
  const session = await auth();

  // Defense-in-depth: re-check role here even though proxy already gates this route
  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const stats = [
    { label: "Total Clients", value: "24", icon: Users },
    { label: "Videos Uploaded", value: "12", icon: Video },
    { label: "This Month's Earnings", value: "₹18,400", icon: Wallet },
    { label: "Profile Views", value: "342", icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">
        Welcome back, {session.user.name?.split(" ")[0]}
      </h1>
      <p className="text-gray-500 mb-8">Here's what's happening with your training business.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-200 p-5"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                <Icon size={20} className="text-black" />
              </div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-black mb-4">Recent Bookings</h2>
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">No bookings yet — this will populate once the booking system is connected.</p>
        </div>
      </div>
    </div>
  );
}