"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "Ananya",
    location: "Chandigarh",
    quote:
      "My trainer completely changed the way I approach fitness. I finally feel consistent and confident in my fitness journey.",
  },
  {
    name: "Rohan",
    location: "Delhi",
    quote:
      "Booking a session was so simple, and my trainer actually listens to my goals. Every workout feels personalized.",
  },
  {
    name: "Priya",
    location: "Mumbai",
    quote:
      "The yoga sessions helped me build a routine I've stuck to for months now. I feel healthier, calmer, and more active.",
  },
  {
    name: "Arjun",
    location: "Pune",
    quote:
      "Finding the right trainer made a huge difference. The sessions are challenging, enjoyable, and perfectly suited to my goals.",
  },
];

const slides = [...testimonials, testimonials[0]];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const sliderRef = useRef(null);

  const updateSliderPosition = () => {
    if (!sliderRef.current) return;

    const firstSlide = sliderRef.current.children[0];

    if (!firstSlide) return;

    const slideWidth = firstSlide.getBoundingClientRect().width;
    const gap = 32;

    setTranslateX(activeIndex * (slideWidth + gap));
  };

  useEffect(() => {
    updateSliderPosition();

    const resizeObserver = new ResizeObserver(() => {
      updateSliderPosition();
    });

    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    window.addEventListener("resize", updateSliderPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (isAnimating) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeIndex, isAnimating]);

  const handleNext = () => {
    /*
      Ignore extra clicks while a slide is moving.
      This prevents moving past the cloned final slide.
    */
    if (isAnimating || activeIndex >= testimonials.length) {
      return;
    }

    setIsAnimating(true);
    setIsTransitioning(true);
    setActiveIndex((current) => current + 1);
  };

  const handlePrevious = () => {
    if (isAnimating) return;

    /*
      First testimonial -> jump invisibly to cloned first testimonial,
      then animate back to the final real testimonial.
    */
    if (activeIndex === 0) {
      setIsAnimating(true);
      setIsTransitioning(false);
      setActiveIndex(testimonials.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setActiveIndex(testimonials.length - 1);
        });
      });

      return;
    }

    setIsAnimating(true);
    setIsTransitioning(true);
    setActiveIndex((current) => current - 1);
  };

  const handleTransitionEnd = (event) => {
    /*
      Ignore transition events caused by child elements.
      Only respond to the track transform animation.
    */
    if (event.target !== sliderRef.current) return;
    if (event.propertyName !== "transform") return;

    /*
      After the final clone appears:
      clone Ananya at index 4 -> real Ananya at index 0,
      with no visible animation.
    */
    if (activeIndex === testimonials.length) {
      setIsTransitioning(false);
      setActiveIndex(0);

      requestAnimationFrame(() => {
        setIsAnimating(false);
      });

      return;
    }

    setIsAnimating(false);
  };

  return (
    <section className="overflow-hidden bg-gray-50 py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[390px_1fr] lg:gap-16">
          {/* Left content */}
          <Reveal>
            <div className="max-w-[360px]">
              <div className="mb-7 inline-block">
                <p className="text-[15px] font-medium tracking-wide text-[#222] md:text-[16px]">
                  TESTIMONIALS
                </p>

                <div className="mt-2 h-[2px] w-[133px] bg-lime-500" />
              </div>

              <h2 className="text-[48px] font-extrabold leading-[0.98] tracking-[-2.5px] text-[#252525] sm:text-[54px] md:text-[58px] lg:text-[60px]">
                What people
                <br />
                say about us
                <span className="text-lime-500">.</span>
              </h2>

              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label="Previous testimonial"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-[#222] transition-all duration-300 hover:border-black hover:bg-black hover:text-white active:scale-95"
                >
                  <ArrowLeft size={20} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-[#222] transition-all duration-300 hover:border-black hover:bg-black hover:text-white active:scale-95"
                >
                  <ArrowRight size={20} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Slider */}
          <div className="relative min-w-0 w-full">
            <div className="w-full overflow-hidden">
              <div
                ref={sliderRef}
                onTransitionEnd={handleTransitionEnd}
                className={`flex gap-8 ${
                  isTransitioning
                    ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    : ""
                }`}
                style={{
                  transform: `translate3d(-${translateX}px, 0, 0)`,
                  willChange: "transform",
                }}
              >
                {slides.map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${index}`}
                    className="w-full flex-none md:w-[82%] lg:w-[70%] xl:w-[62%]"
                  >
                    <article className="relative min-h-[310px] rounded-4xl border border-gray-200 bg-white p-8 shadow-[0_8px_35px_rgba(0,0,0,0.07)] md:min-h-[290px] md:p-10 lg:p-11">
                      <div className="pointer-events-none absolute right-8 top-7 select-none font-serif text-[70px] leading-none text-gray-100 md:right-10 md:top-9">
                        “
                      </div>

                      <h3 className="relative z-10 mb-6 text-[20px] font-semibold text-[#303030] md:text-[21px]">
                        {testimonial.name}
                      </h3>

                      <p className="relative z-10 max-w-[520px] text-[17px] font-normal leading-[1.75] text-[#777] md:text-[18px]">
                        {testimonial.quote}
                      </p>

                      <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
                        <p className="text-sm text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-5 h-[3px] w-20 bg-lime-500" />
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}