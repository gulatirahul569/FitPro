import Link from "next/link";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { getAllGyms } from "@/lib/models/gym";
import { getDb } from "@/lib/db";
import GymsList from "./GymsList";

export default async function GymsPage() {
  const gyms = await getAllGyms();

  const db = await getDb();
  const trainerCounts = await db
    .collection("trainerProfiles")
    .aggregate([
      { $match: { isListed: true, gymId: { $ne: null }, gymStatus: "approved" } },
      { $group: { _id: "$gymId", count: { $sum: 1 } } },
    ])
    .toArray();
  const countMap = new Map(trainerCounts.map((c) => [c._id, c.count]));

  const serialized = gyms.map((g) => ({
    ...g,
    _id: g._id.toString(),
    trainerCount: countMap.get(g._id.toString()) || 0,
  }));

  return (
    <section className="bg-white min-h-screen">
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-14 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Partner Gyms
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Explore our network of partner gyms and the certified trainers based there.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        <GymsList gyms={serialized} />
      </div>
    </section>
  );
}