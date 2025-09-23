const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  subTitle: { type: String, required: true },
  subDescription: { type: String, required: true },
});

const WelcomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cards: [CardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Welcome", WelcomeSchema);
