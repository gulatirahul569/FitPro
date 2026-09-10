import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGymByOwnerId, reviewGymTrainerRequest } from "@/lib/models/gym";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return NextResponse.json({ error: "No gym assigned to your account." }, { status: 404 });
  }

  const { userId } = await params;
  const { decision } = await request.json();

  if (!["approved", "rejected"].includes(decision)) {
    return NextResponse.json({ error: "Invalid decision." }, { status: 400 });
  }

  const updated = await reviewGymTrainerRequest(userId, gym._id.toString(), decision);

  if (!updated) {
    return NextResponse.json({ error: "Request not found or already reviewed." }, { status: 404 });
  }

  return NextResponse.json({ profile: updated });
}