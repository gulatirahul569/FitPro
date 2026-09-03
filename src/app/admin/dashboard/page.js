import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { Users, Dumbbell, ClipboardList, CreditCard } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  // Pull real counts from MongoDB
  const db = await getDb();
  const totalUsers = await db.collection("users").countDocuments();
  const totalTrainers = await db
    .collection("users")
    .countDocuments({ role: "trainer" });
  const pendingApplications = await db
    .collection("trainerApplications")
    .countDocuments({ status: "pending" })
    .catch(() => 0); // collection may not exist yet — that's fine

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Total Trainers", value: totalTrainers, icon: Dumbbell },
    { label: "Pending Applications", value: pendingApplications, icon: ClipboardList },
    { label: "This Month's Revenue", value: "₹0", icon: CreditCard },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">
        Welcome, {session.user.name?.split(" ")[0]}
      </h1>
      <p className="text-gray-500 mb-8">Here's an overview of the FitPro platform.</p>

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
        <h2 className="text-lg font-semibold text-black mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">
            Activity feed will populate here once bookings, payments, and applications start coming in.
          </p>
        </div>
      </div>
    </div>
  );
}