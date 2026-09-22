import Link from "next/link";
import {
  ArrowUpRight,
  Dumbbell,
  Flame,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";


const categories = [
  {
    name: "Muscle Building",
    slug: "muscle-building",
    description: "Build strength, power, and confidence.",
    icon: Dumbbell,
    image: "https://images.pexels.com/photos/29526381/pexels-photo-29526381.jpeg",
  },
  {
    name: "Weight Loss",
    slug: "weight-loss",
    description: "Move more and build lasting habits.",
    icon: Flame,
    image: "https://images.pexels.com/photos/6551075/pexels-photo-6551075.jpeg",
  },
  {
    name: "Yoga & Mobility",
    slug: "yoga-mobility",
    description: "Improve movement, balance, and flexibility.",
    icon: Sparkles,
    image: "https://images.pexels.com/photos/29490926/pexels-photo-29490926.jpeg",
  },
  {
    name: "Fitness & Cardio",
    slug: "fitness-cardio",
    description: "Improve endurance and everyday energy.",
    icon: HeartPulse,
    image: "https://images.pexels.com/photos/19254708/pexels-photo-19254708.jpeg",
  },
];


export default function Categories() {
  return (
    <section className="bg-gray-50 px-6 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl sm:px-6 md:px-8">
        {/* Heading */}
        <Reveal>
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              Find Your Focus
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Train for your goal<span className="text-black/20">.</span>
            </h2>
          </div>
        </Reveal>

        {/* Category cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <Reveal key={category.slug} delay={index * 100}>
                <Link
                  href={`/trainers?category=${category.slug}`}
                  className="group relative block h-[280px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[320px] md:h-[360px] lg:h-[420px]"
                >
                  {/* Background image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark bottom gradient only — no white overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top content */}
                  <div className="absolute left-3 right-3 top-3 flex items-center justify-between sm:left-4 sm:right-4 sm:top-4">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-white/70 sm:text-xs">
                      {number}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black sm:h-10 sm:w-10">
                      <Icon size={18} strokeWidth={2} className="sm:size-[20]" />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60 sm:text-xs">
                      Training category
                    </p>

                    <div className="flex items-end justify-between gap-3 sm:gap-4">
                      <div>
                        <h3 className="text-base font-black leading-tight sm:text-lg md:text-xl lg:text-2xl">
                          {category.name}
                        </h3>

                        <p className="mt-1.5 max-w-[140px] text-xs leading-5 text-white/75 sm:mt-2 sm:max-w-[180px] sm:text-sm sm:leading-6 md:max-w-[210px]">
                          {category.description}
                        </p>
                      </div>

                      <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-10 sm:w-10 md:h-11 md:w-11">
                        <ArrowUpRight size={17} className="sm:size-[19]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}