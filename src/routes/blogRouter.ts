

import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlogStatus } from "../controllers/blog.controller";
import { verifyJwtToken } from "../utility/generateJwtToken";
import { checkAdmin, checkAuthor } from "../middleware/checkRole";

const router = express.Router();

router.post('/blog',verifyJwtToken, checkAuthor, createBlog);
router.get('/blog',verifyJwtToken, checkAuthor, getAllBlogs);
router.get('/blog/:id',verifyJwtToken, checkAuthor, getBlogById);
router.put('/blog/:id/:status',verifyJwtToken, checkAdmin, updateBlogStatus);


export default router;