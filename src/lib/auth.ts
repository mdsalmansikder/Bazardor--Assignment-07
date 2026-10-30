import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

interface CustomGlobal {
  _mongoClient?: MongoClient;
}

const customGlobal = globalThis as unknown as CustomGlobal;

const rawDbUrl =
  process.env.BETTER_AUTH_DB_URL ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL;

const databaseUrl = rawDbUrl?.trim();
const baseURL = (
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_AUTH_URL ||
  "http://localhost:3000"
).trim();

const secret = (
  process.env.BETTER_AUTH_SECRET ||
  process.env.AUTH_SECRET ||
  "bazardor-temporary-fallback-secret-for-build-only-32chars"
).trim();

const dbName = (
  process.env.MONGODB_DB_NAME ||
  process.env.BETTER_AUTH_DB_NAME
)?.trim();

let client: MongoClient | undefined;
let db: Db | undefined;

if (databaseUrl) {
  if (process.env.NODE_ENV === "development") {
    if (!customGlobal._mongoClient) {
      customGlobal._mongoClient = new MongoClient(databaseUrl);
    }
    client = customGlobal._mongoClient;
  } else {
    client = new MongoClient(databaseUrl);
  }
  db = client.db(dbName || undefined);
} else {
  console.warn(
    "[Better Auth]: No database URL found (BETTER_AUTH_DB_URL or MONGODB_URI). Authentication database features will be inactive until configured."
  );
}

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
if (githubClientId && githubClientSecret) {
  socialProviders.github = {
    clientId: githubClientId,
    clientSecret: githubClientSecret,
  };
}

export const auth = betterAuth({
  baseURL,
  secret,
  ...(db && client
    ? {
        database: mongodbAdapter(db, {
          client,
        }),
      }
    : {}),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
});

export const isDatabaseConfigured = () => Boolean(databaseUrl && db && client);
export { client as mongoClient, db as mongoDb };
