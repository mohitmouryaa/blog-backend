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

export const getAllBlogs = asyncHandler(async(req:Request,res:Response,next:NextFunction)=> {
  const status: string | undefined  = req.query.status as string | undefined;

  if(status) {
    const blogsByStatus = await getAllBlogsByStatus(status);
    if(blogsByStatus.length === 0) {
      res.status(400).json({message:'No blog available by this selected status', status:true, data: null});
      return;
    }
    res.status(200).json({message:'All blogs available by this selected status',  status:true, data: {blogs: blogsByStatus}});
    return;
  }
  const blogs = await getBlogs();
  res.status(200).json({message:'Blogs fetched successfully',  status:true, data: {blogs}});
  return;
})

export const getBlogById = asyncHandler(async(req:Request,res:Response,next:NextFunction)=> {
  const id = req.params.id;
  if(!id) {
    res.status(400).json({message:'Id not provided', status:false, data: null});
    return;
  }

  const blog = await getBlogByid(id);
  if(!blog) {
    res.status(400).json({message:'No blog found by this id', status:false, data: null});
    return;
  }

  res.status(200).json({message:'Blog found successfully', status:true, data: {
    blog
  }});
  return;
})

