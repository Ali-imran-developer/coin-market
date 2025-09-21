const Games = require("../models/Games");
const { ImageUploadUtil } = require("../utils/cloudinary");

const createGame = async (req, res) => {
  try {
    const { name, imageBase64, rating, users, status, category } = req.body;
    if (!name || !imageBase64 || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, image, and category are required",
      });
    }
    const result = await ImageUploadUtil(imageBase64);
    const newGame = await Games.create({
      name,
      image: result.secure_url,
      rating: rating || 0,
      users: users || 0,
      status: status || "active",
      category,
    });
    res.status(201).json({ 
      success: true, 
      data: newGame,
      message: "Game created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const getGames = async (req, res) => {
  try {
    const games = await Games.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: games 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageBase64, rating, users, status, category } = req.body;
    let updateData = { name, rating, users, status, category };
    if (imageBase64) {
      const result = await ImageUploadUtil(imageBase64);
      updateData.image = result.secure_url;
    }
    const updatedGame = await Games.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedGame) {
      return res.status(404).json({ 
        success: false, 
        message: "Game not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: updatedGame,
      message: "Game updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGame = await Games.findByIdAndDelete(id);
    if (!deletedGame) {
      return res.status(404).json({ 
        success: false, 
        message: "Game not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "Game deleted successfully" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createGame,
  getGames,
  updateGame,
  deleteGame,
};
