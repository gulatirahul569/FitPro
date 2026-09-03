import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const benefits = [
  "Certified Trainers",
  "Personalized Training",
  "Flexible Scheduling",
  "Verified Profiles",
  "Expert Guidance",
  "Progress Tracking",
];

const stats = [
  { value: "10K+", label: "Members" },
  { value: "500+", label: "Trainers" },
  { value: "50K+", label: "Sessions" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 px-6 md:px-12 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Why Train With Us?
          </h2>
          <p className="text-center text-white/60 mb-12 max-w-xl mx-auto">
            Everything you need to train smarter, safer, and with people you can trust.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit} delay={index * 80}>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-4 hover:border-white hover:bg-white/10 transition-colors duration-300">
                <CheckCircle2 size={22} className="text-white shrink-0" />
                <span className="font-medium text-white">{benefit}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="grid grid-cols-3 gap-6 border-t border-white/15 pt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold mb-1 text-white">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm text-white/50 tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}