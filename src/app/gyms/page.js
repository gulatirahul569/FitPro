import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  UsersRound,
} from "lucide-react";

import { getAllGyms } from "@/lib/models/gym";
import { getDb } from "@/lib/db";
import GymsList from "./GymsList";
import Reveal from "@/components/ui/Reveal";

export default async function GymsPage() {
  const gyms = await getAllGyms();

  const db = await getDb();

  /*
    Count trainers who:
    - are publicly listed
    - are linked to a gym
    - have been approved by that gym
  */
  const trainerCounts = await db
    .collection("trainerProfiles")
    .aggregate([
      {
        $match: {
          isListed: true,
          gymId: { $ne: null },
          gymStatus: "approved",
        },
      },
      {
        $group: {
          _id: "$gymId",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const countMap = new Map(
    trainerCounts.map((item) => [String(item._id), item.count])
  );

  /*
    Convert MongoDB ObjectId values into plain strings before
    passing gym data to the client component.
  */
  const serializedGyms = gyms.map((gym) => ({
    ...gym,
    _id: gym._id.toString(),
    trainerCount: countMap.get(String(gym._id)) || 0,
  }));

  const informationPoints = [
    {
      title: "Explore listed gym branches",
      description:
        "Browse gym branches by name or location and find a training environment close to you.",
      icon: Building2,
    },
    {
      title: "View trainers at that gym",
      description:
        "Open a gym profile to see public trainers who are approved and affiliated with that specific branch.",
      icon: UsersRound,
    },
    {
      title: "Choose with confidence",
      description:
        "Compare gym locations and trainer availability before deciding where you want to train.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="min-h-screen overflow-hidden bg-gray-50 md:pt-10 lg:pt-10">
      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <div className="border-b border-black/10 bg-gray-50 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-7xl px-0 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image (desktop). Mobile: order-2 pushes it below the text — lg:order-none restores default order on desktop. */}
            <Reveal className="order-2 lg:order-none lg:pr-2">
              <div className="group relative">
                {/* Offset frame */}
                <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border border-black/10 bg-white md:block" />

                <div className="relative h-[330px] overflow-hidden rounded-3xl bg-gray-200 shadow-sm sm:h-[400px] md:h-[570px]">
                  <img
                    src="https://images.pexels.com/photos/4944427/pexels-photo-4944427.jpeg"
                    alt="Modern fitness gym with training equipment"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                      FitPro partner gyms
                    </p>

                    <p className="max-w-sm text-2xl font-bold leading-tight md:text-3xl">
                      Find a place to train and the people who can guide you.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Explanation (desktop). Mobile: order-1 brings it above the image — lg:order-none restores default order on desktop. */}
            <div className="order-1 lg:order-none">
              <Reveal delay={100}>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                  Partner Gyms
                </p>

                <h1 className="text-4xl font-black uppercase leading-[1.02] text-black sm:text-5xl md:text-6xl">
                  Find your
                  <br />
                  <span className="text-black/20">training space.</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
                  Explore gyms listed on FitPro and discover trainers affiliated
                  with each gym branch. Select a nearby facility, view approved
                  trainers at that location, and choose a space that supports
                  your fitness routine.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                {informationPoints.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <Reveal key={point.title} delay={200 + index * 100}>
                      <div className="group flex items-start gap-3 rounded-2xl p-2 transition-colors duration-300 hover:bg-white/70">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <Icon size={17} />
                        </div>

                        <div className="pt-0.5">
                          <p className="text-sm font-bold text-black">
                            {point.title}
                          </p>

                          <p className="mt-1 text-sm leading-6 text-black/50">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          GYM DIRECTORY
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <Reveal>
          <div className="mb-8">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              Explore locations
            </p>

            <h2 className="text-3xl font-black text-black">
              Choose your gym.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
              Select a listed gym branch to see its details and the approved
              trainers associated with that location.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <GymsList gyms={serializedGyms} />
        </Reveal>
      </div>
    </section>
  );
}