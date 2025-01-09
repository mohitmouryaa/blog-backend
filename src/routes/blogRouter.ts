

import express from "express";
import { createBlog } from "../controllers/blog.controller";
import { verifyJwtToken } from "../utility/generateJwtToken";
import { checkAuthor } from "../middleware/checkRole";

const router = express.Router();

router.post('/blog',verifyJwtToken,  createBlog);

export default router;