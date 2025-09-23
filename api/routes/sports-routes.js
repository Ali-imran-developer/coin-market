const express = require("express");
const router = express.Router();
const { createSports, getSports, updateSports, deleteSports } = require("../controllers/sports-controller");

router.post("/create", createSports);
router.get("/get", getSports);
router.put("/update/:id", updateSports);
router.delete("/delete/:id", deleteSports);

module.exports = router;