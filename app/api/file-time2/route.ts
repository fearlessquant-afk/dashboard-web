import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url = "https://dashboard-web-kohl-alpha.vercel.app/dashboard.pdf";

    const res = await fetch(url, { method: "HEAD" });

    const lastModified = res.headers.get("last-modified");

    return NextResponse.json({
      dashboardLastModified: lastModified,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "fail" }, { status: 500 });
  }
}