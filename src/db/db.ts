import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connection_string = (process.env.DB_CONNECTION_URL as string).replace(
  "[password]",
  process.env.DB_PASSWORD as string
);

const client = postgres(connection_string, {
  prepare: false,
});

export const db = drizzle(client);
