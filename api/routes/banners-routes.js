const express = require("express");
const { getBanners, uploadImageController } = require("../controllers/banners-controller");
const router = express.Router();
const { upload } = require("../utils/cloudinary");

router.post("/upload-image", upload.array("banners_file"), uploadImageController);
router.get("/get", getBanners);

module.exports = router;