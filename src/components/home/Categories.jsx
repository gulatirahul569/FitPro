import Link from "next/link";
import { Dumbbell, Flame, Sparkles, HeartPulse } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const categories = [
  {
    name: "Muscle Building",
    slug: "muscle-building",
    icon: Dumbbell,
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
  },
  {
    name: "Weight Loss",
    slug: "weight-loss",
    icon: Flame,
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
  },
  {
    name: "Yoga & Mobility",
    slug: "yoga-mobility",
    icon: Sparkles,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
  },
  {
    name: "Fitness & Cardio",
    slug: "fitness-cardio",
    icon: HeartPulse,
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
  },
];

export default function Categories() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
            Train For Your Goal
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Every body is different — find the path that fits yours
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.slug} delay={index * 100}>
                <Link
                  href={`/trainers?category=${category.slug}`}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl overflow-hidden py-14 px-4 text-center transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/55 group-hover:bg-black/70 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:bg-white">
                      <Icon
                        size={26}
                        className="text-white transition-colors duration-300 group-hover:text-black"
                      />
                    </div>
                    <span className="font-semibold text-white">
                      {category.name}
                    </span>
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