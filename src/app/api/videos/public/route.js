import { NextResponse } from "next/server";
import { getAllTrainersWithDemoVideos } from "@/lib/models/video";

export async function GET() {
  const demoVideos = await getAllTrainersWithDemoVideos();

  const videos = demoVideos.map((v) => ({
    id: v._id.toString(),
    title: v.title,
    trainer: v.trainerName,
    trainerId: v.trainerId,
    thumbnail: v.thumbnail || "",
    videoUrl: v.videoUrl,
    description: v.description || "",
    rating: 5.0, // placeholder until video-specific ratings exist
    duration: "—",
    views: "New",
    isDbVideo: true,
  }));

  return NextResponse.json({ videos });
}