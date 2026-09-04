import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// Shape reference:
// {
//   _id,
//   userId: string,
//   userName: string,
//   userEmail: string,
//   trainerId: string,
//   trainerName: string,
//   type: "demo" | "session",
//   date: string,        // "2026-09-10"
//   time: string,        // "5:00 PM"
//   status: "pending" | "confirmed" | "completed" | "cancelled",
//   createdAt: Date,
//   updatedAt: Date,
// }

export async function createBooking(data) {
  const db = await getDb();

  const result = await db.collection("bookings").insertOne({
    ...data,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return db.collection("bookings").findOne({ _id: result.insertedId });
}

export async function getBookingsByTrainer(trainerId) {
  const db = await getDb();
  return db
    .collection("bookings")
    .find({ trainerId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getBookingsByUser(userId) {
  const db = await getDb();
  return db
    .collection("bookings")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function updateBookingStatus(bookingId, trainerId, status) {
  const db = await getDb();

  // trainerId check ensures a trainer can only update their OWN bookings —
  // never trust the client to only send valid IDs, always scope by ownership
  const result = await db.collection("bookings").findOneAndUpdate(
    { _id: new ObjectId(bookingId), trainerId },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function getUniqueClientsForTrainer(trainerId) {
  const db = await getDb();

  const bookings = await db
    .collection("bookings")
    .find({ trainerId })
    .sort({ createdAt: 1 }) // oldest first, so "since" date is accurate
    .toArray();

  const clientsMap = new Map();

  for (const booking of bookings) {
    if (!clientsMap.has(booking.userId)) {
      clientsMap.set(booking.userId, {
        userId: booking.userId,
        name: booking.userName,
        email: booking.userEmail,
        since: booking.createdAt,
        totalBookings: 1,
        lastProgram: booking.type,
        status: "active",
      });
    } else {
      const client = clientsMap.get(booking.userId);
      client.totalBookings += 1;
      client.lastProgram = booking.type; // most recent, since we're iterating oldest→newest
    }
  }

  return Array.from(clientsMap.values()).sort(
    (a, b) => new Date(b.since) - new Date(a.since)
  );
}