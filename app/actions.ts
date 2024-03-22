"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";
import { UUID } from "crypto";
import { auth } from "auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["application/pdf"];

const schema = z
  .object({
    technology: z.enum(["react", "nextjs", "svelte", "python"]),
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

export async function createNewCandidate(
  prevState: { url?: string },
  formData: FormData,
) {
  const session = await auth();

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
    // We need insert the owner
    await sql`INSERT INTO candidates
        (id, name, owner_email, technology, created_at, cv_url)
        VALUES (${parse.data.id}, ${parse.data.name}, ${session?.user?.email}, ${parse.data.technology}, ${parse.data.created_at}, ${parse.data.cv_url})`;

    const BlobFile = formData.get("cv_binary") as Blob;
    const file = await BlobFile.arrayBuffer();

    await put(`candidates/${parse.data.id}.pdf`, file, {
      contentType: "application/pdf",
      access: "public",
      addRandomSuffix: false,
    }).catch(async () => {
      await sql`DELETE FROM candidates WHERE id = ${parse.data.id}`;
    });

    return {
      url: `${process.env.DOMAIN}/test/${parse.data.id}`,
    };
  } catch (error) {
    console.error("Error creating candidate", error);
    return { url: "" };
  }
}
