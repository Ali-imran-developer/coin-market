const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema(
  {
    sport: { type: String, required: true },
    league: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeOdds: { type: Number, required: true },
    drawOdds: { type: Number, required: true },
    awayOdds: { type: Number, required: true },
    status: { type: String, required: true },
    betCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sport", sportSchema);