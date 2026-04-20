import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dashboardPath = path.join(process.cwd(), "public", "dashboard.pdf");
    const tradesPath = path.join(process.cwd(), "public", "trades.pdf");

    const dashboardStats = fs.statSync(dashboardPath);
    const tradesStats = fs.statSync(tradesPath);

    return NextResponse.json({
      dashboardLastModified: dashboardStats.mtime.toISOString(),
      tradesLastModified: tradesStats.mtime.toISOString(),
    });
  } catch (error) {
    console.error("Error reading file times:", error);

    return NextResponse.json(
      { error: "Failed to read PDF file time." },
      { status: 500 }
    );
  }
}