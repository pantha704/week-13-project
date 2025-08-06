import z from "zod";

// ZOD

export const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional(),
});

// type inference
export type SignInSchema = z.infer<typeof signInSchema>;
