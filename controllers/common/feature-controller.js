const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Log the ID to make sure it's coming through correctly
    console.log(`Deleting image with ID: ${id}`);

    const featureImage = await Feature.findById(id);

    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    await featureImage.remove();

    // Return the deleted image's ID and success response
    res.status(200).json({
      success: true,
      data: { id: featureImage._id }, // Return the image ID
    });
  } catch (error) {
    console.error("Error deleting feature image:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the image",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
