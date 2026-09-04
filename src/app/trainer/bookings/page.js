import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getBookingsByTrainer } from "@/lib/models/booking";
import BookingsList from "./BookingsList";

export default async function TrainerBookingsPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const bookings = await getBookingsByTrainer(session.user.id);

  return (
    <div>
      <BookingsList bookings={bookings} />
    </div>
  );
}