export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

const OPTIONS = [
  { key: "vegan", en: "Vegan", it: "Vegano", de: "Vegan" },
  { key: "vegetarian", en: "Vegetarian", it: "Vegetariano", de: "Vegetarisch" },
  { key: "no_restrictions", en: "No Restrictions", it: "Nessuna restrizione", de: "Keine Einschränkungen" },
  { key: "other", en: "Other", it: "Altro", de: "Sonstiges" },
];

const translations = {
  en: OPTIONS.map((o) => o.en),
  it: OPTIONS.map((o) => o.it),
  de: OPTIONS.map((o) => o.de),
} as const;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const lang = (url.searchParams.get("lang") || "en").toLowerCase();
    const labels = (translations as any)[lang] || translations.en;

    return NextResponse.json({
      foodOptions: labels,
      translations,
    });
  } catch (err: any) {
    console.error("/api/food-preferences error", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
