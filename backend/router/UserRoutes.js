const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (db, cloudinary) {
  router.post("/:userID/upload_pfp", upload.single("pfp"), async (req, res) => {
    const userID = req.params.userID;
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    try {
      const base64image = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + base64image;
      const result = await cloudinary.uploader.upload(dataURI, {
        asset_folder: "profile_pictures",
      });
      const imageUrl = result.secure_url;
      const sql = "UPDATE users SET profile_picture = ? WHERE user_id = ?";
      db.query(sql, [imageUrl, userID], (err, result) => {
        if (err) {
          console.error("Database error: ", err);
          return res.status(500).json({ message: "Error uploading, delete this image: " + imageUrl });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
          message: "Profile picture updated successfully!",
          imageUrl: imageUrl,
        });
      });
    } catch (error) {
      console.log("Error during image upload:", error);
      res.status(500).json({ message: "An error occurred during the image upload." });
    }
  });
  router.post("/:userID/update_profile", (req,res) => {
    
  })
    return router;
};
