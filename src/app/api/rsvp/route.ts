export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "node:fs";

const SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEETS_SHEET_NAME;

function getServiceAccountCredentials(): any {
  const json = process.env.SERVICE_ACCOUNT_KEY;
  if (json) return JSON.parse(json);
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("Missing SERVICE_ACCOUNT_KEY env in production");
  }
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || "./workflow-431609-131520e174ca.json";
  const raw = fs.readFileSync(keyFile, "utf8");
  return JSON.parse(raw);
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: getServiceAccountCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function POST(req: Request) {
  try {
    if (!SPREADSHEET_ID || !SHEET_NAME) {
      return NextResponse.json({ error: "Missing SHEETS_SPREADSHEET_ID or SHEETS_SHEET_NAME env" }, { status: 500 });
    }

    const body = await req.json();
    const name = (body?.name || "").toString().trim();
    const surname = (body?.surname || "").toString().trim();
    const status = (body?.status || "").toString().trim(); // Accepted | Declined
    const foodPreference = (body?.foodPreference || "").toString().trim(); // Optional for declined
    const guestCount = (body?.guestCount || 1).toString().trim(); // Number of guests
    const email = (body?.email || "").toString().trim(); // Guest email

    if (!name || !surname || !status) {
      return NextResponse.json({ error: "Missing name, surname or status" }, { status: 400 });
    }

    // For accepted RSVPs, food preference is required
    if (status.toLowerCase() === "accepted" && !foodPreference) {
      return NextResponse.json({ error: "Food preference required for accepted RSVP" }, { status: 400 });
    }

    const sheets = await getSheetsClient();
    // Append a new row: [Name, Surname, RSVP status, Date Response, Food, Guest Count, Email]
    const targetSheet = status.toLowerCase() === "accepted" ? "LandingPage" : SHEET_NAME;
    const appendRange = `'${targetSheet}'!A:G`;
    const now = new Date();
    const values = [
      name,
      surname,
      status,
      now.toISOString(),
      foodPreference || "",
      guestCount,
      email,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: appendRange,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [values] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/rsvp error", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
