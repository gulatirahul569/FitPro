import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// Shape:
// {
//   _id,
//   trainerId: string,
//   trainerName: string,
//   title: string,
//   description: string,
//   videoUrl: string,
//   thumbnail: string,
//   isDemo: boolean,   // only one true per trainer at a time
//   createdAt: Date,
//   updatedAt: Date,
// }

export async function getVideosByTrainer(trainerId) {
  const db = await getDb();
  return db
    .collection("trainerVideos")
    .find({ trainerId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getVideoById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db.collection("trainerVideos").findOne({ _id: new ObjectId(id) });
}

export async function createVideo(data) {
  const db = await getDb();

  if (data.isDemo) {
    await db.collection("trainerVideos").updateMany(
      { trainerId: data.trainerId, isDemo: true },
      { $set: { isDemo: false } }
    );
  }

  const result = await db.collection("trainerVideos").insertOne({
    ...data,
    status: "pending", // every upload starts pending admin review
    adminNote: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    reviewedAt: null,
    reviewedBy: null,
  });

  return db.collection("trainerVideos").findOne({ _id: result.insertedId });
}
export async function setAsDemo(videoId, trainerId) {
  if (!ObjectId.isValid(videoId)) return null;
  const db = await getDb();

  // Unset current demo, then set the new one — scoped to this trainer only
  await db.collection("trainerVideos").updateMany(
    { trainerId, isDemo: true },
    { $set: { isDemo: false } }
  );

  const result = await db.collection("trainerVideos").findOneAndUpdate(
    { _id: new ObjectId(videoId), trainerId },
    { $set: { isDemo: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function deleteVideo(id, trainerId) {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db.collection("trainerVideos").deleteOne({
    _id: new ObjectId(id),
    trainerId, // ownership check
  });
  return result.deletedCount > 0;
}

export async function getDemoVideoByTrainer(trainerId) {
  const db = await getDb();
  return db.collection("trainerVideos").findOne({ trainerId, isDemo: true });
}

// One card per trainer who has at least a demo video — powers /videos
export async function getAllTrainersWithDemoVideos() {
  const db = await getDb();
  return db
    .collection("trainerVideos")
    .find({ isDemo: true, status: "approved" })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getAllVideosForAdmin(statusFilter = null) {
  const db = await getDb();
  const query = statusFilter ? { status: statusFilter } : {};
  return db.collection("trainerVideos").find(query).sort({ createdAt: -1 }).toArray();
}

export async function reviewVideo(videoId, decision, adminId, adminNote = "") {
  if (!ObjectId.isValid(videoId)) return null;
  const db = await getDb();

  const result = await db.collection("trainerVideos").findOneAndUpdate(
    { _id: new ObjectId(videoId), status: "pending" },
    {
      $set: {
        status: decision,
        adminNote,
        reviewedAt: new Date(),
        reviewedBy: adminId,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

export async function getApprovedVideoById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db.collection("trainerVideos").findOne({ _id: new ObjectId(id), status: "approved" });
}