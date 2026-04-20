"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SignOutButton from "./sign-out-button";

type UserEmail = string | null;

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<UserEmail>(null);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? null);
      setLoading(false);
    }

    checkUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="rounded-xl bg-white px-6 py-4 shadow text-gray-700">
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-[95%]">

        {/* ===== HEADER ===== */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                X-System Dashboard
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                Shared dashboard PDF for trial viewing
              </p>

              <p className="text-sm text-gray-500">
                Signed in as: {userEmail}
              </p>

              <p className="text-sm text-gray-500">
                Last updated: April 17, 2026
              </p>
            </div>

            <SignOutButton />
          </div>

          {/* ===== BUTTONS ===== */}
          <div className="mt-3 flex gap-3 flex-wrap">

            {/* Dashboard */}
            <a
              href="/dashboard.pdf"
              target="_blank"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              Open Dashboard
            </a>

            <a
              href="/dashboard.pdf"
              download
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Download Dashboard
            </a>

            {/* Trades */}
            <a
              href="/trades.pdf"
              target="_blank"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Open Trades
            </a>

            <a
              href="/trades.pdf"
              download
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Download Trades
            </a>

          </div>
        </div>

        {/* ===== DASHBOARD VIEW ===== */}
        <div className="mb-6 rounded-2xl bg-white p-2 shadow">
          <h2 className="px-3 pt-2 text-lg font-semibold text-gray-800">
            Dashboard
          </h2>
          <iframe
            src="/dashboard.pdf"
            title="Dashboard PDF"
            className="w-full h-[80vh] rounded-xl border mt-2"
          />
        </div>

        {/* ===== TRADES VIEW ===== */}
        <div className="rounded-2xl bg-white p-2 shadow">
          <h2 className="px-3 pt-2 text-lg font-semibold text-gray-800">
            Trades
          </h2>
          <iframe
            src="/trades.pdf"
            title="Trades PDF"
            className="w-full h-[80vh] rounded-xl border mt-2"
          />
        </div>

      </div>
    </main>
  );
}