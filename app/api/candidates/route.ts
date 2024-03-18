import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
// import { list, head } from "@vercel/blob";

export const revalidate = 300; //caches for 300 seconds, 5 minutes

export async function GET() {
  let data = await sql`
      SELECT * FROM candidates
      ORDER BY created_at DESC
      LIMIT 10;
    `;
  //const { blobs } = await list();
  // const detail = await head(
  //   `url`
  // );
  return NextResponse.json({ rows: data.rows }, { status: 200 });
}
