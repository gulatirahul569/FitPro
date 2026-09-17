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
    <section className="bg-gray-50 px-6 py-20 md:px-12 md:py-12 md:pt-5">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              Find Your Focus
            </p>

            <h2 className="whitespace-nowrap text-3xl font-black uppercase leading-tight text-black sm:text-4xl md:text-5xl">
              Train for your goal<span className="text-black/20">.</span>
            </h2>
          </div>
        </Reveal>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <Reveal key={category.slug} delay={index * 100}>
                <Link
                  href={`/trainers?category=${category.slug}`}
                  className="group relative block h-[380px] overflow-hidden rounded-3xl bg-gray-200 sm:h-[420px] lg:h-[460px]"
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
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.18em] text-white/70">
                      {number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                      Training category
                    </p>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black leading-tight">
                          {category.name}
                        </h3>

                        <p className="mt-2 max-w-[210px] text-sm leading-6 text-white/75">
                          {category.description}
                        </p>
                      </div>

                      <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                        <ArrowUpRight size={19} />
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