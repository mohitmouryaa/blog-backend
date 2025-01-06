import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  email: z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
  password: z
    .string({ required_error: "password is required" })
    .min(8, "password be at least 8 digits")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character."
    ),
});


export const logInWithRoleSchema = z.object({
  email: z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
  role: z.enum(["reader", "author", "admin"], { required_error: "Role is required" }),
  password: z.string({ required_error: "Password is required" }).min(4, "Password must be at least 8 characters"),
  provider: z.string().optional(),
  username: z.string().min(4, "username must be at least 4 characters"),
});

export const logInWithPasswordSchema = z.object({
  email: z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
  role: z.enum(["reader", "author", "admin"], { required_error: "Role is required" }),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});
