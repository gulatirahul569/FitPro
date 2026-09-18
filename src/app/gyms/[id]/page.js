import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";

import { getGymById, getTrainersByGymId } from "@/lib/models/gym";
import TrainerCard from "@/components/trainers/TrainerCard";
import Reveal from "@/components/ui/Reveal";

export default async function GymDetailPage({ params }) {
  const { id } = await params;

  const gym = await getGymById(id);

  if (!gym) {
    notFound();
  }

  const trainerProfiles = await getTrainersByGymId(id);

  const trainers = trainerProfiles.map((profile) => ({
    id: profile.userId,
    name: profile.name,
    photo: profile.photo,
    rating: profile.rating || 5,
    reviewCount: profile.reviewCount || 0,
    specialization: profile.specialization,
    experience: profile.experience,
    price: profile.price,
    location: profile.location || gym.location,
    description: profile.bio?.slice(0, 120) || "",
    category: profile.category || "",
    isVerified: true,
  }));

  const amenities = gym.amenities || [];

  return (
    <section className="min-h-screen overflow-hidden bg-gray-50 pt-20">
      {/* =====================================================
          GYM HERO
      ====================================================== */}
      <div className="relative">
        <div className="relative h-[390px] overflow-hidden bg-gray-200 sm:h-[460px] md:h-[540px]">
          {gym.image ? (
            <img
              src={gym.image}
              alt={gym.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-7xl font-black text-gray-400">
              {gym.name?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-10 text-white md:px-12 md:pb-14">
          <Link
            href="/gyms"
            className="absolute left-6 top-8 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-all duration-300 hover:-translate-x-1 hover:text-white md:left-12"
          >
            <ArrowLeft size={17} />
            Back to gyms
          </Link>

          <Reveal>
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
                <Building2 size={13} />
                FitPro partner gym
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {gym.name}
              </h1>

              {gym.location && (
                <p className="mt-4 flex items-center gap-2 text-sm text-white/80 sm:text-base">
                  <MapPin size={18} />
                  {gym.location}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* =====================================================
          GYM DETAILS
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-12 md:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main description */}
          <div>
            <Reveal>
              <section>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                  About the gym
                </p>

                <h2 className="text-3xl font-black text-black">
                  Train in a space built for progress.
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
                  {gym.description ||
                    "Explore this FitPro partner gym, discover its training environment, and connect with certified trainers affiliated with this branch."}
                </p>
              </section>
            </Reveal>

            {/* Amenities */}
            {amenities.length > 0 && (
              <Reveal delay={100}>
                <section className="mt-12">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                    What you will find
                  </p>

                  <h2 className="mb-5 text-2xl font-black text-black">
                    Amenities
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20"
                      >
                        <CheckCircle2 size={16} className="text-black" />

                        <span className="text-sm font-semibold text-black">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* Sidebar information */}
          <Reveal delay={120}>
            <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">
                Gym information
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/70">
                      {gym.address || gym.location || "Address not available"}
                    </p>
                  </div>
                </div>

                {gym.phone && (
                  <div className="flex items-start gap-3 border-t border-black/10 pt-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
                      <Phone size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                        Contact
                      </p>

                      <a
                        href={`tel:${gym.phone}`}
                        className="mt-1 inline-block text-sm font-semibold text-black transition-colors hover:text-black/55"
                      >
                        {gym.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 border-t border-black/10 pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <UsersRound size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Trainer network
                    </p>

                    <p className="mt-1 text-sm font-bold text-black">
                      {trainers.length} trainer
                      {trainers.length !== 1 ? "s" : ""} affiliated
                    </p>

                    <p className="mt-1 text-xs leading-5 text-black/45">
                      Public trainers approved for this branch.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        {/* =====================================================
            AFFILIATED TRAINERS
        ====================================================== */}
        <Reveal delay={150}>
          <section className="mt-16 border-t border-black/10 pt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                  Meet the team
                </p>

                <h2 className="text-3xl font-black text-black">
                  Trainers at {gym.name}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
                  Explore certified trainers publicly listed and approved to
                  train at this gym branch.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-black">
                <UsersRound size={17} />
                {trainers.length} trainer
                {trainers.length !== 1 ? "s" : ""}
              </div>
            </div>
          </section>
        </Reveal>

        {trainers.length === 0 ? (
          <Reveal delay={200}>
            <div className="rounded-3xl border border-dashed border-black/15 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-black">
                <UsersRound size={26} />
              </div>

              <h3 className="mt-5 text-xl font-black text-black">
                No affiliated trainers yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
                This gym does not have publicly listed trainers at the moment.
                Please check back soon.
              </p>

              <Link
                href="/trainers"
                className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
              >
                Explore all trainers
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainers.map((trainer, index) => (
              <Reveal
                key={trainer.id}
                delay={Math.min(index * 80, 400)}
              >
                <TrainerCard trainer={trainer} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}