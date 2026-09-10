import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/settings/SettingsClient";

export default async function GymOwnerSettingsPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    redirect("/login");
  }

  return <SettingsClient />;
}