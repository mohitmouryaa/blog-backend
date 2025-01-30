import {z} from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(4, "Title should be at least 4 characters"),
  content: z.string(),
  thumbnail: z.object({
    buffer: z.instanceof(Buffer), // Make sure it's a Buffer
    mimetype: z.string().refine((mimetype) => mimetype.startsWith("image/"), {
      message: "Invalid file type. Only images are allowed.",
    }),
    size: z.number().max(5 * 1024 * 1024, "File size should not exceed 5MB"), // Max size 5MB
  }),
}).strict()

export const blogStatusSchema = z.enum(["approved", "rejected"]);