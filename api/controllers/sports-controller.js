const Sport = require("../models/Sports");

const createSports = async (req, res) => {
  try {
    const sport = new Sport(req.body);
    const savedSport = await sport.save();
    res.status(201).json({
      message: "Sport created successfully",
      data: savedSport,
      success: true,
    });
  } catch (error) {
    console.log("Error in createSports:", error);
    res.status(500).json({
      message: "Failed to create sport",
      success: false,
    });
  }
};

const getSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    if(!sports){
      return res.status(200).json({
        success: true,
        message: "Not found any sports",
      });
    }
    res.status(200).json({
      message: "Sports retrieved successfully",
      data: sports,
      success: true,
    });
  } catch (error) {
    console.log("Error in getSports:", error);
    res.status(500).json({
      message: "Failed to fetch sports",
      success: false,
    });
  }
};

const updateSports = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSport = await Sport.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSport) {
      return res.status(404).json({
        message: "Sport not found",
        data: [],
        success: false,
      });
    }
    res.status(200).json({
      message: "Sport updated successfully",
      data: updatedSport,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateSports:", error);
    res.status(400).json({
      message: "Failed to update sport",
      success: false,
    });
  }
};

const deleteSports = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSport = await Sport.findByIdAndDelete(id);
    if (!deletedSport) {
      return res.status(404).json({
        message: "Sport not found",
        data: [],
        success: false,
      });
    }
    res.status(200).json({
      message: "Sport deleted successfully",
      data: deletedSport,
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteSports:", error);
    res.status(500).json({
      message: "Failed to delete sport",
      success: false,
    });
  }
};

module.exports = {
  createSports,
  getSports,
  updateSports,
  deleteSports,
};
