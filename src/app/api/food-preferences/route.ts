export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "node:fs";

// Expected envs
const SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEETS_SHEET_NAME;

function getServiceAccountCredentials(): any {
  const json = process.env.SERVICE_ACCOUNT_KEY;
  if (json) {
    return JSON.parse(json);
  }
  // In production, require SERVICE_ACCOUNT_KEY to be set in env.
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("Missing SERVICE_ACCOUNT_KEY env in production");
  }
  // Local dev fallback: read from file if available.
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || "./workflow-431609-131520e174ca.json";
  const raw = fs.readFileSync(keyFile, "utf8");
  return JSON.parse(raw);
}

async function getSheetsClient() {
  const creds = getServiceAccountCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function GET() {
  try {
    if (!SPREADSHEET_ID || !SHEET_NAME) {
      return NextResponse.json({ error: "Missing SHEETS_SPREADSHEET_ID or SHEETS_SHEET_NAME env" }, { status: 500 });
    }

    const sheets = await getSheetsClient();
    // Read from Column E (5th column) to get food preference options
    const range = `'${SHEET_NAME}'!E:E`;

    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    const rows = data.values || [];
    if (rows.length <= 1) return NextResponse.json({ foodOptions: [] });

    // Extract unique food preference options from Column E (skip header row)
    const foodOptions = rows.slice(1)
      .map((row) => (row[0] || "").toString().trim())
      .filter((option) => !!option)
      .filter((option, index, arr) => arr.indexOf(option) === index); // Remove duplicates

    return NextResponse.json({ foodOptions });
  } catch (err: any) {
    console.error("/api/food-preferences error", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
