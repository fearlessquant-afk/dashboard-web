import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tradesUpdated = fs.readFileSync(
      path.join(process.cwd(), "public", "trades-updated.txt"),
      "utf8"
    );

    return NextResponse.json({
      tradesLastModified: tradesUpdated.trim(),
    });
  } catch (error) {
    console.error("Error reading trades update time:", error);

    return NextResponse.json(
      { error: "Failed to read trades update time." },
      { status: 500 }
    );
  }
}