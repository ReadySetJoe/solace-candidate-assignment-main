import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  if (!db) {
    return new Response("Database not initialized", { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  if (q === "") {
    const data = await db.select().from(advocates).limit(limit).offset(offset);
    return Response.json({ data });
  }

  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${q}%`),
        ilike(advocates.lastName, `%${q}%`),
        ilike(advocates.city, `%${q}%`),
        ilike(advocates.degree, `%${q}%`),
        sql`advocates.phone_number::text ILIKE ${`%${q}%`}`,
        sql`advocates.specialties::text ILIKE ${`%${q}%`}`
      )
    )
    .limit(limit)
    .offset(offset);

  return Response.json({ data });
}
