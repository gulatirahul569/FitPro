"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function BecomeTrainerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    specialization: "",
    experience: "",
    certification: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/trainer-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/become-trainer/success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#f5f5f3]">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20">
          <div className="grid w-full gap-12 lg:grid-cols-2">

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                Become a FitPro Trainer
              </p>

              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
                Turn Your
                <br />
                <span className="text-gray-400">Knowledge</span>
                <br />
                Into Impact.
              </h1>

              <p className="mt-6 max-w-lg leading-7 text-gray-600">
                Join FitPro and help people build stronger, healthier lives
                through personalized training.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wide text-white"
              >
                Login to Continue
                <ArrowRight size={17} />
              </Link>
            </div>

            <Benefits />

          </div>
        </div>
      </main>
    );
  }

  if (session.user.role === "trainer") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] px-6">
        <div className="text-center">
          <Dumbbell className="mx-auto mb-5" size={40} />

          <h1 className="text-3xl font-black">
            You're already a trainer.
          </h1>

          <Link
            href="/trainer/dashboard"
            className="mt-6 inline-flex bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Go to Trainer Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (session.user.role === "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black">
            Administrator Account
          </h1>

          <Link
            href="/admin/dashboard"
            className="mt-6 inline-flex bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Go to Admin Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] px-6 py-20">

      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            FitPro Trainer Application
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em]">
            Become a Trainer
          </h1>

          <p className="mt-4 max-w-xl text-gray-600">
            Tell us about your experience and expertise. Our admin team
            will review your application.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 bg-white p-6 sm:p-8"
          >

            <div className="grid gap-6 sm:grid-cols-2">

              <Field
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
                  Specialization
                </label>

                <select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                  className="h-12 w-full border border-gray-200 bg-white px-4 text-sm outline-none focus:border-black"
                >
                  <option value="">Select specialization</option>
                  <option value="Strength Training">
                    Strength Training
                  </option>
                  <option value="Weight Loss">
                    Weight Loss
                  </option>
                  <option value="Yoga">
                    Yoga
                  </option>
                  <option value="Cardio">
                    Cardio
                  </option>
                  <option value="CrossFit">
                    CrossFit
                  </option>
                  <option value="Mobility">
                    Mobility
                  </option>
                  <option value="Sports Training">
                    Sports Training
                  </option>
                  <option value="Nutrition">
                    Nutrition
                  </option>
                </select>
              </div>

              <Field
                label="Years of Experience"
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
                placeholder="5"
                required
              />

              <Field
                label="Certification"
                name="certification"
                value={form.certification}
                onChange={handleChange}
                placeholder="ACE / NASM / ISSA..."
                required
              />

            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
                About You
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us about your training experience..."
                className="w-full resize-none border border-gray-200 p-4 text-sm outline-none focus:border-black"
              />
            </div>

            {error && (
              <div className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}

              {!loading && <ArrowRight size={17} />}
            </button>

          </form>

          {/* SIDE */}
          <Benefits />

        </div>
      </div>
    </main>
  );
}


function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full border border-gray-200 px-4 text-sm outline-none focus:border-black"
      />
    </div>
  );
}


function Benefits() {
  return (
    <div className="space-y-4">

      <Benefit
        icon={Users}
        title="Build Your Client Base"
        text="Connect with people looking for professional trainers."
      />

      <Benefit
        icon={Dumbbell}
        title="Share Your Expertise"
        text="Create training content and showcase your fitness knowledge."
      />

      <Benefit
        icon={ShieldCheck}
        title="Verified Trainer Profile"
        text="Get a professional profile after your application is approved."
      />

    </div>
  );
}


function Benefit({ icon: Icon, title, text }) {
  return (
    <div className="border border-gray-200 bg-white p-6">

      <Icon size={22} />

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}