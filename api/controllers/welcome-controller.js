const Welcome = require("../models/Welcome");

const createWelcome = async (req, res) => {
  try {
    const existingWelcome = await Welcome.findOne();
    if (existingWelcome) {
      return res.status(400).json({
        success: false,
        message: "Welcome data already exists. Use update endpoint to modify it.",
      });
    }
    const { title, description, cards } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    const newWelcome = new Welcome({
      title,
      description,
      cards: cards || [],
    });
    const savedWelcome = await newWelcome.save();
    res.status(201).json({
      success: true,
      message: "Welcome data created successfully",
      data: savedWelcome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating welcome data",
      error: error.message,
    });
  }
};

const getWelcome = async (req, res) => {
  try {
    const welcomeData = await Welcome.findOne();
    if (!welcomeData) {
      return res.status(404).json({
        success: false,
        message: "Welcome data not found",
      });
    }
    res.status(200).json({
      success: true,
      data: welcomeData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateWelcome = async (req, res) => {
  try {
    const { title, description, cards } = req.body;
    let welcomeData = await Welcome.findOne();
    if (!welcomeData) {
      return res.status(404).json({
        success: false,
        message: "Welcome data not found. Create it first.",
      });
    }
    if (title !== undefined) welcomeData.title = title;
    if (description !== undefined) welcomeData.description = description;
    if (cards !== undefined) welcomeData.cards = cards;
    const updatedWelcome = await welcomeData.save();
    res.status(200).json({
      success: true,
      message: "Welcome data updated successfully",
      data: updatedWelcome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating welcome data",
      error: error.message,
    });
  }
};

const deleteWelcome = async (req, res) => {
  try {
    const welcomeData = await Welcome.findOne();
    if (!welcomeData) {
      return res.status(404).json({
        success: false,
        message: "Welcome data not found",
      });
    }
    await welcomeData.deleteOne();
    res.status(200).json({
      success: true,
      message: "Welcome data deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createWelcome,
  getWelcome,
  updateWelcome,
  deleteWelcome,
};
