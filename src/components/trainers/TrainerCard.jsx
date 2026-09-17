"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Heart, MapPin } from "lucide-react";

export default function TrainerCard({ trainer }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const hasReviews = trainer.reviewCount && trainer.reviewCount > 0;

  return (
    <Link
      href={`/trainers/${trainer.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={trainer.photo}
          alt={trainer.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom gradient so the name stays readable on any photo */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />



        {/* Name + location overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-bold leading-tight text-white">
            {trainer.name}
          </h3>

          {(trainer.location || trainer.gymName) && (
            <p className="mt-0.5 flex items-center gap-1 text-sm text-white/80">
              <MapPin size={13} />
              {trainer.location || trainer.gymName}
            </p>
          )}
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="p-5">
        {/* Rating row */}
        <div className="mb-2 flex items-center gap-1.5 text-sm">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          {hasReviews ? (
            <>
              <span className="font-semibold text-black">
                {trainer.rating}
              </span>
              <span className="text-gray-500">
                ({trainer.reviewCount} review
                {trainer.reviewCount > 1 ? "s" : ""})
              </span>
            </>
          ) : (
            <span className="font-semibold text-black">New</span>
          )}
        </div>

        {/* Specialization / experience */}
        <p className="mb-2 text-sm text-gray-500">
          {trainer.specialization}
          {trainer.experience ? ` • ${trainer.experience}` : ""}
        </p>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {trainer.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-base font-bold text-black">
            ₹{trainer.price}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </span>

          {trainer.firstSessionFree && (
            <span className="text-sm font-medium text-red-500">
              1st session free
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}