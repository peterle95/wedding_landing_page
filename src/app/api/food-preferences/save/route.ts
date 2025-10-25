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
    const foodPreference = (body?.foodPreference || "").toString().trim();
    if (!name || !foodPreference) {
      return NextResponse.json({ error: "Missing name or food preference" }, { status: 400 });
    }

    const sheets = await getSheetsClient();

    // Read rows to find the row index for the name
    const range = `'${SHEET_NAME}'!A:I`;
    const { data } = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
    const rows = data.values || [];
    if (rows.length <= 1) return NextResponse.json({ error: "No data" }, { status: 404 });

    // Find row by name in column A, case-insensitive trim match
    const rowIndex = rows.findIndex((r, idx) => idx > 0 && (r[0] || "").toString().trim().toLowerCase() === name.toLowerCase());
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    // Sheets API is 1-indexed. rowIndex is actual index in array; header is row 1.
    const sheetRowNumber = rowIndex + 1;

    // Column I is food preference (9th column)
    const updateRange = `'${SHEET_NAME}'!I${sheetRowNumber}:I${sheetRowNumber}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: updateRange,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[foodPreference]] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/food-preferences save error", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
