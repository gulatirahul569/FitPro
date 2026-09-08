import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/settings/SettingsClient";

export default async function TrainerSettingsPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  return <SettingsClient />;
}