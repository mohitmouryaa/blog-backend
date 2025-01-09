import {z} from "zod";

export const createBlogSchema = z.object({
    title:z.string().min(4,"title should be min 4 characters"),
    content:z.string()
})

export const blogStatusSchema = z.enum(["pending", "approved", "rejected"]);