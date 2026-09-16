import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getVideosByTrainer } from "@/lib/models/video";
import { getTrainerProfile } from "@/lib/models/trainerProfile";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import TrainerVideoReview from "./TrainerVideoReview";

export default async function AdminTrainerVideosPage({ params }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const { trainerId } = await params;

  const [videos, profile] = await Promise.all([
    getVideosByTrainer(trainerId),
    getTrainerProfile(trainerId),
  ]);

  if (videos.length === 0 && !profile) {
    return notFound();
  }

  const serialized = videos.map((v) => ({ ...v, _id: v._id.toString() }));
  const trainerName = videos[0]?.trainerName || profile?.name || "Trainer";

  return (
    <div>
      <Link
        href="/admin/videos"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Videos
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
          {profile?.photo ? (
            <img src={profile.photo} alt={trainerName} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xl font-bold text-gray-300">
              {trainerName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">{trainerName}</h1>
          {profile?.specialization && (
            <p className="text-gray-500 text-sm">{profile.specialization}</p>
          )}
          {profile?.location && (
            <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <MapPin size={11} /> {profile.location}
            </p>
          )}
        </div>
      </div>

      <TrainerVideoReview initialVideos={serialized} />
    </div>
  );
}