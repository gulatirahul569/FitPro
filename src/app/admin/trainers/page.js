import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getAllTrainerProfilesMap } from "@/lib/models/trainerProfile";
import TrainersTable from "@/components/admin/TrainersTable";

export default async function AdminTrainersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const db = await getDb();
  const trainerUsers = await db
    .collection("users")
    .find({ role: "trainer" })
    .sort({ createdAt: -1 })
    .toArray();

  const profilesMap = await getAllTrainerProfilesMap();

  const trainers = trainerUsers.map((user) => {
    const profile = profilesMap.get(user._id.toString());

    return {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      joined: user.createdAt?.toISOString(),
      hasProfile: !!profile,
      isListed: profile?.isListed || false,
      specialization: profile?.specialization || null,
      price: profile?.price || null,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Trainers</h1>
        <p className="text-gray-500 mt-1">
          {trainers.length} trainer{trainers.length !== 1 && "s"} on the platform.
        </p>
      </div>

      <TrainersTable trainers={trainers} />
    </div>
  );
}