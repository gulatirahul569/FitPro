import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const points = [
  "Build your profile",
  "Share your fitness content",
  "Find personal training clients",
  "Grow your income",
];

export default function BecomeTrainer() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <Reveal>
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden text-white px-8 py-16 text-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </div>

          {/* Glow accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md mb-5">
              For fitness enthusiasts
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Want To Become A Trainer?
            </h2>
            <p className="text-gray-300 mb-9 max-w-xl mx-auto">
              Turn your fitness knowledge into a career.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10 text-left">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5"
                >
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="/become-trainer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Apply as Trainer
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}