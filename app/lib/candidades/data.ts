import { sql } from "@vercel/postgres";

export async function fetchCandidates() {
  try {
    let data = await sql`
            SELECT * FROM candidates
            ORDER BY created_at DESC
            LIMIT 10;
        `;
    return data.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}
