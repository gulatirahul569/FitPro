import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateBookingStatus } from "@/lib/models/booking";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!["confirmed", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = await updateBookingStatus(id, session.user.id, status);

  if (!updated) {
    return NextResponse.json(
      { error: "Booking not found or you don't have permission to update it." },
      { status: 404 }
    );
  }

  return NextResponse.json({ booking: updated });
}