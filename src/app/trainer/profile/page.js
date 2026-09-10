import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getTrainerProfile } from "@/lib/models/trainerProfile";
import { getGymById } from "@/lib/models/gym";
import ProfileView from "./ProfileView";

export default async function TrainerProfilePage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const existingProfile = await getTrainerProfile(session.user.id);

  let gym = null;
  if (existingProfile?.gymId) {
    gym = await getGymById(existingProfile.gymId);
  }

  const initialData = {
    name: session.user.name || "",
    email: session.user.email || "",
    photo: existingProfile?.photo || "",
    phone: existingProfile?.phone || "",
    specialization: existingProfile?.specialization || "",
    category: existingProfile?.category || "",
    experience: existingProfile?.experience || "",
    certification: existingProfile?.certification || "",
    location: existingProfile?.location || "",
    price: existingProfile?.price || "",
    bio: existingProfile?.bio || "",
    specialties: existingProfile?.specialties || [],
    availability: existingProfile?.availability || "",
    isListed: existingProfile?.isListed || false,
    listingStatus: existingProfile?.listingStatus || "draft",
    listingAdminNote: existingProfile?.listingAdminNote || "",
    gymId: existingProfile?.gymId || "",
    gymStatus: existingProfile?.gymStatus || null,
    gymName: gym?.name || null,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">My Profile</h1>
      <p className="text-gray-500 mb-8">
        This is exactly how your profile appears to clients browsing trainers.
      </p>

      <ProfileView initialData={initialData} />
    </div>
  );
}