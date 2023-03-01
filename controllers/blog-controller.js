import { json } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res , next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    }catch(err){
        return console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({message: "No Data Fount."});
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
    const {title, description, image, user } = req.body;

    let exitingUser;
    try {
        exitingUser = await User.findById(user);
    }catch(err) {
        return console.log(err);
    }

    if (!exitingUser) {
        return res.status(400).json({message: "Unable to find user by this ID"});
    }

    const blog = new Blog ({
        title,
        description,
        image,
        user,
    });

    try {
    //    await blog.save()
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    exitingUser.blogs.push(blog);
    await exitingUser.save({session});
    await session.commitTransaction();
    }catch(err) {
         console.log(err);
         return res.status(500).json({message: err});
    }
    return res.status(200).json({blog});
};

export const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }catch(err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({message: "unable to update Blog"});
    }
    return res.status(200).json({blog});
};

export const blogGetById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    }catch(err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }

    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to delete"});
    }

    return res.status(200).json({ message: "Blog Deleted"});
};


export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;

    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err) {
        return console.log(err);
    }

    if (!userBlogs) {
        return res.status(404).json({message: "Blog not found"})
    }

    return res.status(200).json({blogs: userBlogs});
};
