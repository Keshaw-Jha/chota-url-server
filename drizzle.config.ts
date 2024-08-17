import { defineConfig } from "drizzle-kit";

const connection_string = (process.env.DB_CONNECTION_URL as string).replace(
  "[password]",
  process.env.DB_PASSWORD as string
);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: connection_string,
  },
  dialect: "postgresql",
  verbose: true,
  strict: true,
});
