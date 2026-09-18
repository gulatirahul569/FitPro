import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getGymByOwnerId } from "@/lib/models/gym";
import GymProfileSection from "./GymProfileSection";
import { Building2 } from "lucide-react";

export default async function GymOwnerProfilePage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "gym-owner" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const gym = await getGymByOwnerId(session.user.id);

  let gymData = null;

  if (gym) {
    gymData = {
      _id: gym._id.toString(),
      name: gym.name,
      location: gym.location,
      address: gym.address || "",
      description: gym.description || "",
      image: gym.image || "",
      amenities: gym.amenities || [],
      phone: gym.phone || "",
    };
  }

  return (
    <div className="space-y-10">
      {/* Basic profile info (optional, you can keep your existing UI here) */}
      <div>
        <h1 className="text-2xl font-bold text-black mb-1">Profile</h1>
        <p className="text-gray-500 mb-6">
          Manage your account and gym details.
        </p>

        {/* You can add name, email, etc. here if you want */}
      </div>

      {/* Gym profile section */}
      {!gymData ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Building2 size={32} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            No gym is currently assigned to your account.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Contact support to be assigned to a gym.
          </p>
        </div>
      ) : (
        <GymProfileSection gym={gymData} />
      )}
    </div>
  );
}