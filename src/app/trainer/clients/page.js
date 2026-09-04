import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getUniqueClientsForTrainer } from "@/lib/models/booking";
import ClientsList from "./ClientsList";

export default async function TrainerClientsPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const clients = await getUniqueClientsForTrainer(session.user.id);

  return (
    <div>
      <ClientsList clients={clients} />
    </div>
  );
}