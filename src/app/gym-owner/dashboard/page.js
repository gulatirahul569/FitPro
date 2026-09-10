import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getGymByOwnerId } from "@/lib/models/gym";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { Building2, Users, Clock, ArrowRight } from "lucide-react";

export default async function GymOwnerDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <Building2 size={32} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">
          No gym is currently assigned to your account. Contact an admin.
        </p>
      </div>
    );
  }

  const db = await getDb();
  const approvedTrainers = await db
    .collection("trainerProfiles")
    .countDocuments({ gymId: gym._id.toString(), gymStatus: "approved" });
  const pendingRequests = await db
    .collection("trainerProfiles")
    .countDocuments({ gymId: gym._id.toString(), gymStatus: "pending" });

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          {gym.image ? (
            <img src={gym.image} alt={gym.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Building2 size={22} className="text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">{gym.name}</h1>
          <p className="text-gray-500 text-sm">{gym.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <Link
          href="/gym-owner/trainers"
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Users size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{approvedTrainers}</p>
          <p className="text-sm text-gray-500">Approved Trainers</p>
        </Link>

        <Link
          href="/gym-owner/trainers"
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center mb-3">
            <Clock size={20} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-black">{pendingRequests}</p>
          <p className="text-sm text-gray-500">Pending Trainer Requests</p>
        </Link>
      </div>

      {pendingRequests > 0 && (
        <div className="bg-black text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm">
            You have {pendingRequests} trainer{pendingRequests !== 1 && "s"} waiting for approval to join{" "}
            {gym.name}.
          </p>
          <Link
            href="/gym-owner/trainers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors shrink-0"
          >
            Review Requests <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}