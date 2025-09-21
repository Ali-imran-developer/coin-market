const express = require("express");
const { createGame, getGames, updateGame, deleteGame } = require("../controllers/games-controller");
const router = express.Router();

router.post("/create", createGame);
router.get("/get", getGames);
router.put("/update/:id", updateGame);
router.delete("/delete/:id", deleteGame);

module.exports = router;