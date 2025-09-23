const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    game: { type: String, required: true },
    prizePool: { type: String, required: true },
    buyIn: { type: String, required: true },
    players: { type: Number, default: 0 },
    maxPlayers: { type: Number, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);