"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { trainers } from "@/data/trainers";
import TrainerCard from "@/components/trainers/TrainerCard";

const categories = [
  { label: "All Goals", value: "" },
  { label: "Muscle Building", value: "muscle-building" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Yoga & Mobility", value: "yoga-mobility" },
  { label: "Fitness & Cardio", value: "fitness-cardio" },
];

export default function TrainersPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return trainers.filter((t) => {
      const matchesQuery =
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.specialization.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? t.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const activeCategoryLabel = categories.find((c) => c.value === category)?.label;
  const hasActiveFilters = query || category;

  return (
    <section className="bg-white min-h-screen">
      {/* Header band */}
      <div className="bg-gray-50 border-b border-gray-100 py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Find Your Trainer
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Browse certified trainers by goal, specialization, and rating to
              find the right fit for you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none pl-10 pr-10 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white cursor-pointer min-w-[180px]"
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
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-black">{filtered.length}</span>{" "}
            trainer{filtered.length !== 1 && "s"} found
          </p>

          {hasActiveFilters && (
            <>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-black px-3 py-1.5 rounded-full transition-colors"
                >
                  "{query}" <X size={12} />
                </button>
              )}
              {category && (
                <button
                  onClick={() => setCategory("")}
                  className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-black px-3 py-1.5 rounded-full transition-colors"
                >
                  {activeCategoryLabel} <X size={12} />
                </button>
              )}
            </>
          )}
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-700 font-medium mb-1">No trainers found</p>
            <p className="text-gray-500 text-sm mb-6">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-black text-sm font-medium hover:border-black transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}