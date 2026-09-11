import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getVideosByTrainer, createVideo } from "@/lib/models/video";

export async function GET() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videos = await getVideosByTrainer(session.user.id);
  return NextResponse.json({ videos });
}

export async function POST(request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, videoUrl, thumbnail, isDemo } = body;

  if (!title || !videoUrl) {
    return NextResponse.json({ error: "Title and video URL are required." }, { status: 400 });
  }

  const video = await createVideo({
    trainerId: session.user.id,
    trainerName: session.user.name,
    title,
    description: description || "",
    videoUrl,
    thumbnail: thumbnail || "",
    isDemo: !!isDemo,
  });

  return NextResponse.json({ video }, { status: 201 });
}