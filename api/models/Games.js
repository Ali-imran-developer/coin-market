const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true},
    rating: { type: Number, default: 0 },
    users: { type: Number, default: 0 },
    status: { type: String, default: "live" },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);