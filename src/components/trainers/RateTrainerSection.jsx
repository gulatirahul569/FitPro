"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import ReviewModal from "@/app/user/bookings/ReviewModal";

export default function RateTrainerSection({ booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-black font-medium hover:border-black transition-colors mb-3"
      >
        <Star size={16} />
        Rate This Trainer
      </button>

      {showModal && (
        <ReviewModal
          booking={{ ...booking, _id: booking._id.toString() }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}