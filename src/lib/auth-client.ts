import { createAuthClient } from "better-auth/react";

const authBaseURL =
  process.env.NEXT_PUBLIC_AUTH_URL?.trim() ||
  (typeof window !== "undefined"
    ? window.location.origin
    : process.env.BETTER_AUTH_URL?.trim() || "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});

