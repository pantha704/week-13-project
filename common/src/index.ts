import { z } from "zod";

// ZOD

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional(),
});

export const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z
    .number()
    .int("ID must be an integer")
    .positive("ID must be a positive integer"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
