import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
        Your Fitness Journey Starts Today.
      </h2>
      <p className="text-gray-500 mb-8">
        Find a trainer. Book a session. Get results.
      </p>
      <Link
        href="/trainers"
        className="inline-block px-8 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Get Started
      </Link>
    </section>
  );
}