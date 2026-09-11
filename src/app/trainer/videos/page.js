import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getVideosByTrainer } from "@/lib/models/video";
import VideosManager from "./VideosManager";

export default async function TrainerVideosPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const videos = await getVideosByTrainer(session.user.id);
  const serialized = videos.map((v) => ({ ...v, _id: v._id.toString() }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">My Videos</h1>
        <p className="text-gray-500 mt-1">
          One video can be your free "Demo" — everything else is locked until a client books a paid session.
        </p>
      </div>

      <VideosManager initialVideos={serialized} />
    </div>
  );
}