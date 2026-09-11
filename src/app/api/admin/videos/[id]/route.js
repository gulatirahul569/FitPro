import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewVideo } from "@/lib/models/video";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { decision, adminNote } = await request.json();

  if (!["approved", "rejected"].includes(decision)) {
    return NextResponse.json({ error: "Invalid decision." }, { status: 400 });
  }

  const updated = await reviewVideo(id, decision, session.user.id, adminNote || "");

  if (!updated) {
    return NextResponse.json({ error: "Video not found or already reviewed." }, { status: 404 });
  }

  return NextResponse.json({ video: updated });
}