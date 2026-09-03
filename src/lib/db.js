import clientPromise from "./mongodb";

export async function getDb() {
  const client = await clientPromise;
  return client.db(); // uses the database name from your MONGODB_URI
}