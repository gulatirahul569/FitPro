import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ananya",
    location: "Chandigarh",
    quote: "My trainer completely changed the way I approach fitness. I finally feel consistent.",
  },
  {
    name: "Rohan",
    location: "Delhi",
    quote: "Booking a session was so simple, and my trainer actually listens to my goals.",
  },
  {
    name: "Priya",
    location: "Mumbai",
    quote: "The yoga sessions helped me build a routine I've stuck to for months now.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Real People. Real Results.
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Hear it from members who found their trainer here
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col"
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-1">"{t.quote}"</p>
              <p className="font-semibold text-black">
                — {t.name}, <span className="text-gray-500 font-normal">{t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}