"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

export default function TrainerCard({ trainer }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsFavorite((previous) => !previous);
  };

  const hasReviews =
    trainer.reviewCount !== undefined &&
    trainer.reviewCount !== null &&
    trainer.reviewCount > 0;

  const locationText = trainer.location || trainer.gymName;

  return (
    <Link
      href={`/trainers/${trainer.id}`}
      className="group block h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        {trainer.photo ? (
          <img
            src={trainer.photo}
            alt={trainer.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-5xl font-black text-gray-400">
            {trainer.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        {/* Image gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Category / specialization badge */}
        {trainer.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {trainer.category.replace(/-/g, " ")}
          </span>
        )}

       

        {/* Name and location */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="flex items-center gap-1.5">
            <h3 className="line-clamp-1 text-xl font-black leading-tight">
              {trainer.name}
            </h3>

            {trainer.isVerified && (
              <BadgeCheck size={19} className="shrink-0 text-white" />
            )}
          </div>

          {locationText && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin size={14} />
              <span className="line-clamp-1">{locationText}</span>
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex h-[230px] flex-col p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          {hasReviews ? (
            <>
              <span className="font-bold text-black">
                {Number(trainer.rating || 0).toFixed(1)}
              </span>

              <span className="text-black/45">
                ({trainer.reviewCount} review
                {trainer.reviewCount !== 1 ? "s" : ""})
              </span>
            </>
          ) : (
            <span className="font-bold text-black">New trainer</span>
          )}
        </div>

        {/* Trainer specialization */}
        <p className="mt-3 line-clamp-1 text-sm font-medium text-black/60">
          {trainer.specialization || "Personal fitness trainer"}
          {trainer.experience ? ` · ${trainer.experience}` : ""}
        </p>

        {/* Trainer description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">
          {trainer.description ||
            "Personalized training to help you stay consistent and reach your goals."}
        </p>

        {/* Price and CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">
              Starting from
            </p>

            <p className="mt-1 text-lg font-black text-black">
              ₹{trainer.price}
              <span className="ml-1 text-xs font-medium text-black/45">
                /month
              </span>
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-black px-4 py-2 text-xs font-bold text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
            Learn More

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>

        {trainer.firstSessionFree && (
          <p className="mt-3 text-xs font-semibold text-red-500">
            First session free
          </p>
        )}
      </div>
    </Link>
  );
}