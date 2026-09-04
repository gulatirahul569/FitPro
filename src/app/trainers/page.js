"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
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

  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [dbTrainers, setDbTrainers] = useState([]);

  useEffect(() => {
    fetch("/api/trainers/public")
      .then((res) => res.json())
      .then((data) => setDbTrainers(data.trainers || []))
      .catch(() => setDbTrainers([]));
  }, []);

  const allTrainers = useMemo(() => [...trainers, ...dbTrainers], [dbTrainers]);

  const filtered = useMemo(() => {
    return allTrainers.filter((t) => {
      const searchQuery = query.toLowerCase();

      const matchesQuery =
        t.name.toLowerCase().includes(searchQuery) ||
        t.specialization?.toLowerCase().includes(searchQuery);

      const matchesCategory = category
        ? t.category === category
        : true;

      return matchesQuery && matchesCategory;
    });
  }, [allTrainers, query, category]);

  const activeCategoryLabel = categories.find(
    (c) => c.value === category
  )?.label;

  const hasActiveFilters = query || category;

  return (
    <section className="min-h-screen bg-white">

      {/* Header band */}
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="mb-3 text-3xl font-bold text-black md:text-4xl">
              Find Your Trainer
            </h1>

            <p className="mx-auto max-w-lg text-gray-500">
              Browse certified trainers by goal, specialization, and rating to
              find the right fit for you.
            </p>
          </div>

        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">

        {/* Search + filter bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-[180px] cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-10 pr-10 transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Active filters + result count */}
        <div className="mb-8 flex flex-wrap items-center gap-3">

          <p className="text-sm text-gray-500">
            <span className="font-semibold text-black">
              {filtered.length}
            </span>{" "}
            trainer{filtered.length !== 1 && "s"} found
          </p>

          {hasActiveFilters && (
            <>
              {/* Search filter */}
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-200"
                >
                  "{query}"
                  <X size={12} />
                </button>
              )}

              {/* Category filter */}
              {category && (
                <button
                  onClick={() => setCategory("")}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-200"
                >
                  {activeCategoryLabel}
                  <X size={12} />
                </button>
              )}
            </>
          )}

        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
              />
            ))}

          </div>
        ) : (

          /* Empty state */
          <div className="py-24 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Search
                size={22}
                className="text-gray-400"
              />
            </div>

            <p className="mb-1 font-medium text-gray-700">
              No trainers found
            </p>

            <p className="mb-6 text-sm text-gray-500">
              Try a different search term or category.
            </p>

            <button
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:border-black"
            >
              Clear all filters
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
          <p className="text-sm text-gray-500">
            Loading trainers...
          </p>
        </section>
      }
    >
      <TrainersContent />
    </Suspense>
  );
}