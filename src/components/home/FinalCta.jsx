import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section className="relative py-28 px-6 md:px-12 text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <Reveal>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Your Fitness Journey <br className="hidden sm:block" />
            Starts Today.
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            Find a trainer. Book a session. Get results.
          </p>
          <Link
            href="/trainers"
            className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Get Started
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}