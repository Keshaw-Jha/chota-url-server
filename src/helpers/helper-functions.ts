import { eq, sql } from "drizzle-orm";
import { db } from "../db/db.ts";
import { UrlsTable } from "../db/schema.ts";
import { UrlData } from "../models/url-table-data.ts";

export const getByParam = async (
  param: keyof UrlData,
  value: string | number
) => {
  try {
    if (typeof UrlsTable[param].dataType !== typeof value) {
      throw new TypeError(`parameters and its value type mismatch`);
    }

    if (value === undefined || value === null) {
      throw new Error(`Value can not be undefined or null`);
    }

    const result = await db.execute(
      sql<UrlData>`select * from ${UrlsTable} where ${UrlsTable[param]} = ${value} LIMIT 1`
    );
    return Array.isArray(result) && (result.length ? result[0] : null);
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Failed to fetch parameter from URL: ${error.message}`);
  }
};

export const getAll = async (): Promise<UrlData[] | null> => {
  try {
    const result = await db.select().from(UrlsTable);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to getAll Urls : ${error.message}`);
  }
};

export const addNew = async (
  longUrlData: UrlData
): Promise<UrlData[] | null> => {
  try {
    const shortUrl = await db.insert(UrlsTable).values(longUrlData).returning();
    return shortUrl;
  } catch (error: any) {
    throw new Error(`Failed to getAll Urls : ${error.message}`);
  }
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

export const updateUrlHelper = (updatedUrl: UrlData) => {
  try {
    const result = db
      .update(UrlsTable)
      .set(updatedUrl)
      .where(eq(UrlsTable.id, updatedUrl.id))
      .returning();
    return result;
  } catch (error: any) {
    throw new Error(`Failed to getAll Urls : ${error.message}`);
  }
};

// export const updateUrlHelper = async (updatedUrl: UrlData) => {
//   const result = await db.execute(
//     sql`UPDATE ${UrlsTable} SET
//       "originalUrl" = ${updatedUrl.originalUrl},
//       "shortUrl"= ${updatedUrl.shortUrl},
//       "count"= ${updatedUrl.count}
//       WHERE
//       "id" = ${updatedUrl.id}
//       RETURNING*`
//   );
//   return result;
// };
