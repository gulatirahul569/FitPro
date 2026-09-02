import Link from "next/link";
import { Star } from "lucide-react";

export default function TrainerCard({ trainer }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <img
          src={trainer.photo}
          alt={trainer.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-black">{trainer.name}</h3>
          <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
            <Star size={16} fill="currentColor" />
            {trainer.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-1">
          {trainer.specialization} • {trainer.experience}
        </p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {trainer.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-black">
            ₹{trainer.price}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </span>
          <Link
            href={`/trainers/${trainer.id}`}
            className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}