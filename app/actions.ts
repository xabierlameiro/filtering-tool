"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

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
    cv: z.object({
      size: z
        .number()
        .min(1, "CV is required")
        .max(MAX_FILE_SIZE, "File is too large."),
      type: z
        .string()
        .refine(
          (type) => ACCEPTED_IMAGE_TYPES.includes(type),
          "Invalid file type.",
        ),
      name: z.string(),
      lastModified: z.number(),
    }),
  })
  .transform((data) => {
    return {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
  });

// CREATE TABLE candidates(
//     id UUID PRIMARY KEY,
//     created_at TIMESTAMP NOT NULL,
//     technology TEXT NOT NULL,
//     name TEXT NOT NULL
// );

// DELETE FROM candidates
// WHERE id = 'b9e3b2e5-3c3f-4a8a-8b9c-1d9a9f1e9c0b';

export async function createNewCandidate(
  prevState: { url?: string },
  formData: FormData,
) {
  const parse = schema.safeParse({
    technology: formData.get("technology"),
    name: formData.get("name"),
    cv: formData.get("cv"),
  });

  const BlobFile = formData.get("cv") as Blob;
  const file = await BlobFile.arrayBuffer();

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      url: ""
    };
  }

  try {
    await sql`INSERT INTO candidates
        (id, created_at, technology, name)
        VALUES (${parse.data.id}, ${parse.data.created_at}, ${parse.data.technology}, ${parse.data.name})`;

    await put(`candidates/${parse.data.id}.pdf`, file, {
      contentType: "application/pdf",
      access: "public",
    }).catch(async () => {
      await sql`DELETE FROM candidates WHERE id = ${parse.data.id}`;
    });

    return { url: `https://example.com/candidates/${parse.data.id}` };
  } catch (error) {
    console.error("Error creating candidate", error);
    return { url: "" };
  }
}
