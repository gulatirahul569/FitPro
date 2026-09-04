import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { getTrainerProfile, setProfileListingStatus } from "@/lib/models/trainerProfile";

const REQUIRED_FIELDS = ["specialization", "bio", "price", "location", "category"];

export async function POST(request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listed } = await request.json();

  if (listed) {
    const profile = await getTrainerProfile(session.user.id);
    const missing = REQUIRED_FIELDS.filter((field) => !profile?.[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Please complete these fields before listing your profile: ${missing.join(", ")}` },
        { status: 400 }
      );
    }
  }

  const updated = await setProfileListingStatus(session.user.id, listed);
  return NextResponse.json({ profile: updated });
}