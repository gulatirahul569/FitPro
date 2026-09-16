import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getVideosGroupedByTrainer } from "@/lib/models/video";
import TrainerVideoCards from "./TrainerVideoCards";

export default async function AdminVideosPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const grouped = await getVideosGroupedByTrainer();

  const serialized = grouped.map((g) => ({
    ...g,
    videos: g.videos.map((v) => ({ ...v, _id: v._id.toString() })),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Videos</h1>
        <p className="text-gray-500 mt-1">Review trainer-uploaded videos, organized by trainer.</p>
      </div>

      <TrainerVideoCards trainerGroups={serialized} />
    </div>
  );
}