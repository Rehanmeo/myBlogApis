import express from "express";
import { addBlog, blogGetById, deleteBlog, getAllBlogs, getByUserId, updateBlog } from "../controllers/blog-controller.js";

const routersBlogs = express.Router();

routersBlogs.get("/", getAllBlogs);
routersBlogs.post("/add", addBlog);
routersBlogs.put("/update/:id", updateBlog);
routersBlogs.get("/:id", blogGetById);
routersBlogs.delete("/:id", deleteBlog);
routersBlogs.get("/user/:id", getByUserId);

export default routersBlogs;
