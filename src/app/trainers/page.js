"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { trainers } from "@/data/trainers";
import TrainerCard from "@/components/trainers/TrainerCard";

const categories = [
  { label: "All Goals", value: "" },
  { label: "Muscle Building", value: "muscle-building" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Yoga & Mobility", value: "yoga-mobility" },
  { label: "Fitness & Cardio", value: "fitness-cardio" },
];

function TrainersContent() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );
  const [dbTrainers, setDbTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const response = await fetch("/api/trainers/public");
        const data = await response.json();

        setDbTrainers(data.trainers || []);
      } catch {
        setDbTrainers([]);
      } finally {
        setIsLoading(false);

        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      }
    };

    loadTrainers();
  }, []);

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const allTrainers = useMemo(() => {
    return [...trainers, ...dbTrainers];
  }, [dbTrainers]);

  const filteredTrainers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allTrainers.filter((trainer) => {
      const matchesSearch =
        trainer.name?.toLowerCase().includes(normalizedQuery) ||
        trainer.specialization?.toLowerCase().includes(normalizedQuery) ||
        trainer.location?.toLowerCase().includes(normalizedQuery);

      const matchesCategory = category
        ? trainer.category === category
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [allTrainers, query, category]);

  const activeCategoryLabel =
    categories.find((item) => item.value === category)?.label || "All Goals";

  const hasFilters = Boolean(query || category);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
  };

  return (
    <section className="min-h-screen bg-gray-50 md:pt-10 lg:pt-20">
      {/* =====================================================
          TOP INTRODUCTION
      ====================================================== */}
      <div className="border-b border-black/10 bg-gray-50 px-6 py-12 md:px-12 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
         

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image on left (desktop). Mobile: order-2 pushes it below the text — lg:order-none restores default (image-first) order on desktop. */}
            <div
              className={`relative order-2 transition-all duration-700 lg:order-none ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border border-black/10 bg-white md:block" />

              <div className="relative h-[330px] overflow-hidden rounded-3xl bg-gray-200 sm:h-[400px] md:h-[570px]">
                <img
                  src="https://images.pexels.com/photos/13451904/pexels-photo-13451904.jpeg"
                  alt="Personal trainer helping a client exercise"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                    Find your fit
                  </p>

                  <p className="max-w-sm text-2xl font-bold leading-tight md:text-3xl">
                    The right coach makes every step feel possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Content on right (desktop). Mobile: order-1 brings it above the image — lg:order-none restores default order on desktop. */}
            <div
              className={`order-1 transition-all delay-100 duration-700 lg:order-none ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                Find Your Trainer
              </p>

              <h1 className="text-4xl font-black uppercase leading-[1.02] text-black sm:text-5xl md:text-6xl">
                Train with
                <br />
                <span className="text-black/20">the right coach.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
                Every fitness journey is different. Explore certified trainers,
                compare their specialties, and choose someone who understands
                your goals, schedule, and training style.
              </p>

              {/* Simple points */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Choose by your goal
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      Find trainers for muscle building, weight loss, yoga,
                      cardio, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Find someone nearby
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      Search by city and connect with trainers that fit your
                      preferred location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <ArrowRight size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      Explore their profile
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/50">
                      View experience, specialties, availability, reviews, and
                      pricing before booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTERS AND TRAINER LIST
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-12   md:px-12 md:py-16 md:pt-8">
        <div
          className={`transition-all duration-700 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
                Explore trainers
              </p>

              <h2 className="text-3xl font-black text-black">
                Find your match.
              </h2>
            </div>

            {!isLoading && (
              <p className="text-sm text-black/50">
                <span className="font-bold text-black">
                  {filteredTrainers.length}
                </span>{" "}
                trainer{filteredTrainers.length !== 1 && "s"} available
              </p>
            )}
          </div>

          {/* Filter panel */}
          <div className="rounded-3xl border border-black/10 bg-gray-50 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, specialization, or location..."
                  className="w-full rounded-full border border-black/10 bg-white py-3 pl-12 pr-11 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-black focus:ring-4 focus:ring-black/5 lg:rounded-2xl lg:py-3.5"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Select filter */}
              <div className="relative min-w-full sm:min-w-[240px] lg:min-w-[260px]">
                <SlidersHorizontal
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-full border border-black/10 bg-white py-3 pl-11 pr-10 text-sm font-medium text-black outline-none transition-all duration-300 focus:border-black focus:ring-4 focus:ring-black/5 lg:rounded-2xl lg:py-3.5"
                >
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/40">
                  ▼
                </span>
              </div>
            </div>

            {/* Goal chips */}
            <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto border-t border-black/5 pt-4 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,black_88%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:justify-center lg:gap-5 lg:overflow-visible lg:[mask-image:none]">
              {categories.map((item) => (
                <button
                  key={item.value || "all-goals"}
                  type="button"
                  onClick={() => setCategory(item.value)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 lg:py-2 ${
                    category === item.value
                      ? "bg-black text-white shadow-sm"
                      : "border border-black/10 bg-white text-black/55 hover:-translate-y-0.5 hover:border-black/25 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter details */}
          {hasFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-sm text-black/50">Active filters:</p>

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-gray-200"
                >
                  Search: {query}
                  <X size={13} />
                </button>
              )}

              {category && (
                <button
                  type="button"
                  onClick={() => setCategory("")}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-gray-200"
                >
                  {activeCategoryLabel}
                  <X size={13} />
                </button>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-black/55 underline underline-offset-4 transition-colors hover:text-black"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Trainer cards */}
        {isLoading ? (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-black/5 bg-white"
              >
                <div className="h-64 animate-pulse bg-gray-100" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTrainers.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrainers.map((trainer, index) => (
              <div
                key={trainer.id}
                className={`transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${Math.min(index * 80, 480)}ms`,
                }}
              >
                <TrainerCard trainer={trainer} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-gray-50 px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Search size={25} className="text-black/50" />
            </div>

            <h2 className="mt-5 text-xl font-black text-black">
              No trainers found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
              Try another name, specialization, location, or fitness goal.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
            >
              Show all trainers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrainersPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-black" />

            <p className="text-sm text-black/50">Loading trainers...</p>
          </div>
        </section>
      }
    >
      <TrainersContent />
    </Suspense>
  );
}