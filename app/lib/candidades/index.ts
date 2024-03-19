import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

type Candidate = {
  id: string;
  name: string;
  owner_email: string;
  technology: string;
  created_at: Date;
  cv_url: string;
};

export async function fetchCandidates(owner_email: string) {
  noStore();
  try {
    const result =
      await sql<Candidate>`SELECT * FROM candidates WHERE owner_email = ${owner_email}`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching candidates", error);
    throw new Error("Error fetching candidates");
  }
}
