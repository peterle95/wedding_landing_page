export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.error("CLIENT-SIDE ERROR:", body);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/client-error error", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}