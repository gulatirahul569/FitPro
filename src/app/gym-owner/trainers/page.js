import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getGymByOwnerId, getPendingTrainersForGym, getApprovedTrainersForGym } from "@/lib/models/gym";
import { Building2 } from "lucide-react";
import TrainerRequestsList from "./TrainerRequestsList";

export default async function GymOwnerTrainersPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <Building2 size={32} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">No gym is currently assigned to your account.</p>
      </div>
    );
  }

  const gymId = gym._id.toString();
  const [pending, approved] = await Promise.all([
    getPendingTrainersForGym(gymId),
    getApprovedTrainersForGym(gymId),
  ]);

  const serialize = (arr) =>
    arr.map((t) => ({
      ...t,
      _id: t._id.toString(),
      updatedAt: t.updatedAt?.toISOString(),
    }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">Trainer Requests</h1>
      <p className="text-gray-500 mb-8">Trainers requesting affiliation with {gym.name}.</p>

      <TrainerRequestsList
        initialPending={serialize(pending)}
        initialApproved={serialize(approved)}
      />
    </div>
  );
}