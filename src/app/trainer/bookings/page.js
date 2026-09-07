import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getBookingsByTrainer } from "@/lib/models/booking";
import BookingsList from "./BookingsList";

export default async function TrainerBookingsPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const bookings = await getBookingsByTrainer(session.user.id);

  const serialized = bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toISOString(),
    updatedAt: b.updatedAt?.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">Bookings</h1>
      <p className="text-gray-500 mb-8">
        {serialized.length} booking{serialized.length !== 1 && "s"} total
      </p>

      <BookingsList initialBookings={serialized} />
    </div>
  );
}