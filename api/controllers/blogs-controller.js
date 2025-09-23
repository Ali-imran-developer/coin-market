const Blogs = require("../models/Blogs");
const { ImageUploadUtil } = require("../utils/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }
    const uploadPromises = req.files.map((file) => ImageUploadUtil(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`));
    const results = await Promise.all(uploadPromises);
    const images = results.map((img) => img.secure_url);
    res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

const createBlogs = async (req, res) => {
  try {
    const { heading, description, images, detail, tags } = req.body;
    if (!heading || !description || !images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "heading, description, and image (non-empty array) are required",
      });
    }
    const newBlog = new Blogs({
      heading,
      description,
      images,
      detail: detail || [],
      tags: tags || [],
    });
    const savedBlog = await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    let blog = await Blogs.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getBlogDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    console.log(blog)
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "id is required" });
    }

    const { heading, description, images, detail, tags } = req.body || {};

    const existing = await Blogs.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    existing.heading = heading;
    existing.description = description;
    existing.images = images;
    existing.detail = detail || [];
    existing.tags = tags || [];

    const updated = await existing.save();
    return res.status(200).json({ success: true, message: "Blog updated successfully", data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "id is required" });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  uploadImageController,
  getBlogDetail,
  createBlogs,
  getBlogs,
  updateBlog,
  deleteBlog,
};
