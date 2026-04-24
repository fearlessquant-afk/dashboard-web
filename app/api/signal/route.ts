import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

export async function GET(request: NextRequest) {
  const expectedKey = process.env.SIGNAL_API_KEY;

  if (!expectedKey) {
    return NextResponse.json(
      { error: "Server is missing SIGNAL_API_KEY" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token || token !== expectedKey) {
    return unauthorized();
  }

  try {
    const snapshotPath = path.join(process.cwd(), "public", "snapshot.json");
    const raw = await readFile(snapshotPath, "utf8");
    const snapshot = JSON.parse(raw);

    return NextResponse.json(snapshot, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (err) {
    console.error("Failed to read snapshot.json", err);
    return NextResponse.json(
      { error: "snapshot.json not found or invalid" },
      { status: 500 }
    );
  }
}
