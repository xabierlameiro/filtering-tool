"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";
import { UUID } from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["application/pdf"];

const schema = z
  .object({
    technology: z.enum(["react", "nextjs", "typescript", "python"]),
    name: z
      .string()
      .refine((name) => name?.length > 0, "Name is required.")
      .refine(
        (name) => name?.length >= 3,
        "Name must be at least 3 characters.",
      )
      .refine(
        (name) => name?.length <= 50,
        "Name must be at most 50 characters.",
      )
      .refine(
        (name) => /^[a-zA-Z\s]*$/.test(name),
        "Name must contain only letters.",
      ),
    cv_binary: z.object({
      size: z
        .number()
        .min(1, "CV is required")
        .max(MAX_FILE_SIZE, "File is too large."),
      type: z
        .string()
        .refine((type) => ACCEPTED_TYPES.includes(type), "Invalid file type."),
      name: z.string(),
      lastModified: z.number(),
    }),
  })
  .transform((data) => {
    const candidateId = crypto.randomUUID();
    return {
      ...data,
      id: candidateId as UUID,
      created_at: new Date().toISOString(),
      cv_url: `https://v2bjal9wjovp9ow9.public.blob.vercel-storage.com/candidates/${candidateId}.pdf`,
    };
  });

export type Candidate = z.infer<typeof schema>;

// CREATE TABLE candidates(
//     id UUID PRIMARY KEY,
//     created_at TIMESTAMP NOT NULL,
//     technology TEXT NOT NULL,
//     name TEXT NOT NULL,
//     cv_url TEXT NOT NULL
// );

// DROP TABLE candidates;

// DELETE FROM candidates
// WHERE id = 'b9e3b2e5-3c3f-4a8a-8b9c-1d9a9f1e9c0b';

export async function createNewCandidate(
  prevState: { url?: string },
  formData: FormData,
) {
  const parse = schema.safeParse({
    technology: formData.get("technology"),
    name: formData.get("name"),
    cv_binary: formData.get("cv_binary"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      url: "",
    };
  }

  try {
    await sql`INSERT INTO candidates
        (id, created_at, technology, name, cv_url)
        VALUES (${parse.data.id}, ${parse.data.created_at}, ${parse.data.technology}, ${parse.data.name}, ${parse.data.cv_url})`;

    const BlobFile = formData.get("cv_binary") as Blob;
    const file = await BlobFile.arrayBuffer();

    await put(`candidates/${parse.data.id}.pdf`, file, {
      contentType: "application/pdf",
      access: "public",
      addRandomSuffix: false,
    }).catch(async () => {
      await sql`DELETE FROM candidates WHERE id = ${parse.data.id}`;
    });

    return { url: `https://example.com/candidates/${parse.data.id}` };
  } catch (error) {
    console.error("Error creating candidate", error);
    return { url: "" };
  }
}
