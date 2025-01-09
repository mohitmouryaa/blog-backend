import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utility/asyncHandler";
import { z } from "zod";
import { createNewBlog, getAllBlogsByStatus, getBlogByid, getBlogs } from "../models/Blog";
import mongoose from "mongoose";
import { createBlogSchema } from "../schemas/blogSchema";

export const createBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = await createBlogSchema.safeParse(req.body);
  if (!validatedData.success) {
    const errorMessages = validatedData.error.errors.map((err) => err.message);
    res.status(400).json({ message: "User is not available", success: false, error: errorMessages });
    return;
  }
  const { title, content } = validatedData.data;
  const user = req?.user;

  if (!user) {
    res.status(400).json({ message: "User is not available", success: false });
    return;
  }

  if (user.role !== "author") {
    res.status(400).json({ message: "Only author can create a blog post", success: false });
    return;
  }

  const blogData = {
    title,
    content,
    authorId: user.id,
    status: "pending",
  };
  
    const blog = await createNewBlog(blogData);

    if(!blog) {
      res.status(400).json({ message: "Error in creating new Blog", success: false });
      return;
    }

    res.status(201).json({ message: "Blog created successfully", success: true });
    return;
});
