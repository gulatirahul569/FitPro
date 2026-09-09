import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllGyms } from "@/lib/models/gym";
import GymsManager from "./GymsManager";

export default async function AdminGymsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const gyms = await getAllGyms();

  const serialized = gyms.map((g) => ({
    ...g,
    _id: g._id.toString(),
    createdAt: g.createdAt?.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Gyms</h1>
        <p className="text-gray-500 mt-1">Manage the gyms listed on the platform.</p>
      </div>

      <GymsManager initialGyms={serialized} />
    </div>
  );
}