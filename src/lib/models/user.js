import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

// User shape:
//
// {
//   _id: ObjectId,
//   name: string,
//   email: string,
//   password: string,
//   role: "user" | "trainer" | "admin",
//   phone?: string,
//   profileImage?: string,
//   bio?: string,
//   location?: string,
//   createdAt: Date,
// }

export async function getUserByEmail(email) {
  const db = await getDb();

  return db.collection("users").findOne({
    email: email.toLowerCase(),
  });
}

export async function getUserById(id) {
  const db = await getDb();

  return db.collection("users").findOne({
    _id: new ObjectId(id),
  });
}

export async function createUser({
  name,
  email,
  hashedPassword,
  role = "user",
}) {
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

    // Optional profile fields
    phone: "",
    profileImage: "",
    bio: "",
    location: "",

    createdAt: new Date(),
  });

  return result.insertedId;
}

export async function updateUserProfile(userId, data) {
  const db = await getDb();

  const allowedFields = {
    name: data.name,
    phone: data.phone,
    profileImage: data.profileImage,
    bio: data.bio,
    location: data.location,
  };

  // Remove undefined values
  Object.keys(allowedFields).forEach((key) => {
    if (allowedFields[key] === undefined) {
      delete allowedFields[key];
    }
  });

  const result = await db.collection("users").findOneAndUpdate(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        ...allowedFields,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  return result;
}

