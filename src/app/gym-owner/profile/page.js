import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getGymByOwnerId } from "@/lib/models/gym";
import GymProfileEditor from "./GymProfileEditor";
import { Building2 } from "lucide-react";

export default async function GymOwnerProfilePage() {
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">Gym Profile</h1>
      <p className="text-gray-500 mb-8">Manage how your gym appears on the public site.</p>

      <GymProfileEditor
        gym={{
          _id: gym._id.toString(),
          name: gym.name,
          location: gym.location,
          address: gym.address || "",
          description: gym.description || "",
          image: gym.image || "",
          amenities: gym.amenities || [],
          phone: gym.phone || "",
        }}
      />
    </div>
  );
}