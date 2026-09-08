import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getReviewsByTrainer, getTrainerRatingSummary } from "@/lib/models/review";
import StarRating from "@/components/ui/StarRating";

export default async function TrainerReviewsPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "trainer" && session.user.role !== "admin")) {
    redirect("/login");
  }

  const [reviews, summary] = await Promise.all([
    getReviewsByTrainer(session.user.id),
    getTrainerRatingSummary(session.user.id),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-1">Reviews</h1>
      <p className="text-gray-500 mb-8">See what your clients are saying.</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 flex items-center gap-8 flex-wrap">
        <div>
          <p className="text-4xl font-bold text-black mb-2">
            {summary.averageRating ?? "—"}
          </p>
          {summary.averageRating !== null && <StarRating rating={summary.averageRating} size={22} />}
          <p className="text-sm text-gray-500 mt-2">
            {summary.totalReviews} review{summary.totalReviews !== 1 && "s"}
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No reviews yet — they'll appear here once clients review completed sessions.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div key={review._id.toString()} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-black text-sm">{review.userName}</p>
                <StarRating rating={review.rating} size={14} />
              </div>
              {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}