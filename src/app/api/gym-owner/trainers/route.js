import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGymByOwnerId, getPendingTrainersForGym, getApprovedTrainersForGym } from "@/lib/models/gym";

export async function GET() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "gym-owner" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gym = await getGymByOwnerId(session.user.id);

  if (!gym) {
    return NextResponse.json({ pending: [], approved: [] });
  }

  const gymId = gym._id.toString();
  const [pending, approved] = await Promise.all([
    getPendingTrainersForGym(gymId),
    getApprovedTrainersForGym(gymId),
  ]);

  return NextResponse.json({ pending, approved });
}