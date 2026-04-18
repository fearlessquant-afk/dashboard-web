import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-[95%]">
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
                Signed in as: {user.email}
              </p>

              <p className="text-sm text-gray-500">
                Last updated: April 17, 2026
              </p>
            </div>

            <SignOutButton />
          </div>

          <div className="mt-3 flex gap-3">
            <a
              href="/dashboard.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              Open Full PDF
            </a>

            <a
              href="/dashboard.pdf"
              download
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-2 shadow">
          <iframe
            src="/dashboard.pdf"
            title="Dashboard PDF"
            className="w-full h-[95vh] rounded-xl border"
          />
        </div>
      </div>
    </main>
  );
}