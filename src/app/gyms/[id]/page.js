import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Phone, CheckCircle2, Star } from "lucide-react";
import { getGymById, getTrainersByGymId } from "@/lib/models/gym";
import TrainerCard from "@/components/trainers/TrainerCard";

export default async function GymDetailPage({ params }) {
  const { id } = await params;
  const gym = await getGymById(id);

  if (!gym) return notFound();

  const trainerProfiles = await getTrainersByGymId(id);

  const trainers = trainerProfiles.map((p) => ({
    id: p.userId,
    name: p.name,
    photo: p.photo,
    rating: 5.0, // could wire real ratings here too, same pattern as trainer pages
    specialization: p.specialization,
    experience: p.experience,
    price: p.price,
    location: p.location,
    description: p.bio?.slice(0, 100) || "",
  }));

  return (
    <section className="bg-white min-h-screen">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 w-full bg-gray-100">
        {gym.image ? (
          <img src={gym.image} alt={gym.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-6xl font-bold text-gray-300">
            {gym.name?.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-8 max-w-6xl mx-auto left-1/2 -translate-x-1/2 w-full">
          <Link
            href="/gyms"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors mb-4 w-fit"
          >
            <ArrowLeft size={16} />
            Back to Gyms
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{gym.name}</h1>
          <p className="text-white/80 flex items-center gap-1.5">
            <MapPin size={16} /> {gym.location}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-black mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {gym.description || "No description available yet."}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 h-fit">
            {gym.address && (
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">{gym.address}</p>
              </div>
            )}
            {gym.phone && (
              <div className="flex items-center gap-3 mb-4">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <p className="text-sm text-gray-700">{gym.phone}</p>
              </div>
            )}
            {gym.amenities?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {gym.amenities.map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200"
                    >
                      <CheckCircle2 size={11} /> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affiliated trainers */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-6">
            Trainers at {gym.name} ({trainers.length})
          </h2>

          {trainers.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl text-gray-500 text-sm">
              No trainers affiliated with this gym yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}