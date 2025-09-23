const Tournament = require("../models/Tournaments");
const { ImageUploadUtil } = require("../utils/cloudinary");

const createTournaments = async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    let imageUrl = "";
    if (image) {
      const result = await ImageUploadUtil(image);
      imageUrl = result.secure_url;
    }
    const tournament = new Tournament({
      ...rest,
      image: imageUrl,
    });
    const savedTournament = await tournament.save();
    res.status(201).json({
      message: "Tournament created successfully",
      data: savedTournament,
      success: true,
    });
  } catch (error) {
    console.log("Error in createTournaments:", error);
    res.status(500).json({
      message: "Failed to create tournament",
      success: false,
    });
  }
};

const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    if (!tournaments) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No Tournaments Found",
      });
    }
    res.status(200).json({
      message: "Tournaments retrieved successfully",
      data: tournaments,
      success: true,
    });
  } catch (error) {
    console.log("Error in getTournaments:", error);
    res.status(500).json({
      message: "Failed to fetch tournaments",
      success: false,
    });
  }
};

const updateTournaments = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, ...rest } = req.body;
    let updateData = { ...rest };
    if (image) {
      if (image.startsWith("http://") || image.startsWith("https://")) {
        updateData.image = image;
      } else {
        const result = await ImageUploadUtil(image);
        updateData.image = result.secure_url;
      }
    }
    const updatedTournament = await Tournament.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedTournament) {
      return res.status(404).json({
        message: "Tournament not found",
        data: [],
        success: false,
      });
    }
    res.status(200).json({
      message: "Tournament updated successfully",
      data: updatedTournament,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateTournaments:", error);
    res.status(500).json({
      message: "Failed to update tournament",
      success: false,
    });
  }
};

const deleteTournaments = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTournament = await Tournament.findByIdAndDelete(id);
    if (!deletedTournament) {
      return res.status(404).json({
        message: "Tournament not found",
        data: [],
        success: false,
      });
    }
    res.status(200).json({
      message: "Tournament deleted successfully",
      data: deletedTournament,
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteTournaments:", error);
    res.status(500).json({
      message: "Failed to delete tournament",
      success: false,
    });
  }
};

module.exports = {
  createTournaments,
  getTournaments,
  updateTournaments,
  deleteTournaments,
};
