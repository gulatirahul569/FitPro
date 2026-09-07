import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getTrainerProfile,
  requestListing,
  unlistProfile,
  republish,
} from "@/lib/models/trainerProfile";

const REQUIRED_FIELDS = ["specialization", "bio", "price", "location", "category"];

export async function POST(request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listed } = await request.json();
  const profile = await getTrainerProfile(session.user.id);

  // Turning OFF is always allowed instantly, no review needed
  if (!listed) {
    const updated = await unlistProfile(session.user.id);
    return NextResponse.json({ profile: updated });
  }

  // Turning ON — behavior depends on current listingStatus
  const missing = REQUIRED_FIELDS.filter((field) => !profile?.[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Please complete these fields first: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (profile?.listingStatus === "approved") {
    // Already vetted before — can go live again instantly
    const updated = await republish(session.user.id);
    return NextResponse.json({ profile: updated });
  }

  if (profile?.listingStatus === "pending") {
    return NextResponse.json(
      { error: "Your listing request is already pending admin review." },
      { status: 409 }
    );
  }

  // First-time request (or previously rejected) — goes to admin review
  const updated = await requestListing(session.user.id);
  return NextResponse.json({ profile: updated, requiresReview: true });
}