import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ScheduleClient from "./ScheduleClient";

export default async function TrainerSchedulePage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" &&
      session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  return <ScheduleClient />;
}