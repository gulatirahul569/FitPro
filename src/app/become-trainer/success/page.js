import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ApplicationSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] px-6">

      <div className="max-w-xl text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
          <CheckCircle2 size={30} />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Application Submitted
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">
          You're one step closer.
        </h1>

        <p className="mt-5 leading-7 text-gray-600">
          Your trainer application has been submitted successfully.
          Our admin team will review your application and update its status.
        </p>

        <div className="mt-8 flex justify-center gap-3">

          <Link
            href="/"
            className="border border-black px-6 py-3 text-sm font-semibold"
          >
            Back to Website
          </Link>

          <Link
            href="/user/dashboard"
            className="flex items-center gap-2 bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Dashboard
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </main>
  );
}