import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// Shape reference (not enforced at runtime, just for your own clarity):
// {
//   _id: ObjectId,
//   name: string,
//   email: string,
//   password: string (hashed),
//   role: "user" | "trainer" | "admin",
//   createdAt: Date,
// }

export async function getUserByEmail(email) {
  const db = await getDb();
  return db.collection("users").findOne({ email: email.toLowerCase() });
}

export async function getUserById(id) {
  const db = await getDb();
  return db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function createUser({ name, email, hashedPassword, role = "user" }) {
  const db = await getDb();

  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("A user with this email already exists.");
  }

  const result = await db.collection("users").insertOne({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    createdAt: new Date(),
  });

  return result.insertedId;
}