# RSVP feature: Google Sheets Integration

This document describes how the RSVP flow is implemented and how to configure it.

## What we added

- __API route `src/app/api/guests/route.ts`__: Reads names from Google Sheets and returns guests whose RSVP status is still pending.
- __API route `src/app/api/rsvp/route.ts`__: Accepts a POST with `{ name, status }` and updates the RSVP status in the sheet.
- __Frontend `src/app/rsvp/page.tsx`__: 
  - Fetches guest names from `/api/guests` and shows a dropdown.
  - Requires typing your name to confirm it matches the selected name.
  - Sends Accept/Decline to `/api/rsvp`.
- __Dependency__: `googleapis` added to `package.json`.

## Google configuration

- __Service Account__: Must have at least Editor permission to your sheet.
- __Share__: In Google Sheets, share the sheet with the service account email from your JSON key.

## Environment variables

Create `.env.local` at the project root with the following:

```
SHEETS_SPREADSHEET_ID=1HmXl3NyEuD6suhMoQR7bxeFo8a240ScEGOqbgRiYm0U
SHEETS_SHEET_NAME=Rocca Grimalda
# Option A: paste JSON into env (keep it private!)
# SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Option B: point to a local key file path (default used if omitted)
# GOOGLE_APPLICATION_CREDENTIALS=./wedding-website-470208-88ce14691db5.json
```

Notes:
- The API routes first try `SERVICE_ACCOUNT_KEY` (inline JSON). If not set, they read the file at `GOOGLE_APPLICATION_CREDENTIALS`. If that is not set, they default to `./wedding-website-470208-88ce14691db5.json` in the project root.
- Do not commit your key file. It is already ignored in `.gitignore`.

## Install & run

- Install dependency:

```
npm install
```

(If the dev server is running, restart it.)

- Start dev server:

```
npm run dev
```

## Testing the flow

1. Visit `/rsvp`.
2. Select your name from the dropdown.
3. Type the exact same name in the confirmation input.
4. Click Accept or Decline.
5. Verify column `G` (RSVP status) in the sheet updates for that row.

## Assumptions

- __Columns__: `A` is Name, `G` is RSVP status. First row is the header.
- __Pending values__: Guests are considered pending if column `G` is empty or equals "Awaiting response" (case-insensitive).

## Troubleshooting

- __Guest not found__: Ensure the name in column A exactly matches the dropdown entry (whitespace/case are normalized in matching).
- __Auth errors__: Confirm the sheet is shared with the service account email and the service account has Editor role.
- __Edge runtime error__: Routes export `runtime = "nodejs"` so that `fs` is available. Ensure you are on Next 15+.

## Future improvements

- Log RSVP timestamp and optional notes.
- Support plus-ones or grouping by household keys.
- Rate-limit and CAPTCHA to reduce abuse.
