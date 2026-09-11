import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllVideosForAdmin } from "@/lib/models/video";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videos = await getAllVideosForAdmin();
  return NextResponse.json({ videos });
}