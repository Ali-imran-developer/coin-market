const express = require("express");
const { createBlogs, getBlogs, getBlogDetail, uploadImageController, updateBlog, deleteBlog } = require("../controllers/blogs-controller");
const router = express.Router();
const { upload } = require("../utils/cloudinary");

router.post("/upload-image", upload.array("blogs_file"), uploadImageController);
router.post("/create", createBlogs);
router.get("/get", getBlogs);
router.get("/get/:id", getBlogDetail); 
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;