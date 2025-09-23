const express = require("express");
const { createWelcome, getWelcome, updateWelcome, deleteWelcome } = require("../controllers/welcome-controller");
const router = express.Router();

router.get("/get", getWelcome);
router.post("/create", createWelcome);
router.put("/update", updateWelcome);
router.delete("/delete", deleteWelcome);

module.exports = router;
