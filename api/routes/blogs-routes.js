const express = require("express");
const { createBlogs, getBlogs, getBlogDetail, uploadImageController } = require("../controllers/blogs-controller");
const router = express.Router();
const { upload } = require("../utils/cloudinary");

router.post("/upload-image", upload.array("blogs_file"), uploadImageController);
router.post("/create", createBlogs);
router.get("/get", getBlogs);
router.get("/get/:id", getBlogDetail); 

module.exports = router;