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