import { Heart, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function OurStory() {
  return (
    <section className="bg-gray-50 px-6 py-20 md:px-12 md:py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* ================= VISUAL ================= */}
        <Reveal>
          <div className="relative mb-10 md:mb-0">
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[480px] md:h-[560px]">
              <img
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Trainer coaching a client"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-xl sm:left-8 sm:right-auto sm:w-64">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Users size={20} />
              </div>

              <div>
                <p className="text-2xl font-black text-black">10K+</p>
                <p className="text-xs text-black/50">Members transformed</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= STORY ================= */}
        <Reveal delay={120}>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs">
              The FitPro Story
            </p>

            <h2 className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
              Built for
              <br />
              <span className="text-black/20">real progress.</span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-7 text-black/60 sm:text-base">
              <p>
                We created FitPro around a simple idea: everyone should have
                access to the right fitness guidance.
              </p>

              <p>
                Instead of searching through different platforms for
                trainers, workouts and fitness resources, FitPro brings the
                experience together.
              </p>

              <p>
                Users can discover trainers and fitness content, while
                trainers can build their professional presence, manage
                clients and grow their fitness business.
              </p>
            </div>

            <div className="mt-8 border-t border-black/10 pt-7 sm:mt-10 sm:pt-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-12 sm:w-12">
                  <Heart size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold sm:text-base">
                    Health. Strength. Confidence.
                  </p>

                  <p className="mt-1 text-xs text-black/40 sm:text-sm">
                    Everything starts with taking the first step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}