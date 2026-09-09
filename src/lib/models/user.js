import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

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
//   emailNotifications?: boolean,
//   bookingNotifications?: boolean,
//   trainingNotifications?: boolean,
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

export async function getAllUsers() {
  const db = await getDb();
  return db.collection("users").find({}).sort({ createdAt: -1 }).toArray();
}

export async function setUserRole(userId, role) {
  const db = await getDb();

  const result = await db.collection("users").findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: { role, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result;
}

export async function getUserSettings(userId) {
  const db = await getDb();

  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { password: 0 } } // never fetch the password hash here
  );

  if (!user) return null;

  return {
    name: user.name,
    email: user.email,
    emailNotifications: user.emailNotifications ?? true,
    bookingNotifications: user.bookingNotifications ?? true,
    trainingNotifications: user.trainingNotifications ?? true,
  };
}

export async function updateNotificationSettings(userId, prefs) {
  const db = await getDb();

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...prefs, updatedAt: new Date() } }
  );

  return getUserSettings(userId);
}

export async function changePassword(userId, currentPassword, newPassword) {
  const db = await getDb();

  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { password: hashedPassword, updatedAt: new Date() } }
  );

  return true;
}

export async function findUserByEmailForAssignment(email) {
  const db = await getDb();
  return db.collection("users").findOne(
    { email: email.toLowerCase() },
    { projection: { password: 0 } }
  );
}