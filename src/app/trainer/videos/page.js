import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getVideosByTrainer } from "@/lib/models/video";
import TrainerVideosList from "./TrainerVideosList";
import Reveal from "@/components/ui/Reveal";
import { Play } from "lucide-react";

export const metadata = {
  title: "My Videos | FitPro Trainer",
  description: "Manage and preview your uploaded training videos.",
};

export default async function TrainerVideosPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const videos = await getVideosByTrainer(session.user.id);

  const serialized = videos.map((v) => ({
    ...v,
    _id: v._id.toString(),
  }));

  return (
    <div>
      <Reveal>
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-black">My Videos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Preview and manage all videos you’ve uploaded. One can be your free
            demo; the rest are locked until a client books a paid session.
          </p>
        </div>
      </Reveal>

      {serialized.length === 0 ? (
        <Reveal delay={80}>
          <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-gray-100 px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-sm">
              <Play size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-black">
              No videos uploaded yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
              Upload your first workout video from the Videos Manager to start
              building your library.
            </p>

            <a
              href="/trainer/dashboard"
              className="mt-6 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
            >
              Go to Videos Manager
            </a>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serialized.map((video, index) => (
            <Reveal key={video._id} delay={Math.min(index * 80, 400)}>
              <TrainerVideosList video={video} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}