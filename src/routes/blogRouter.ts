import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlogStatus } from "../controllers/blog.controller";
import { verifyJwtToken } from "../utility/generateJwtToken";
import { authorizeRole } from "../middleware/checkRole";

const router = express.Router();

router.post("/blog", verifyJwtToken, authorizeRole("author"), createBlog);
router.get("/blog", verifyJwtToken, authorizeRole("author"), getAllBlogs);
router.get("/blog/:id", verifyJwtToken, authorizeRole("author"), getBlogById);
router.put("/blog/:id/:status", verifyJwtToken, authorizeRole("admin"), updateBlogStatus);

export default router;
