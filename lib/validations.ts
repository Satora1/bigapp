import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().optional(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title:z.string().trim().min(2).max(100),
  description:z.string().trim().min(10).max(1000),
  author:z.string().trim().min(2).max(100),
  dgenre:z.string().trim().min(2).max(50),
  rating:z.number().min(1).max(5),
  totalCopies:z.coerce.number().min(1),
  coverUrl:z.string().url().nonempty(),
  coverCorol:z.string().trim().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color code"),
  videoUrl:z.string().nonempty(),
  summary:z.string().trim().min(10),

})