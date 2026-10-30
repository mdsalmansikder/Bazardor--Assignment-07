import { auth, isDatabaseConfigured } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { type NextRequest } from "next/server";

const betterAuthHandlers = toNextJsHandler(auth);

function databaseNotConfiguredResponse() {
  return new Response(
    JSON.stringify({
      error: "Database not configured",
      message:
        "BETTER_AUTH_DB_URL (or MONGODB_URI) must be set in your environment variables to enable authentication.",
    }),
    {
      status: 503,
      headers: { "content-type": "application/json" },
    }
  );
}

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfiguredResponse();
  return betterAuthHandlers.GET(request);
}

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfiguredResponse();
  return betterAuthHandlers.POST(request);
}

export async function PATCH(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfiguredResponse();
  return betterAuthHandlers.PATCH(request);
}

export async function PUT(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfiguredResponse();
  return betterAuthHandlers.PUT(request);
}

export async function DELETE(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfiguredResponse();
  return betterAuthHandlers.DELETE(request);
}
