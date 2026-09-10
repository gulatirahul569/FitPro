import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// Shape:
// {
//   _id,
//   name: string,
//   location: string,
//   address: string,
//   description: string,
//   image: string,
//   amenities: string[],
//   phone: string,
//   ownerId: string | null,
//   createdAt: Date,
//   updatedAt: Date,
// }

export async function getAllGyms() {
  const db = await getDb();
  return db.collection("gyms").find({}).sort({ createdAt: -1 }).toArray();
}

export async function getGymById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db.collection("gyms").findOne({ _id: new ObjectId(id) });
}

export async function createGym(data) {
  const db = await getDb();

  const result = await db.collection("gyms").insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return db.collection("gyms").findOne({ _id: result.insertedId });
}

export async function updateGym(id, data) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();

  const result = await db.collection("gyms").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function deleteGym(id) {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db.collection("gyms").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function assignGymOwner(gymId, ownerId) {
  const db = await getDb();

  const result = await db.collection("gyms").findOneAndUpdate(
    { _id: new ObjectId(gymId) },
    { $set: { ownerId, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function getGymByOwnerId(ownerId) {
  const db = await getDb();
  return db.collection("gyms").findOne({ ownerId });
}

// Only returns trainers who are both publicly listed AND approved by this
// specific gym — used on the public /gyms/[id] page
export async function getTrainersByGymId(gymId) {
  const db = await getDb();
  return db
    .collection("trainerProfiles")
    .find({ gymId, isListed: true, gymStatus: "approved" })
    .toArray();
}

export async function getPendingTrainersForGym(gymId) {
  const db = await getDb();
  return db
    .collection("trainerProfiles")
    .find({ gymId, gymStatus: "pending" })
    .toArray();
}

export async function getApprovedTrainersForGym(gymId) {
  const db = await getDb();
  return db
    .collection("trainerProfiles")
    .find({ gymId, gymStatus: "approved" })
    .toArray();
}

export async function reviewGymTrainerRequest(userId, gymId, decision) {
  const db = await getDb();

  // Scoped by both userId AND gymId AND current status="pending" — a gym
  // owner literally cannot approve/reject a trainer for a DIFFERENT gym,
  // even if they guessed a valid userId
  const result = await db.collection("trainerProfiles").findOneAndUpdate(
    { userId, gymId, gymStatus: "pending" },
    { $set: { gymStatus: decision, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}