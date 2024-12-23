import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  email: z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
  password: z.string({ required_error: "password is required" }).min(4, "password be at least 4 digits"),
  role: z.enum(["reader", "author", "admin"]),
});

export const logInSchema = z.object({
  email: z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
  password: z.string({ required_error: "password is required" }).min(4, "password be at least 4 digits"),
  provider:z.string().optional(),
  username: z.string().min(3, "username must be at least 3 characters").optional(),
});
