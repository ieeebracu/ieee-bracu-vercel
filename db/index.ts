import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

function getD1Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId =
    process.env.CLOUDFLARE_D1_DATABASE_ID ||
    "ee26fed4-2154-427c-b890-74d09c73f3d1";
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  return { accountId, databaseId, apiToken };
}

export const db = drizzle(
  async (sql, params, method) => {
    const { accountId, databaseId, apiToken } = getD1Config();

    if (!accountId || !apiToken) {
      console.warn(
        "Notice: Missing Cloudflare D1 credentials (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN). Returning empty results."
      );
      if (method === "run") return { rows: [] };
      if (method === "get") return { rows: undefined };
      return { rows: [] };
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sql,
        params,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Cloudflare D1 Query failed (${response.status} ${response.statusText}): ${errorText}`
      );
    }

    const data = (await response.json()) as any;

    if (!data.success) {
      const messages =
        data.errors?.map((e: any) => e.message).join(", ") || "Unknown D1 error";
      throw new Error(`Cloudflare D1 Query error: ${messages}`);
    }

    const statementResult = data.result?.[0];
    const rawResults = statementResult?.results ?? [];

    if (method === "run") {
      return { rows: [] };
    }

    if (method === "get") {
      if (rawResults.length === 0) {
        return { rows: undefined };
      }
      return { rows: Object.values(rawResults[0]) };
    }

    const rows = rawResults.map((row: any) => Object.values(row));
    return { rows };
  },
  async (batch) => {
    const { accountId, databaseId, apiToken } = getD1Config();

    if (!accountId || !apiToken) {
      console.warn(
        "Notice: Missing Cloudflare D1 credentials. Returning empty batch results."
      );
      return batch.map((item) => {
        if (item.method === "run") return { rows: [] };
        if (item.method === "get") return { rows: undefined };
        return { rows: [] };
      });
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        batch: batch.map((item) => ({
          sql: item.sql,
          params: item.params,
        })),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Cloudflare D1 Batch Query failed (${response.status} ${response.statusText}): ${errorText}`
      );
    }

    const data = (await response.json()) as any;
    if (!data.success) {
      const messages =
        data.errors?.map((e: any) => e.message).join(", ") || "Unknown D1 batch error";
      throw new Error(`Cloudflare D1 Batch error: ${messages}`);
    }

    const results = data.result ?? [];

    return batch.map((item, index) => {
      const statementResult = results[index];
      const rawResults = statementResult?.results ?? [];

      if (item.method === "run") {
        return { rows: [] };
      }

      if (item.method === "get") {
        if (rawResults.length === 0) {
          return { rows: undefined };
        }
        return { rows: Object.values(rawResults[0]) };
      }

      return { rows: rawResults.map((row: any) => Object.values(row)) };
    });
  },
  { schema }
);