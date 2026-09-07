import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewListingRequest } from "@/lib/models/trainerProfile";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await params;
  const { decision, adminNote } = await request.json();

  if (!["approved", "rejected"].includes(decision)) {
    return NextResponse.json({ error: "Invalid decision." }, { status: 400 });
  }

  const updated = await reviewListingRequest(userId, decision, session.user.id, adminNote);

  if (!updated) {
    return NextResponse.json(
      { error: "Request not found or already reviewed." },
      { status: 404 }
    );
  }

  return NextResponse.json({ profile: updated });
}