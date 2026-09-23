import Link from "next/link";
import { notFound } from "next/navigation";
import { trainerOwnsProfile } from "@/lib/models/trainerProfile";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle2,
  BadgeCheck,
  Building2,
  MessageCircle,
} from "lucide-react";

import { trainers } from "@/data/trainers";
import { getTrainerProfile } from "@/lib/models/trainerProfile";
import { getTrainerRatingSummary } from "@/lib/models/review";
import {
  getReviewableBooking,
  hasUnlockedTrainerVideos,
} from "@/lib/models/booking";
import { getGymById } from "@/lib/models/gym";
import { getVideosByTrainer } from "@/lib/models/video";
import { auth } from "@/auth";

import BookingModal from "@/components/trainers/BookingModal";
import RateTrainerSection from "@/components/trainers/RateTrainerSection";
import StarRating from "@/components/ui/StarRating";
import TrainerVideoPreview from "@/components/trainers/TrainerVideoPreview";
import Reveal from "@/components/ui/Reveal";

async function getTrainer(id) {
  const numericId = Number(id);

  /*
    Mock trainers use numeric IDs:
    /trainers/1
    /trainers/2
  */
  if (!Number.isNaN(numericId)) {
    return trainers.find((trainer) => trainer.id === numericId) || null;
  }

  /*
    Database trainers use their user/profile ID.
  */
  const profile = await getTrainerProfile(id);

  if (!profile || !profile.isListed) {
    return null;
  }

  const ratingSummary = await getTrainerRatingSummary(id);

  let gym = null;

  if (profile.gymId && profile.gymStatus === "approved") {
    gym = await getGymById(profile.gymId);
  }

  return {
    id: profile.userId,
    name: profile.name,
    photo: profile.photo,
    rating: ratingSummary.averageRating,
    totalReviews: ratingSummary.totalReviews,
    specialization: profile.specialization,
    experience: profile.experience,
    location: profile.location,
    price: profile.price,
    bio: profile.bio,
    specialties: profile.specialties || [],
    availability: profile.availability,
    gymId: profile.gymStatus === "approved" ? profile.gymId : null,
    gymName: gym?.name || null,
  };
}

export default async function TrainerProfilePage({ params }) {
  const { id } = await params;

  const trainer = await getTrainer(id);

  if (!trainer) {
    notFound();
  }

  const session = await auth();

  let canPreviewAllVideos = false;

  if (session?.user) {
    const isAdmin = session.user.role === "admin";

    const isTrainerOwner =
      session.user.role === "trainer" &&
      trainerOwnsProfile(session.user.id, String(trainer.id));

    canPreviewAllVideos = isAdmin || isTrainerOwner;
  }

  /*
    Numeric URL IDs are mock trainers.
    Non-numeric IDs are database trainers.
  */
  const isMockTrainer = !Number.isNaN(Number(id));

let reviewableBooking = null;

if (
  session?.user &&
  !isMockTrainer &&
  session.user.id !== String(trainer.id)
) {
  const rawBooking = await getReviewableBooking(
    session.user.id,
    String(trainer.id)
  );

  if (rawBooking) {
    reviewableBooking = {
      ...rawBooking,
      _id: rawBooking._id?.toString?.() || rawBooking._id,
      createdAt: rawBooking.createdAt?.toISOString?.() || rawBooking.createdAt,
      updatedAt: rawBooking.updatedAt?.toISOString?.() || rawBooking.updatedAt,
    };
  }
}

  let trainerVideos = [];
  let hasUnlocked = false;

  /*
    Database trainer videos:
    1. Keep approved videos only.
    2. Sort oldest -> newest.
    3. First video in the result becomes the free demo video.
  */
  if (!isMockTrainer) {
    const allVideos = await getVideosByTrainer(String(trainer.id));

    trainerVideos = allVideos
      .filter((video) => video.status === "approved")
      .sort((firstVideo, secondVideo) => {
        const firstVideoDate = new Date(
          firstVideo.createdAt || firstVideo.uploadedAt || 0
        ).getTime();

        const secondVideoDate = new Date(
          secondVideo.createdAt || secondVideo.uploadedAt || 0
        ).getTime();

        return firstVideoDate - secondVideoDate;
      })
      .map((video) => ({
        ...video,
        _id: video._id.toString(),
      }));

    if (session?.user) {
      hasUnlocked = await hasUnlockedTrainerVideos(
        session.user.id,
        String(trainer.id)
      );
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-5 md:pt-20 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
        {/* Back button */}
        <Link
          href="/trainers"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-black/55 transition-colors hover:text-black"
        >
          <ArrowLeft size={17} />
          Back to trainers
        </Link>

        {/* =====================================================
            PROFILE HERO
        ====================================================== */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
              {/* Trainer image */}
              <div className="relative min-h-[350px] bg-gray-100 sm:min-h-[430px] lg:min-h-full">
                {trainer.photo ? (
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-[350px] items-center justify-center bg-gray-200 text-7xl font-black text-gray-400">
                    {trainer.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                <div className="absolute bottom-6 left-6 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black shadow-lg">
                  Verified trainer
                </div>
              </div>

              {/* Trainer details */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                    Personal trainer
                  </p>

                  {trainer.gymName && (
                    <Link
                      href={`/gyms/${trainer.gymId}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-black/60 transition-colors hover:text-black"
                    >
                      <Building2 size={14} />
                      {trainer.gymName}
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
                    {trainer.name}
                  </h1>

                  <BadgeCheck size={25} className="shrink-0 text-black" />
                </div>

                <p className="mt-3 text-lg font-medium text-black/55">
                  {trainer.specialization}
                </p>

                {/* Rating, location, experience */}
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4 border-y border-black/10 py-5 text-sm text-black/55">
                  {trainer.rating !== null &&
                    trainer.rating !== undefined ? (
                    <div className="flex items-center gap-2">
                      <StarRating rating={trainer.rating} size={17} />

                      <span className="font-bold text-black">
                        {trainer.rating.toFixed(1)}
                      </span>

                      <span>({trainer.totalReviews} reviews)</span>
                    </div>
                  ) : (
                    <span className="font-semibold text-black">
                      New trainer — no ratings yet
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <MapPin size={17} />
                    {trainer.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={17} />
                    {trainer.experience} experience
                  </div>
                </div>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  {trainer.bio}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            MAIN CONTENT + STICKY BOOKING CARD
        ====================================================== */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main content */}
          <div>
            {/* Specialties */}
            {trainer.specialties?.length > 0 && (
              <Reveal>
                <section className="mb-12">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                    Areas of focus
                  </p>

                  <h2 className="mb-5 text-2xl font-black text-black">
                    Specialties
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {trainer.specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 shadow-sm"
                      >
                        <CheckCircle2 size={16} className="text-black" />

                        <span className="text-sm font-semibold text-black">
                          {specialty}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {/* Video preview:
                trainerVideos[0] = earliest uploaded approved video = free demo
                trainerVideos[1] = second oldest approved video = locked unless access is unlocked
            */}
            {trainerVideos.length > 0 && (
              <Reveal delay={100}>
                <TrainerVideoPreview
                  trainerId={String(trainer.id)}
                  trainerName={trainer.name}
                  videos={trainerVideos}
                  hasUnlocked={hasUnlocked}
                  canPreviewAllVideos={canPreviewAllVideos}
                />
              </Reveal>
            )}

            {/* Availability */}
            <Reveal delay={150}>
              <section>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                  Schedule
                </p>

                <h2 className="mb-5 text-2xl font-black text-black">
                  Availability
                </h2>

                <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Clock size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Available for sessions
                    </p>

                    <p className="mt-1 text-sm text-black/55">
                      {trainer.availability}
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>
          </div>

          {/* Sticky booking sidebar */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-black/45">
                Starting from
              </p>

              <p className="mt-1 text-4xl font-black text-black">
                ₹{trainer.price}
                <span className="ml-1 text-base font-medium text-black/45">
                  /month
                </span>
              </p>

              <div className="my-6 border-t border-black/10" />

              <BookingModal
                trainerId={String(trainer.id)}
                trainerName={trainer.name}
              />

              {reviewableBooking && (
                <div className="mt-4">
                  <RateTrainerSection booking={reviewableBooking} />
                </div>
              )}

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-black px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                <MessageCircle size={17} />
                Message {trainer.name.split(" ")[0]}
              </button>

              <div className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">Location</span>

                  <span className="text-right font-semibold text-black">
                    {trainer.location}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">Experience</span>

                  <span className="text-right font-semibold text-black">
                    {trainer.experience}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">Rating</span>

                  <span className="text-right font-semibold text-black">
                    {trainer.rating !== null &&
                      trainer.rating !== undefined
                      ? `${trainer.rating.toFixed(1)} ★`
                      : "New"}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}