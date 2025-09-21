const Banners = require("../models/Banners");
const { ImageUploadUtil } = require("../utils/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }
    const uploadPromises = req.files.map((file) =>
      ImageUploadUtil(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      )
    );
    const results = await Promise.all(uploadPromises);
    const images = results.map((img) => img.secure_url);
    const newBlog = await Banners.create({ images });
    res.json({
      success: true,
      data: newBlog,
      message: "Banners uploaded successfully",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

const getBanners = async (req, res) => {
  try {
    const bannerImages = await Banners.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bannerImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

module.exports = {
  uploadImageController,
  getBanners,
};
