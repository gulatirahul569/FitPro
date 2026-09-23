import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  getReviewsByTrainer,
  getTrainerRatingSummary,
} from "@/lib/models/review";
import StarRating from "@/components/ui/StarRating";

export default async function TrainerReviewsPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const [reviews, summary] = await Promise.all([
    getReviewsByTrainer(session.user.id),
    getTrainerRatingSummary(session.user.id),
  ]);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">Reviews</h1>

      <p className="mb-8 text-gray-500">
        See what your clients are saying.
      </p>

      {/* Rating summary */}
      <div className="mb-8 flex flex-wrap items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-50">
          <p className="text-3xl font-bold text-black">
            {summary.averageRating ?? "—"}
          </p>
        </div>

        <div>
          {summary.averageRating !== null ? (
            <StarRating rating={summary.averageRating} size={22} />
          ) : (
            <p className="text-sm text-gray-400">No ratings yet</p>
          )}

          <p className="mt-2 text-sm text-gray-500">
            Based on {summary.totalReviews} review
            {summary.totalReviews !== 1 && "s"}
          </p>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          No reviews yet — they&apos;ll appear here once clients review
          completed sessions.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => {
            const initials = review.userName
              ? review.userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "U";

            return (
              <div
                key={review._id.toString()}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Client avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-black">
                          {review.userName || "Anonymous Client"}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          Reviewed on{" "}
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size={15} />

                        <span className="text-sm font-medium text-gray-600">
                          {Number(review.rating).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {review.comment ? (
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">
                        “{review.comment}”
                      </p>
                    ) : (
                      <p className="mt-4 text-sm italic text-gray-400">
                        This client gave a rating without a written review.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}