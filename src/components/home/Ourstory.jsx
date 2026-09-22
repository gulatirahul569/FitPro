import { Heart, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";


export default function OurStory() {
  return (
    <section
      id="our-story"
      className="bg-gray-50 px-6 py-12 pt-0 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 scroll-mt-24"
    >
      <div className="mx-auto grid max-w-7xl lg:px-6 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* ================= VISUAL ================= */}
        <Reveal className="order-2 md:order-none">
          <div className="relative">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <img
                src="https://images.pexels.com/photos/38576479/pexels-photo-38576479.jpeg"
                alt="Trainer coaching a client"
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <img
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Trainer coaching a client"
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3.5 shadow-lg sm:-bottom-5 sm:left-4 sm:right-auto sm:w-64 sm:p-4 sm:rounded-2xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11">
                <Users size={18} className="sm:size-[20]" />
              </div>

              <div>
                <p className="text-xl font-black text-black sm:text-2xl">10K+</p>
                <p className="text-[10px] text-black/50 sm:text-xs">Members transformed</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= STORY ================= */}
        <Reveal delay={120} className="order-1 md:order-none">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs sm:mb-4">
              The FitPro Story
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Built for
              <br />
              <span className="text-black/20">real progress.</span>
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-black/60 sm:mt-6 sm:space-y-5 sm:text-base sm:leading-7">
              <p>
                We created FitPro around a simple idea: everyone should have
                access to the right fitness guidance.
              </p>

              <p>
                Instead of searching through different platforms for trainers,
                workouts and fitness resources, FitPro brings the experience
                together.
              </p>

              <p>
                Users can discover trainers and fitness content, while trainers
                can build their professional presence, manage clients and grow
                their fitness business.
              </p>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11 md:h-12 md:w-12">
                  <Heart size={16} className="sm:size-[17]" />
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