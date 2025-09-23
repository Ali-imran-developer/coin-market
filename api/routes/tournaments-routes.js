const express = require("express");
const router = express.Router();
const { createTournaments, getTournaments, updateTournaments, deleteTournaments } = require("../controllers/tournament-controller");

router.post("/create", createTournaments);
router.get("/get", getTournaments);
router.put("/update/:id", updateTournaments);
router.delete("/delete/:id", deleteTournaments);

module.exports = router;