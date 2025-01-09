

import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blog.controller";
import { verifyJwtToken } from "../utility/generateJwtToken";
import { checkAuthor } from "../middleware/checkRole";

const router = express.Router();

router.post('/blog',verifyJwtToken, checkAuthor, createBlog);
router.get('/blog',verifyJwtToken, checkAuthor, getAllBlogs);
router.get('/blog/:id',verifyJwtToken, checkAuthor, getBlogById);

export default router;