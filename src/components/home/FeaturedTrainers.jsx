"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { trainers } from "@/data/trainers";
import Reveal from "@/components/ui/Reveal";

const SWIPE_THRESHOLD = 120;
const EXIT_DISTANCE = 600;

export default function FeaturedTrainers() {
  const list = trainers.slice(0, 5);

  return (
    <section className="relative z-10 - overflow-hidden  bg-gray-50 px-6 pb-24  md:px-0 md:pt-12 md:pb-12">
      {/* Ambient accent */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gray-100 blur-3xl " />

      <div className="mx-auto max-w-7xl md:px-12">
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight text-black md:text-5xl">
            Meet Our Expert <span className="text-gray-400">Trainers</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">
            Certified professionals ready to help you reach your goals.
          </p>
        </Reveal>
      </div>

      {/* ================= DESKTOP: INFINITE MARQUEE ================= */}
      <div className="relative mt-12 hidden md:block">
        <div className="marquee-wrap overflow-hidden">
          <div className="marquee-track flex w-max gap-6">
            {[...list, ...list].map((trainer, i) => (
              <MarqueeCard key={`${trainer.id}-${i}`} trainer={trainer} />
            ))}
          </div>
        </div>

        {/* Plain (non-styled-jsx) style tag: avoids the scoping class
            styled-jsx injects, which caused a server/client hydration
            mismatch on this element. */}
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll 32s linear infinite;
          }
          .marquee-wrap:hover .marquee-track {
            animation-play-state: paused;
          }
        `}</style>

        <div className="mt-8 flex justify-center">
          <Link
            href="/trainers"
            className="group inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg"
          >
            View All Trainers
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* ================= MOBILE: SWIPEABLE STACK ================= */}
      <div className="mx-auto max-w-7xl md:hidden">
        <MobileStack list={list} />
      </div>
    </section>
  );
}

/* =============================================================
   DESKTOP MARQUEE CARD
   (Card itself stays dark-overlaid so name/rating stay readable
   over the photo, even though the section background is light.)
============================================================= */

function MarqueeCard({ trainer }) {
  return (
    <Link
      href={`/trainers/${trainer.id}`}
      className="group/card relative h-96 w-72 flex-shrink-0 overflow-hidden rounded-3xl border border-black/5 shadow-xl transition-transform duration-300 hover:-translate-y-2"
    >
      <img
        src={trainer.photo}
        alt={trainer.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-yellow-400">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          {trainer.rating || "New"}
        </div>

        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>

        {(trainer.location || trainer.gymName) && (
          <p className="mt-0.5 flex items-center gap-1 text-sm text-white/70">
            <MapPin size={12} />
            {trainer.location || trainer.gymName}
          </p>
        )}
      </div>
    </Link>
  );
}

/* =============================================================
   MOBILE SWIPEABLE STACK
============================================================= */

function MobileStack({ list }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [exiting, setExiting] = useState(null); // "left" | "right" | null
  const dragState = useRef({ startX: 0, isDragging: false, moved: false });

  const rotated = [...list.slice(activeIndex), ...list.slice(0, activeIndex)];

  const cycle = (direction) => {
    if (exiting || list.length < 2) return;
    setExiting(direction);

    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % list.length);
      setExiting(null);
      setDragX(0);
    }, 300);
  };

  const handlePointerDown = (e) => {
    if (exiting) return;
    dragState.current = { startX: e.clientX, isDragging: true, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDragging) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    setDragX(delta);
  };

  const handlePointerUp = () => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;

    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      cycle(dragX > 0 ? "right" : "left");
    } else {
      setDragX(0);
    }
  };

  // Prevent "open profile" from firing right after a drag
  const handleCardLinkClick = (e) => {
    if (dragState.current.moved) e.preventDefault();
  };

  const exitOffset =
    exiting === "left" ? -EXIT_DISTANCE : exiting === "right" ? EXIT_DISTANCE : 0;

  return (
    <>
      <div className="relative mx-auto mt-14 h-[480px] w-full max-w-sm select-none sm:h-[520px]">
        {rotated.slice(0, 4).map((trainer, i) => {
          const isTop = i === 0;

          const style = isTop
            ? {
                transform: `translateX(${dragX + exitOffset}px) rotate(${
                  (dragX + exitOffset) / 18
                }deg)`,
                transition: dragState.current.isDragging
                  ? "none"
                  : "transform 0.3s ease, opacity 0.3s ease",
                opacity: exiting ? 0 : 1,
                zIndex: 40,
                touchAction: "none",
              }
            : {
                transform: `translateY(${i * 14}px) scale(${1 - i * 0.05})`,
                transition: "transform 0.3s ease",
                opacity: i < 3 ? 1 - i * 0.15 : 0,
                zIndex: 40 - i,
              };

          return (
            <div
              key={trainer.id}
              style={style}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              className={`absolute inset-0 overflow-hidden rounded-3xl border border-black/5 shadow-2xl ${
                isTop
                  ? "cursor-grab active:cursor-grabbing"
                  : "pointer-events-none"
              }`}
            >
              <img
                src={trainer.photo}
                alt={trainer.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-yellow-400">
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />
                  {trainer.rating || "New"}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {trainer.name}
                </h3>

                {(trainer.location || trainer.gymName) && (
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-white/70">
                    <MapPin size={13} />
                    {trainer.location || trainer.gymName}
                  </p>
                )}

                <p className="mt-2 line-clamp-2 text-sm text-white/70">
                  {trainer.description}
                </p>

                <Link
                  href={`/trainers/${trainer.id}`}
                  onClick={handleCardLinkClick}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                >
                  View Profile
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex justify-center gap-1.5">
        {list.map((trainer, i) => (
          <span
            key={trainer.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-5 bg-black" : "w-1.5 bg-black/15"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-gray-400">
        Swipe to browse
      </p>

      <div className=" flex justify-center">
        <Link
          href="/trainers"
          className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Explore All Trainers
        </Link>
      </div>
    </>
  );
}