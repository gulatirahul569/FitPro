import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/models/user";
import ProfileClient from "./ProfileClient";

export default async function UserProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  const profile = {
    id: user._id.toString(),
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
    phone: user.phone || "",
    profileImage: user.profileImage || "",
    bio: user.bio || "",
    location: user.location || "",
    createdAt: user.createdAt
      ? user.createdAt.toISOString()
      : null,
  };

  return <ProfileClient initialProfile={profile} />;
}

