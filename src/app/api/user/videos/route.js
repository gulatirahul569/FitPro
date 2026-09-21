import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = await getDb();

  // 1) Get all paid session bookings for this user
  const bookings = await db
    .collection("bookings")
    .find({
      userId,
      type: "session", // paid session, not demo
      status: { $in: ["confirmed", "completed"] },
    })
    .toArray();

  const trainerIds = [...new Set(bookings.map((b) => b.trainerId))];

  if (trainerIds.length === 0) {
    return NextResponse.json({ videos: [] });
  }

  // 2) Get all approved videos from those trainers
  const videos = await db
    .collection("trainerVideos")
    .find({
      trainerId: { $in: trainerIds },
      status: "approved",
    })
    .sort({ createdAt: -1 })
    .toArray();

  // 3) Serialize for client
  const serialized = videos.map((v) => ({
    id: v._id.toString(),
    trainerId: v.trainerId,
    trainerName: v.trainerName,
    title: v.title,
    description: v.description || "",
    videoUrl: v.videoUrl,
    thumbnail: v.thumbnail || "",
    isDemo: !!v.isDemo,
    status: v.status,
  }));

  return NextResponse.json({ videos: serialized });
}