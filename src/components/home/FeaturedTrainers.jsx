import Link from "next/link";
import { trainers } from "@/data/trainers";
import TrainerCard from "@/components/trainers/TrainerCard";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedTrainers() {
  const featured = trainers.slice(0, 3);

  return (
    <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gray-50 rounded-full blur-3xl opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
            Meet Our Expert Trainers
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Certified professionals ready to help you reach your goals
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((trainer, index) => (
            <Reveal key={trainer.id} delay={index * 120}>
              <div className="group transition-transform duration-300 hover:-translate-y-2">
                <TrainerCard trainer={trainer} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="flex justify-center mt-12">
            <Link
              href="/trainers"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View All Trainers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}