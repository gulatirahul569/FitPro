"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const DEFAULT_SCHEDULE = {
  monday: { enabled: false, start: "", end: "" },
  tuesday: { enabled: false, start: "", end: "" },
  wednesday: { enabled: false, start: "", end: "" },
  thursday: { enabled: false, start: "", end: "" },
  friday: { enabled: false, start: "", end: "" },
  saturday: { enabled: false, start: "", end: "" },
  sunday: { enabled: false, start: "", end: "" },
};

export default function ScheduleClient() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  async function fetchSchedule() {
    try {
      const response = await fetch("/api/trainer/schedule");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load schedule.");
      }

      setSchedule({
        ...DEFAULT_SCHEDULE,
        ...data.schedule,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function updateDay(day, field, value) {
    setSchedule((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        [field]: value,
      },
    }));
  }

  function toggleDay(day) {
    setSchedule((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        enabled: !previous[day].enabled,
      },
    }));
  }

  async function saveSchedule() {
    setSaving(true);

    setMessage({
      type: "",
      text: "",
    });

    try {
      const response = await fetch("/api/trainer/schedule", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save schedule.");
      }

      setSchedule(data.schedule);

      setMessage({
        type: "success",
        text: "Your schedule has been updated successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-6 sm:space-y-6 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="flex items-start gap-3 sm:items-center">
        <div className="shrink-0 rounded-xl bg-blue-50 p-2.5 text-blue-600 sm:p-3">
          <CalendarDays size={22} className="sm:hidden" />
          <CalendarDays size={24} className="hidden sm:block" />
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            My Schedule
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Set the days and hours when clients can book your training
            sessions.
          </p>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          role="alert"
          className={`flex items-start gap-3 rounded-xl border p-4 ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
          )}

          <span className="text-sm font-medium leading-relaxed">
            {message.text}
          </span>
        </div>
      )}

      {/* Schedule */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="font-semibold text-gray-900">
            Weekly Availability
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Enable a day and select your available training hours.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {DAYS.map((day) => {
            const daySchedule = schedule[day.key];

            return (
              <div
                key={day.key}
                className="p-4 transition hover:bg-gray-50 sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Day / Toggle */}
                  <div className="flex items-center justify-between gap-4 lg:w-52 lg:justify-start">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDay(day.key)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                          daySchedule.enabled
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Toggle ${day.label}`}
                        aria-pressed={daySchedule.enabled}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                            daySchedule.enabled ? "left-6" : "left-1"
                          }`}
                        />
                      </button>

                      <div>
                        <p className="font-medium text-gray-900">
                          {day.label}
                        </p>

                        <p
                          className={`text-xs ${
                            daySchedule.enabled
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {daySchedule.enabled
                            ? "Available"
                            : "Unavailable"}
                        </p>
                      </div>
                    </div>

                    {/* Mobile availability label */}
                    {!daySchedule.enabled && (
                      <span className="text-xs text-gray-400 lg:hidden">
                        Not available
                      </span>
                    )}
                  </div>

                  {/* Time inputs */}
                  {daySchedule.enabled ? (
                    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:flex sm:w-auto sm:gap-3">
                      <div className="relative min-w-0">
                        <Clock
                          size={16}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          type="time"
                          value={daySchedule.start}
                          onChange={(e) =>
                            updateDay(day.key, "start", e.target.value)
                          }
                          aria-label={`${day.label} start time`}
                          className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-36 sm:pl-10 sm:pr-4"
                        />
                      </div>

                      <span className="text-center text-sm text-gray-400">
                        to
                      </span>

                      <div className="relative min-w-0">
                        <Clock
                          size={16}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          type="time"
                          value={daySchedule.end}
                          onChange={(e) =>
                            updateDay(day.key, "end", e.target.value)
                          }
                          aria-label={`${day.label} end time`}
                          className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-36 sm:pl-10 sm:pr-4"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden text-sm text-gray-400 lg:block lg:pr-10">
                      Not available
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save button */}
        <div className="flex border-t border-gray-200 bg-gray-50 px-4 py-4 sm:justify-end sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={saveSchedule}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            {saving ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50  sm:p-5">
        <h3 className="font-semibold text-blue-900">
          How your schedule works
        </h3>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-blue-800">
          <li>• Enable the days you accept training sessions.</li>
          <li>• Set your starting and ending availability.</li>
          <li>• Clients will see these hours when booking sessions.</li>
          <li>• Update your availability whenever your schedule changes.</li>
        </ul>
      </div>
    </div>
  );
}