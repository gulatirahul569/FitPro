"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function BookingModal({
  trainerId,
  trainerName,
  trigger,
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("demo");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (session?.user?.id === trainerId) {
      setError("You can't book a session with yourself.");
      return;
    }

    setIsOpen(true);
  };

  /*
   * Fetch available slots whenever
   * trainer or selected date changes.
   */
  useEffect(() => {
    if (!date || !isOpen) {
      setTimeSlots([]);
      setTime("");
      return;
    }

    async function fetchAvailableSlots() {
      setLoadingSlots(true);
      setTimeSlots([]);
      setTime("");
      setError("");

      try {
        const res = await fetch(
          `/api/trainers/${trainerId}/availability?date=${date}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Failed to load available slots."
          );
        }

        setTimeSlots(data.slots || []);
      } catch (err) {
        console.error("Availability error:", err);

        setError(
          err.message || "Failed to load available time slots."
        );
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchAvailableSlots();
  }, [date, trainerId, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !time) {
      setError("Please select both a date and a time.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainerId,
          type,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setDate("");
    setTime("");
    setType("demo");
    setTimeSlots([]);
    setError("");
  };

  const handleViewBookings = () => {
    handleClose();
    router.push("/user/bookings");
  };

  /*
   * Use local date instead of UTC so the minimum
   * date doesn't shift because of timezone.
   */
  const now = new Date();

  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors mb-3"
      >
        Book a Demo Session
      </button>

      {error && !isOpen && (
        <p className="text-xs text-red-600 mb-3">
          {error}
        </p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            {success ? (
              /* =========================
                 BOOKING REQUEST SENT
              ========================== */
              <div className="text-center py-5">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2
                    size={32}
                    className="text-green-600"
                  />
                </div>

                <h3 className="text-xl font-semibold text-black mb-2">
                  Request Sent Successfully!
                </h3>

                <p className="text-sm text-gray-500 leading-6 mb-5">
                  Your booking request has been sent to{" "}
                  <span className="font-medium text-gray-700">
                    {trainerName}
                  </span>
                  .
                </p>

                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Hourglass
                        size={18}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">
                        Waiting for Trainer Approval
                      </p>

                      <p className="text-xs text-amber-700 leading-5">
                        Your booking is currently{" "}
                        <span className="font-semibold">
                          pending
                        </span>
                        . The trainer needs to accept your request
                        before the session is confirmed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar
                      size={16}
                      className="text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Date
                      </p>

                      <p className="text-sm font-medium text-gray-800">
                        {date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock
                      size={16}
                      className="text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Time
                      </p>

                      <p className="text-sm font-medium text-gray-800">
                        {time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleViewBookings}
                    className="w-full py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    View My Bookings
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* =========================
                 BOOKING FORM
              ========================== */
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-black">
                    Book with {trainerName}
                  </h3>

                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Session Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Type
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setType("demo")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          type === "demo"
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Free Demo
                      </button>

                      <button
                        type="button"
                        onClick={() => setType("session")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          type === "session"
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Paid Session
                      </button>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Date
                    </label>

                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) =>
                          setDate(e.target.value)
                        }
                        className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>

                    {/* Loading */}
                    {loadingSlots && (
                      <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-5 text-sm text-gray-500">
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Loading available times...
                      </div>
                    )}

                    {/* No date */}
                    {!date && !loadingSlots && (
                      <div className="rounded-lg border border-dashed border-gray-300 py-5 text-center">
                        <Calendar
                          size={20}
                          className="mx-auto mb-2 text-gray-400"
                        />

                        <p className="text-sm text-gray-500">
                          Select a date to see available times.
                        </p>
                      </div>
                    )}

                    {/* No slots */}
                    {date &&
                      !loadingSlots &&
                      timeSlots.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-5 text-center">
                          <Clock
                            size={20}
                            className="mx-auto mb-2 text-gray-400"
                          />

                          <p className="text-sm font-medium text-gray-700">
                            No available times
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            This trainer is unavailable on this
                            date or all slots are already booked.
                          </p>
                        </div>
                      )}

                    {/* Available slots */}
                    {!loadingSlots &&
                      timeSlots.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTime(slot)}
                              className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                                time === slot
                                  ? "border-black bg-black text-white"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      submitting ||
                      loadingSlots ||
                      !date ||
                      !time
                    }
                    className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? "Sending Request..."
                      : "Send Booking Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}