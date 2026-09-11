import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllVideosForAdmin } from "@/lib/models/video";
import AdminVideosReview from "./AdminVideosReview";

export default async function AdminVideosPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const videos = await getAllVideosForAdmin();
  const serialized = videos.map((v) => ({
    ...v,
    _id: v._id.toString(),
    createdAt: v.createdAt?.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Videos</h1>
        <p className="text-gray-500 mt-1">Review trainer-uploaded videos before they go public.</p>
      </div>

      <AdminVideosReview initialVideos={serialized} />
    </div>
  );
}