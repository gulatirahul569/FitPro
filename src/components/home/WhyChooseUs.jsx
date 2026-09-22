import {
  BadgeCheck,
  CalendarClock,
  ChartNoAxesCombined,
  ClipboardCheck,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";


const benefits = [
  {
    title: "Certified Trainers",
    icon: BadgeCheck,
  },
  {
    title: "Personalized Training",
    icon: ClipboardCheck,
  },
  {
    title: "Flexible Scheduling",
    icon: CalendarClock,
  },
  {
    title: "Verified Profiles",
    icon: UserRoundCheck,
  },
  {
    title: "Expert Guidance",
    icon: Dumbbell,
  },
  {
    title: "Progress Tracking",
    icon: ChartNoAxesCombined,
  },
];


export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 px-6  sm:px-6 sm:py-16 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto grid max-w-7xl lg:px-6 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* ================= BENEFITS / LEFT ================= */}
        <Reveal>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40 sm:text-xs sm:mb-4">
              The FitPro Difference
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Built for
              <br />
              <span className="text-black/20">better training.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-black/60 sm:mt-6 sm:text-base sm:leading-7">
              FitPro brings trusted trainers, flexible workouts, and practical
              support into one simple fitness experience built around your
              goals.
            </p>

            {/* Benefit grid */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm sm:rounded-xl sm:px-4 sm:py-4"
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white sm:h-10 sm:w-10">
                      <Icon size={17} strokeWidth={2} className="sm:size-[19]" />
                    </div>

                    <span className="text-xs font-semibold text-black sm:text-sm">
                      {benefit.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom message */}
            <div className="mt-6 border-t border-black/10 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11 md:h-12 md:w-12">
                  <Sparkles size={17} className="sm:size-[19]" />
                </div>

                <div>
                  <p className="text-sm font-bold text-black sm:text-base">
                    Your fitness, made simpler.
                  </p>

                  <p className="mt-1 text-xs text-black/40 sm:text-sm">
                    Find the right coach, build a plan, and keep moving forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= IMAGE / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:mb-0 lg:max-w-none">
            {/* Offset background frame */}
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-black/10 bg-white sm:-right-4 sm:-top-4 sm:rounded-3xl" />

            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-200 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <img
                src="https://images.pexels.com/photos/3757937/pexels-photo-3757937.jpeg"
                alt="Personal trainer coaching a client during a workout"
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <img
                src="https://images.pexels.com/photos/6827092/pexels-photo-6827092.jpeg"
                alt="Personal trainer coaching a client during a workout"
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6 lg:p-8">
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-white/75 sm:text-xs">
                  Training that fits your life
                </p>

                <h3 className="max-w-sm text-lg font-bold leading-tight sm:text-xl md:text-2xl lg:text-3xl">
                  Find the right guidance for every goal.
                </h3>
              </div>
            </div>

            {/* Floating verified card */}
            <div className="absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3.5 shadow-lg sm:-bottom-5 sm:left-4 sm:right-auto sm:w-64 sm:p-4 sm:rounded-2xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11">
                <ShieldCheck size={18} className="sm:size-[21]" />
              </div>

              <div>
                <p className="text-xs font-bold text-black sm:text-sm">
                  Verified Experts
                </p>

                <p className="mt-0.5 text-[10px] text-black/50 sm:text-xs">
                  Guidance you can trust.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}