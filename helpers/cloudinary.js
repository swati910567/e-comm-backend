const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
// console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET);

const storage = multer.memoryStorage();

async function imageUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "e-commerce-app" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer); // Pass the buffer to the stream
  });
}

async function deleteImageFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; // Return the result of deletion
  } catch (error) {
    console.error("Error deleting from Cloudinary", error);
    throw error;
  }
}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil, deleteImageFromCloudinary };
