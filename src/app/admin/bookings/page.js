import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllBookings } from "@/lib/models/booking";
import AdminBookingsTable from "@/components/admin/AdminBookingsTable";

export default async function AdminBookingsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const bookings = await getAllBookings();

  const serialized = bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toISOString(),
  }));

  const stats = {
    total: serialized.length,
    pending: serialized.filter((b) => b.status === "pending").length,
    confirmed: serialized.filter((b) => b.status === "confirmed").length,
    completed: serialized.filter((b) => b.status === "completed").length,
    cancelled: serialized.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Bookings</h1>
        <p className="text-gray-500 mt-1">Platform-wide view of all trainer bookings.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
        <StatCard label="Confirmed" value={stats.confirmed} color="text-blue-600" />
        <StatCard label="Completed" value={stats.completed} color="text-green-600" />
        <StatCard label="Cancelled" value={stats.cancelled} color="text-gray-400" />
      </div>

      <AdminBookingsTable bookings={serialized} />
    </div>
  );
}

function StatCard({ label, value, color = "text-black" }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}