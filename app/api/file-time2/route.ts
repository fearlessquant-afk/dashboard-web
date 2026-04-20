import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dashboardRes = await fetch(
      "https://dashboard-web-kohl-alpha.vercel.app/dashboard.pdf",
      { method: "HEAD", cache: "no-store" }
    );

    const tradesRes = await fetch(
      "https://dashboard-web-kohl-alpha.vercel.app/trades.pdf",
      { method: "HEAD", cache: "no-store" }
    );

    return NextResponse.json({
      dashboardLastModified: dashboardRes.headers.get("last-modified"),
      tradesLastModified: tradesRes.headers.get("last-modified"),
    });
  } catch (error) {
    console.error("Error reading PDF headers:", error);
    return NextResponse.json(
      { error: "Failed to read PDF time" },
      { status: 500 }
    );
  }
}