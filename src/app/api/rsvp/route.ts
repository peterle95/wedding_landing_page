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

// Food preference translations - maps localized values to English
const FOOD_OPTIONS = [
  { key: "vegan", en: "Vegan", it: "Vegano", de: "Vegan", ru: "Веганское" },
  { key: "vegetarian", en: "Vegetarian", it: "Vegetariano", de: "Vegetarisch", ru: "Вегетарианское" },
  { key: "no_restrictions", en: "No Restrictions", it: "Nessuna restrizione", de: "Keine Einschränkungen", ru: "Без ограничений" },
  { key: "other", en: "Other", it: "Altro", de: "Sonstiges", ru: "Другое" },
];

function translateFoodPreferenceToEnglish(localizedValue: string): string {
  if (!localizedValue) return "";

  // Check if it's already in English
  const englishOption = FOOD_OPTIONS.find((o) => o.en.toLowerCase() === localizedValue.toLowerCase());
  if (englishOption) return englishOption.en;

  // Search through all language variants
  for (const option of FOOD_OPTIONS) {
    if (
      option.it.toLowerCase() === localizedValue.toLowerCase() ||
      option.de.toLowerCase() === localizedValue.toLowerCase() ||
      option.ru.toLowerCase() === localizedValue.toLowerCase()
    ) {
      return option.en;
    }
  }

  // If no match found, return the original value
  return localizedValue;
}

function getCETTimestamp(date: Date): string {
  // CET is UTC+1, CEST is UTC+2
  // CEST applies from last Sunday in March to last Sunday in October

  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value;
  const yearStr = get("year");
  const monthStr = get("month");
  const dayStr = get("day");
  const hoursStr = get("hour");
  const minutesStr = get("minute");
  const secondsStr = get("second");

  if (!yearStr || !monthStr || !dayStr || !hoursStr || !minutesStr || !secondsStr) {
    return date.toISOString();
  }

  return `${yearStr}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
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
    const foodPreferenceRaw = (body?.foodPreference || "").toString().trim(); // Optional for declined
    const foodPreference = translateFoodPreferenceToEnglish(foodPreferenceRaw); // Translate to English
    const guestCount = (body?.guestCount || 1).toString().trim(); // Number of guests
    const email = (body?.email || "").toString().trim(); // Guest email
    const hasAllergies = (body?.hasAllergies || "").toString().trim(); // yes | no
    const allergyDetails = (body?.allergyDetails || "").toString().trim(); // Details if yes

    if (!name || !surname || !status) {
      return NextResponse.json({ error: "Missing name, surname or status" }, { status: 400 });
    }

    // Allergy fields are mandatory
    if (!hasAllergies) {
      return NextResponse.json({ error: "Please specify if you have allergies" }, { status: 400 });
    }

    // If allergies are selected, details are required
    if (hasAllergies.toLowerCase() === "yes" && !allergyDetails) {
      return NextResponse.json({ error: "Please provide details about your allergies" }, { status: 400 });
    }

    // For accepted RSVPs, food preference is required
    if (status.toLowerCase() === "accepted" && !foodPreferenceRaw) {
      return NextResponse.json({ error: "Food preference required for accepted RSVP" }, { status: 400 });
    }

    const sheets = await getSheetsClient();
    // Insert a new row at position 2 (after header): [Name, Surname, RSVP status, Date Response, Food, Guest Count, Email, Has Allergies, Allergy Details]
    const targetSheet = status.toLowerCase() === "accepted" ? "LandingPage" : SHEET_NAME;
    const now = new Date();
    const values = [
      name,
      surname,
      status,
      getCETTimestamp(now),
      foodPreference || "",
      guestCount,
      email,
      hasAllergies,
      allergyDetails || "",
    ];

    // First, get the sheet ID for the target sheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = spreadsheet.data.sheets?.find(
      (s) => s.properties?.title === targetSheet
    );

    if (!sheet?.properties?.sheetId && sheet?.properties?.sheetId !== 0) {
      return NextResponse.json({ error: `Sheet "${targetSheet}" not found` }, { status: 404 });
    }

    const sheetId = sheet.properties.sheetId;

    // Insert a new row at index 1 (row 2, after the header)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: 1, // 0-indexed, so row 2
                endIndex: 2,
              },
              inheritFromBefore: false,
            },
          },
        ],
      },
    });

    // Now update the newly inserted row with our values
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${targetSheet}'!A2:I2`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/rsvp error", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
