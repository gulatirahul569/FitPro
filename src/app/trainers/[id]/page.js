import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, CheckCircle2, BadgeCheck, Building2 } from "lucide-react";
import { trainers } from "@/data/trainers";
import { getTrainerProfile } from "@/lib/models/trainerProfile";
import { getTrainerRatingSummary } from "@/lib/models/review";
import { getReviewableBooking } from "@/lib/models/booking";
import { getGymById } from "@/lib/models/gym";
import { auth } from "@/auth";
import BookingModal from "@/components/trainers/BookingModal";
import RateTrainerSection from "@/components/trainers/RateTrainerSection";
import StarRating from "@/components/ui/StarRating";

async function getTrainer(id) {
  const numericId = Number(id);

  if (!Number.isNaN(numericId)) {
    return trainers.find((t) => t.id === numericId) || null;
  }

  const profile = await getTrainerProfile(id);
  if (!profile || !profile.isListed) return null;

  const ratingSummary = await getTrainerRatingSummary(id);

  let gym = null;
  if (profile.gymId) {
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
    gymId: profile.gymId || null,
    gymName: gym?.name || null,
  };
}

export default async function TrainerProfilePage({ params }) {
  const { id } = await params;
  const trainer = await getTrainer(id);

  if (!trainer) return notFound();

  const session = await auth();

  const isMockTrainer = !Number.isNaN(Number(id));
  let reviewableBooking = null;
  if (session?.user && !isMockTrainer && session.user.id !== String(trainer.id)) {
    reviewableBooking = await getReviewableBooking(session.user.id, String(trainer.id));
  }

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <Link
          href="/trainers"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Trainers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <div className="w-full sm:w-56 h-64 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                {trainer.photo ? (
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300">
                    {trainer.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-black">{trainer.name}</h1>
                  <BadgeCheck size={22} className="text-black" />
                </div>
                <p className="text-lg text-gray-600 mb-4">{trainer.specialization}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {trainer.rating !== null && trainer.rating !== undefined ? (
                    <div className="flex items-center gap-2">
                      <StarRating rating={trainer.rating} size={16} />
                      <span className="font-medium text-black">{trainer.rating.toFixed(1)}</span>
                      <span>({trainer.totalReviews})</span>
                    </div>
                  ) : (
                    <span className="font-medium text-black">New — no ratings yet</span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {trainer.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {trainer.experience}
                  </div>
                  {trainer.gymName && (
                    <Link
                      href={`/gyms/${trainer.gymId}`}
                      className="flex items-center gap-1.5 hover:text-black transition-colors underline decoration-dotted"
                    >
                      <Building2 size={16} />
                      {trainer.gymName}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-black mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
            </div>

            {trainer.specialties?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-black mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-3">
                  {trainer.specialties.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50"
                    >
                      <CheckCircle2 size={15} className="text-black" />
                      <span className="text-sm font-medium text-black">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-black mb-3">Availability</h2>
              <div className="rounded-2xl border border-gray-200 p-5 flex items-center gap-3">
                <Clock size={18} className="text-gray-500" />
                <p className="text-gray-700">{trainer.availability}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Starting from</p>
              <p className="text-3xl font-bold text-black mb-6">
                ₹{trainer.price}
                <span className="text-base font-normal text-gray-500">/month</span>
              </p>

              <BookingModal trainerId={String(trainer.id)} trainerName={trainer.name} />

              {reviewableBooking && (
                <RateTrainerSection booking={reviewableBooking} />
              )}

              <button className="w-full px-6 py-3 rounded-lg border border-gray-300 text-black font-medium hover:border-black transition-colors">
                Message {trainer.name.split(" ")[0]}
              </button>

              <div className="border-t border-gray-100 mt-6 pt-6 space-y-3 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-black font-medium">{trainer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="text-black font-medium">{trainer.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="text-black font-medium">
                    {trainer.rating !== null && trainer.rating !== undefined
                      ? `${trainer.rating.toFixed(1)} ★`
                      : "New"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}