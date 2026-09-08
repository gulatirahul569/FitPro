"use client";

import { useState } from "react";
import { Calendar, Clock, Star } from "lucide-react";
import ReviewModal from "./ReviewModal";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function BookingCard({ booking, hasReview }) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
          {booking.trainerName?.charAt(0)?.toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-medium text-black text-sm">{booking.trainerName}</p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-1">
            {booking.type === "demo" ? "Free Demo Session" : "Paid Session"}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {booking.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {booking.time}
            </span>
          </div>
        </div>

        {booking.status === "completed" && (
          <div className="shrink-0">
            {hasReview ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Star size={13} className="text-yellow-500" fill="currentColor" />
                Reviewed
              </span>
            ) : (
              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                <Star size={13} />
                Leave a Review
              </button>
            )}
          </div>
        )}
      </div>

      {showReviewModal && (
        <ReviewModal booking={booking} onClose={() => setShowReviewModal(false)} />
      )}
    </>
  );
}