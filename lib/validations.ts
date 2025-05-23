import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  vintedNickname: z.string().optional(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  price: z.coerce.number().min(1),
  soldPrice: z.coerce.number(),
  isSold: z.boolean().default(false),
  priceBought: z.coerce.number().min(1),
  rating: z.coerce.number().min(1).max(5).optional(),
  totalCopies: z.coerce.number().min(1),
  coverUrl: z.string().optional(),
  coverUrl2: z.string().optional(),
  coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color code"),
  videoUrl: z.string().optional(),
  vintedLink: z.string().optional(),
  summary: z.string().trim().min(10),

})    