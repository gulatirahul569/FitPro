import { getDb } from "@/lib/db";

export async function getTrainerProfile(userId) {
  const db = await getDb();

  return db.collection("trainerProfiles").findOne({ userId });
}

export async function upsertTrainerProfile(userId, data) {
  const db = await getDb();

  await db.collection("trainerProfiles").updateOne(
    { userId },
    {
      $set: {
        ...data,
        userId,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return getTrainerProfile(userId);
}

export async function setProfileListingStatus(userId, isListed) {
  const db = await getDb();

  await db.collection("trainerProfiles").updateOne(
    { userId },
    {
      $set: {
        isListed,
        updatedAt: new Date(),
      },
    }
  );

  return getTrainerProfile(userId);
}

export async function listPublicTrainerProfiles() {
  const db = await getDb();

  return db
    .collection("trainerProfiles")
    .find({ isListed: true })
    .sort({ updatedAt: -1 })
    .toArray();
}

/* --------------------------------
   TRAINER SCHEDULE
--------------------------------- */

export function getDefaultSchedule() {
  return {
    monday: {
      enabled: false,
      start: "",
      end: "",
    },
    tuesday: {
      enabled: false,
      start: "",
      end: "",
    },
    wednesday: {
      enabled: false,
      start: "",
      end: "",
    },
    thursday: {
      enabled: false,
      start: "",
      end: "",
    },
    friday: {
      enabled: false,
      start: "",
      end: "",
    },
    saturday: {
      enabled: false,
      start: "",
      end: "",
    },
    sunday: {
      enabled: false,
      start: "",
      end: "",
    },
  };
}

export async function getTrainerSchedule(userId) {
  const db = await getDb();

  const profile = await db.collection("trainerProfiles").findOne(
    { userId },
    {
      projection: {
        schedule: 1,
      },
    }
  );

  return profile?.schedule || getDefaultSchedule();
}

export async function updateTrainerSchedule(userId, schedule) {
  const db = await getDb();

  await db.collection("trainerProfiles").updateOne(
    { userId },
    {
      $set: {
        schedule,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        userId,
      },
    },
    {
      upsert: true,
    }
  );

  return schedule;
}

export async function getAllTrainerProfilesMap() {
  const db = await getDb();
  const profiles = await db.collection("trainerProfiles").find({}).toArray();

  // Map keyed by userId for fast lookup when joining with the users list
  const map = new Map();
  profiles.forEach((p) => map.set(p.userId, p));
  return map;
}

export async function requestListing(userId) {
  const db = await getDb();

  const result = await db.collection("trainerProfiles").findOneAndUpdate(
    { userId },
    {
      $set: {
        listingStatus: "pending",
        listingRequestedAt: new Date(),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

export async function unlistProfile(userId) {
  const db = await getDb();

  const result = await db.collection("trainerProfiles").findOneAndUpdate(
    { userId },
    { $set: { isListed: false, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function republish(userId) {
  // Only for already-approved trainers turning visibility back on
  const db = await getDb();

  const result = await db.collection("trainerProfiles").findOneAndUpdate(
    { userId, listingStatus: "approved" },
    { $set: { isListed: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function getPendingListingRequests() {
  const db = await getDb();
  return db
    .collection("trainerProfiles")
    .find({ listingStatus: "pending" })
    .sort({ listingRequestedAt: 1 })
    .toArray();
}

export async function reviewListingRequest(userId, decision, adminId, adminNote = "") {
  const db = await getDb();

  const result = await db.collection("trainerProfiles").findOneAndUpdate(
    { userId, listingStatus: "pending" }, // only actionable if still pending
    {
      $set: {
        listingStatus: decision, // "approved" | "rejected"
        isListed: decision === "approved", // auto-publish on approval
        listingAdminNote: adminNote,
        listingReviewedAt: new Date(),
        listingReviewedBy: adminId,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

export async function countPendingListingRequests() {
  const db = await getDb();
  return db.collection("trainerProfiles").countDocuments({ listingStatus: "pending" });
}