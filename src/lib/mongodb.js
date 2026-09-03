import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the connection is
  // cached across hot reloads instead of creating a new one every time.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, no global caching needed — each serverless
  // invocation gets its own client.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;