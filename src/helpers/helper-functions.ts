import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { UrlsTable } from "../db/schema.ts";
import { UrlData } from "../models/url-table-data.ts";

export const getByParam = async (
  param: keyof UrlData,
  original: string | number
) => {
  if (typeof param !== typeof original)
    return new Error("input and parameter type mismatch");
  if (!original) return;
  const result = await db
    .select()
    .from(UrlsTable)
    .where(eq(UrlsTable[param], original))
    .limit(1);
  return result ? true : false;
};

export const getAll = async () => {
  const result = await db.select().from(UrlsTable);
  return result;
};

export const addNew = async (longUrlData: UrlData) => {
  const shortUrl = await db.insert(UrlsTable).values(longUrlData).returning();
  return shortUrl;
};

export const generateRandomString = (length: number) => {
  const charset =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};
