import Link from "next/link";
import { Dumbbell, Flame, Sparkles, HeartPulse } from "lucide-react";

const categories = [
  {
    name: "Muscle Building",
    slug: "muscle-building",
    icon: Dumbbell,
  },
  {
    name: "Weight Loss",
    slug: "weight-loss",
    icon: Flame,
  },
  {
    name: "Yoga & Mobility",
    slug: "yoga-mobility",
    icon: Sparkles,
  },
  {
    name: "Fitness & Cardio",
    slug: "fitness-cardio",
    icon: HeartPulse,
  },
];

export default function Categories() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          Train For Your Goal
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/trainers?category=${category.slug}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 py-10 px-4 text-center hover:border-black hover:bg-black transition-colors duration-300"
              >
                <Icon
                  size={32}
                  className="text-black group-hover:text-white transition-colors duration-300"
                />
                <span className="font-medium text-black group-hover:text-white transition-colors duration-300">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}