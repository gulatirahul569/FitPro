import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// Shape:
// {
//   _id,
//   bookingId: string,
//   userId: string,
//   userName: string,
//   trainerId: string,
//   rating: number (1-5),
//   comment: string,
//   createdAt: Date,
// }

export async function getReviewByBookingId(bookingId) {
  const db = await getDb();
  return db.collection("reviews").findOne({ bookingId });
}

export async function createReview(data) {
  const db = await getDb();

  const result = await db.collection("reviews").insertOne({
    ...data,
    createdAt: new Date(),
  });

  return db.collection("reviews").findOne({ _id: result.insertedId });
}

export async function getReviewsByTrainer(trainerId) {
  const db = await getDb();
  return db
    .collection("reviews")
    .find({ trainerId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getTrainerRatingSummary(trainerId) {
  const db = await getDb();
  const reviews = await db.collection("reviews").find({ trainerId }).toArray();

  if (reviews.length === 0) {
    return { averageRating: null, totalReviews: 0 };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    averageRating: Math.round((sum / reviews.length) * 10) / 10, // one decimal
    totalReviews: reviews.length,
  };
}