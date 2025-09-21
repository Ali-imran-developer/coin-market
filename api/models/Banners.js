const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banners", BannerSchema);