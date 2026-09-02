import { CheckCircle2 } from "lucide-react";

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
    <section className="py-16 px-6 md:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Why Train With Us?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Everything you need to train smarter, safer, and with people you can trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 hover:border-black hover:bg-white transition-colors duration-200"
            >
              <CheckCircle2 size={22} className="text-black shrink-0" />
              <span className="font-medium text-black">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold mb-1 text-black">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}