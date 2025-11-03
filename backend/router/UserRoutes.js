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
  router.post("/update_profile", authMiddleware, upload.single("pfp"), (req, res) => {
  const userID = req.user.id;
  const { bio, communication_method, username } = req.body;

  let sqlParts = [];
  let sqlParams = [];

  // build the query here so any individual one can be updated
  if (bio) {
    sqlParts.push("Bio = ?");
    sqlParams.push(bio);
  }
  if (communication_method) {
    sqlParts.push("communication_method = ?");
    sqlParams.push(communication_method);
  }
  if (username) {
    sqlParts.push("username = ?");
    sqlParams.push(username);
  }
  const runFinalUpdate = (newImageUrl = null) => {
    // Check if anything is actually being updated
    if (sqlParts.length === 0) {
      if (!newImageUrl) { // No new file and no new text
        return res.status(200).json({ message: "No changes provided." });
      }
      // Only a new image was uploaded, but the SQL query is empty is handled in the req.file block
    }

    sqlParams.push(userID); // Add user_id for the WHERE clause
    const sql = `UPDATE users SET ${sqlParts.join(", ")} WHERE user_id = ?`;

    db.query(sql, sqlParams, (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        let errMsg = "Error updating profile in database.";
        if (newImageUrl) {
          errMsg += ` Orphaned image at: ${newImageUrl}`;
        }
        return res.status(500).json({ message: errMsg });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found." });
      }
      
      // Success
      const response = { message: "Profile updated successfully!" };
      if (newImageUrl) {
        response.imageUrl = newImageUrl; // Send back the new URL
      }
      res.status(200).json(response);
    });
  };

  
  if (req.file) {
    // If new file, get the old image URL to delete it and prevent storing too many images/unsued images
    const getOldUrlSql = "SELECT profile_picture FROM users WHERE user_id = ?";
    db.query(getOldUrlSql, [userID], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ message: "Error fetching user for image update." });
      }

      const oldUrl = results[0].profile_picture;
      let oldPublicId = null;

      // Cloudinary only works with public ID's for deleting assets. I only store the URL. I need to in essence extract the id from the URL. Comes right at the end of the query before the filetype
      if (oldUrl) {
        try {
          // This logic finds the part after ".../upload/v12345/" and removes the file extension
          const urlParts = oldUrl.split('/upload/');
          if (urlParts.length === 2) {
            const versionAndId = urlParts[1].split('/');
            versionAndId.shift(); // Removes the version number (e.g., 'v167888')
            const idWithExtension = versionAndId.join('/');
            oldPublicId = idWithExtension.substring(0, idWithExtension.lastIndexOf('.')); //Gets the part before the ' . '  e.g. getsthisbit.doesntgetthis
          }
        } catch (e) {
          console.error("Could not parse old public_id:", e);
        }
      }

      // Delete from cloudinary and add new url
      (async () => {
        try {
          //Delete if exists
          if (oldPublicId) {
            console.log(`Deleting old image: ${oldPublicId}`);
            await cloudinary.uploader.destroy(oldPublicId);
          }

          //Upload
          const base64image = Buffer.from(req.file.buffer).toString("base64");
          let dataURI = "data:" + req.file.mimetype + ";base64," + base64image;
          
          const result = await cloudinary.uploader.upload(dataURI, {
            asset_folder: "profile_pictures", // This sets the public_id
          });

          sqlParts.push("profile_picture = ?");
          sqlParams.push(result.secure_url);

          // Run the final update query
          runFinalUpdate(result.secure_url);

        } catch (error) {
          console.log("Error during Cloudinary operations:", error);
          res.status(500).json({ message: "An error occurred during the image upload." });
        }
      })();
    });
  } else {
    // If no new file, just run the update for the text fields
    runFinalUpdate();
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
  if (userID === friendID) {
    return res.status(400).json({ message: "You cannot add yourself as a friend silly." });
  }
  const checkSql = `
    SELECT * FROM friend
    WHERE (user_id_one = ? AND user_id_two = ?)
       OR (user_id_one = ? AND user_id_two = ?)
  `;
  db.query(checkSql, [userID, friendID, friendID, userID], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Error checking existing friend request" });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: "Friend request already sent or already friends." });
    }
    const sql = "INSERT INTO `friend` (`status`, `user_id_one`, `user_id_two`) VALUES ('pending', ?, ?)";
    db.query(sql, [userID, friendID], (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error sending friend request" });
      }
      res.status(200).json({ message: "Friend request sent successfully" });
    });
  });
});
  router.delete("/friend/remove/:friend_id", authMiddleware, (req, res) => {
    const userID = req.user.id;
    const friendID = req.params.friend_id;
    const sql = `DELETE FROM friend
    WHERE (user_id_one = ? AND user_id_two = ?)
    OR (user_id_one = ? AND user_id_two = ?);`;
    db.query(sql, [userID, friendID, friendID, userID], (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error removing friend" });
      }
      res.status(200).json({ message: "Friend removed successfully" });
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
  router.get("/friends/:id", authMiddleware, (req, res) => {
    const userID = req.params.id;
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
  router.get("/friends/requests", authMiddleware, (req, res) => {
    const userID = req.user.id;
    //Gets the opposite side of the friendship
    const sql = `SELECT users.user_id, users.profile_picture, users.username, friend.status 
    FROM users LEFT JOIN friend ON users.user_id = friend.user_id_one
    WHERE friend.user_id_two = ? AND friend.status = 'pending'`;
    db.query(sql, [userID], (err, results) => {
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
    const sql = `UPDATE friend SET status = 'accepted' WHERE user_id_one = ? AND user_id_two = ? AND status = 'pending'`;
    db.query(sql, [friendID, userID], (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error accepting friend request" });
      }
      res.status(200).json({ message: "Friend request accepted successfully" });
    });
  });
  router.get("/search/:username", authMiddleware, (req, res) => {
    const searchUsername = req.params.username;
    const userID = req.user.id;

    if (!searchUsername || !userID) {
      return res.status(400).json({ message: "Username is required" });
    }
    const sql = `SELECT * FROM users WHERE username LIKE ? AND user_id != ? LIMIT 10`;
    db.query(sql, ["%" + searchUsername + "%", userID], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Error fetching searched users" });
      }
      res.status(200).json({
        data: results,
        message: "Searched users fetched successfully.",
      });
    });
  });

  return router;
};
