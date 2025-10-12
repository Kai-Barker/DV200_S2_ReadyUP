const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


//For images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (db, cloudinary) {
  router.post("/upload_pfp", authMiddleware , upload.single("pfp"), async (req, res) => {
    const userID = req.user.id;
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
      console.log("Image uploaded to Cloudinary: ", imageUrl);
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
  router.post("/update_profile", authMiddleware , upload.single("pfp"), async (req, res) => {
    console.log(req.body);
    const userID = req.user.id;
    const {bio, communication_method, username} = req.body;
    
    if (!req.file||!bio||!communication_method||!username) {
      return res.status(400).send("No file uploaded");
    }
    try {
      const base64image = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + base64image;
      const result = await cloudinary.uploader.upload(dataURI, {
        asset_folder: "profile_pictures",
      });
      const imageUrl = result.secure_url;
      console.log("Image uploaded to Cloudinary: ", imageUrl);
      const sql = "UPDATE users SET profile_picture = ?, Bio = ?, communication_method= ?, username = ? WHERE user_id = ?";
      db.query(sql, [imageUrl, bio, communication_method, username, userID], (err, result) => {
        if (err) {
          console.error("Database error: ", err);
          return res.status(500).json({ message: "Error uploading, delete this image: " + imageUrl });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
          message: "Profile updated successfully!",
          imageUrl: imageUrl,
        });
      });
    } catch (error) {
      console.log("Error during image upload:", error);
      res.status(500).json({ message: "An error occurred during the image upload." });
    }
  });
  router.get("/profile/:user_id", authMiddleware, (req,res) => {
    
    const userID = req.params;
    
    const sql = "SELECT * from users WHERE users.user_id = ?";
    db.query(sql, [userID], (err, results) => {
      if (err){
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching user profile" });
      }
      if (results.length === 0) {
        console.log(`Unable to find user with ID ${userID}`);

        return res.status(404).json({ message: `User not found with ID ${userID}` });
      }
      res.status(200).json({
        data: results[0],
        message: "User profile fetched successfully."
      });
    })
  });
  router.get("/profile", authMiddleware, (req,res) => {
    
    const userID = req.user.id;
    
    const sql = "SELECT * from users WHERE users.user_id = ?";
    db.query(sql, [userID], (err, results) => {
      if (err){
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching user profile" });
      }
      if (results.length === 0) {
        console.log(`Unable to find user with ID ${userID}`);

        return res.status(404).json({ message: `User not found with ID ${userID}` });
      }
      res.status(200).json({
        data: results[0],
        message: "User profile fetched successfully."
      });
    })
  });
  return router;
};
