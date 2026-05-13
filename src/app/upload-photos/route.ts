import { NextResponse } from "next/server";

export function GET() {
  const uploadUrl = process.env.GOOGLE_DRIVE_UPLOAD_URL;

  if (!uploadUrl) {
    return NextResponse.json(
      { error: "Google Drive upload URL is not configured." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(uploadUrl, 302);
}