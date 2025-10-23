const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

//For images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (db, cloudinary) {
  router.post("/upload_pfp", authMiddleware, upload.single("pfp"), async (req, res) => {
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
  router.post("/update_profile", authMiddleware, upload.single("pfp"), async (req, res) => {
    console.log(req.body);
    const userID = req.user.id;
    const { bio, communication_method, username } = req.body;

    if (!req.file || !bio || !communication_method || !username) {
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
  router.get("/profile/:user_id", authMiddleware, (req, res) => {
    const userID = req.params.user_id;
    console.log(userID);

    const sql = "SELECT * from users WHERE users.user_id = ?";
    db.query(sql, [userID], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching user profile" });
      }
      if (results.length === 0) {
        console.log(`Unable to find user with ID ${userID}`);

        return res.status(404).json({ message: `User not found with ID ${userID}` });
      }
      res.status(200).json({
        data: results[0],
        message: "User profile fetched successfully.",
      });
    });
  });
  router.get("/profile", authMiddleware, (req, res) => {
    const userID = req.user.id;

    const sql = "SELECT * from users WHERE users.user_id = ?";
    db.query(sql, [userID], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching user profile" });
      }
      if (results.length === 0) {
        console.log(`Unable to find user with ID ${userID}`);

        return res.status(404).json({ message: `User not found with ID ${userID}` });
      }
      res.status(200).json({
        data: results[0],
        message: "User profile fetched successfully.",
      });
    });
  });
  router.post("/send_friend_request/:friend_id", authMiddleware, (req, res) => {
    const userID = req.user.id;
    const friendID = req.params.friend_id;
    const sql = "INSERT INTO `friend` (`status`, `user_id_one`, `user_id_two`) VALUES ('pending', ?, ?)";
    db.query(sql, [userID, friendID], (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error sending friend request" });
      }
      res.status(200).json({ message: "Friend request sent successfully" });
    });
  });

  router.get("/friends", authMiddleware, (req, res) => {
    const userID = req.user.id;
    //Gets the opposite side of the friendship
    const sql = `SELECT users.user_id, users.profile_picture, users.username, friend.status 
                  FROM users LEFT JOIN friend ON users.user_id = friend.user_id_two
                  WHERE friend.user_id_one = ? AND friend.status = 'accepted'

                  UNION

                  SELECT users.user_id, users.profile_picture, users.username, friend.status 
                  FROM users LEFT JOIN friend ON users.user_id = friend.user_id_one
                  WHERE friend.user_id_two = ? AND friend.status = 'accepted'`;
    db.query(sql, [userID, userID], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching friends list" });
      }
      res.status(200).json({
        data: results,
        message: "Friends list fetched successfully.",
      });
    });
  });
  router.post("/accept_friend_request/:friend_id", authMiddleware, (req, res) => {
    const userID = req.user.id;
    const friendID = req.params.friend_id;
    //user_id one is the sender, and two is the receiver. Only uid_two can accept
    const sql = `UPDATE friend
SET status = 'accepted'
WHERE user_id_one = ?
  AND user_id_two = ?
  AND status = 'pending'`;
    db.query(sql, [friendID, userID], (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error accepting friend request" });
      }
      res.status(200).json({ message: "Friend request accepted successfully" });
    });
  });

  return router;
};
