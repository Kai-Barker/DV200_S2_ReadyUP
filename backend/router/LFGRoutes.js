const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (db, cloudinary) {
  router.get("/", (req, res) => {
    const sql =
      "SELECT category.*, COUNT(posts.post_id) AS num_posts  FROM category LEFT JOIN posts ON category.category_id=posts.category_id GROUP BY category.title";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching categories: ", err);
        return res.status(500).json({ message: "Error fetching categories" });
      }
      return res.status(200).json(results);
    });
  });
  router.get("/top_posts", (req, res) => {
    const sql =
      "SELECT category.*, COUNT(posts.post_id) AS num_posts  FROM category LEFT JOIN posts ON category.category_id=posts.category_id GROUP BY category.title ORDER BY num_posts DESC LIMIT 4";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching categories: ", err);
        return res.status(500).json({ message: "Error fetching categories" });
      }
      return res.status(200).json(results);
    });
  });
  router.get("/:title/tags", (req, res) => {
    const title = req.params.title;
    const sql = "SELECT tag_name FROM `tags` WHERE category_id = (SELECT category_id FROM category WHERE title = ? LIMIT 1)";
    db.query(sql, [title], (err, results) => {
      if (err) {
        console.error("Error fetching tags for category: ", err);
        return res.status(500).json({ message: "Error fetching tags for category" });
      }
      return res.status(200).json(results);
    })
  })
  router.get("/:title/posts", (req, res) => {
    const title = req.params.title;
    const sql =
      "SELECT posts.*, users.profile_picture, users.user_id, GROUP_CONCAT(tags.tag_name SEPARATOR ',') AS tags FROM posts LEFT JOIN category ON category.category_id = posts.category_id LEFT JOIN users ON posts.user_id = users.user_id LEFT JOIN post_tags ON post_tags.post_id = posts.post_id LEFT JOIN tags ON tags.tag_id = post_tags.tag_id WHERE category.title = ? AND posts.num_joined != posts.max_players GROUP BY posts.post_id";
    db.query(sql, [title], (err, results) => {
      if (err) {
        console.error("Error fetching posts for category: ", err);
        return res.status(500).json({ message: "Error fetching posts for category" });
      }
      return res.status(200).json(results);
    });
  });
  router.get("/:postid/joined-users", (req,res) => {
    console.log(req.params);
    
    const postID = req.params.postid;
    if (!postID) {
      return res.status(400).json({message: "Invalid post id"});
    }
    const sql = "SELECT users.username, users.user_id, users.profile_picture FROM join_post LEFT JOIN users ON users.user_id = join_post.user_id WHERE post_id LIKE ?";
    db.query(sql, [postID], (err,results) =>{
      if (err) {
        console.error("Error fetching post attendees");
        return res.status(500).json({message: "Error fetching post attendees"});
      }
      return res.status(200).json(results);
    })
  })
  router.post("/create_category", authMiddleware, upload.single("category_picture"), async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const { title, description } = req.body;
    if (!req.file || !title || !description) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    try {
      const base64image = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + base64image;
      const result = await cloudinary.uploader.upload(dataURI, {
        asset_folder: "category_pictures",
      });
      const imageUrl = result.secure_url;
      console.log("Image uploaded to Cloudinary: ", imageUrl);
      const sql = "INSERT INTO `category` ( `title`, `description`, `category_picture`) VALUES ( ?, ?, ?)";
      db.query(sql, [title, description, imageUrl], (err, result) => {
        if (err) {
          console.error("Database error: ", err);
          return res.status(500).json({ message: "Error creating category, delete this image: " + imageUrl });
        }
        res.status(200).json({
          message: "Category created successfully!",
          category: {
            title: title,
            description: description,
            category_picture: imageUrl,
          },
        });
      });
    } catch (error) {
      console.error("Error during image upload:", error);
      return res.status(500).json({ message: "An error occurred during the image upload." });
    }
  });
  router.post("/post", authMiddleware, async (req, res) => {
    //For data integrity im gonna use transactions for an all or nothing upload with tags
    console.log("attempting to post");
    console.log(req.user.role);

    if (req.user.role != "user" && req.user.role != "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const userID = req.user.id;
    const { title, description, startDate, numPlayers, categoryName, tags = [] } = req.body;
    if (!title || !description || !startDate || !numPlayers || !categoryName) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const sql =
      "INSERT INTO posts (user_id, category_id, title, description, start_time,max_players) VALUES (?, (SELECT category_id FROM category WHERE title = ? LIMIT 1), ?, ?, ?, ?);";
    db.query(sql, [userID, categoryName, title, description, startDate, numPlayers], (err, result) => {
      if (err) {
        console.error("Database error", err);
        return res.status(500).json({ message: "Error creating post" });
      }
      if (tags.length === 0) {
        return res.status(201).json({ message: "Post created successfully", postId: postId });
      }
      //IF TAGS__________________________________________________________
      function CreatePostTag(post_id, tag_id) {
        const postTagSql = "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)";
        db.query(postTagSql, [post_id, tag_id], (err, postTagResult) => {
          if (err) {
            console.error(`Error linking tag_id ${tag_id} to post_id ${post_id}:`, err);
          }
          tagsProcessed++;
          if (tagsProcessed === tags.length) {
            return res.status(201).json({ message: "Post created and tags linked successfully", postId: post_id });
          }
        });
      }
      const postId = result.insertId;
      let tagsProcessed = 0;
      tags.forEach((tagName) => {
        const tagCheckSql = "SELECT tag_id FROM tags WHERE tag_name = ? AND category_id = (SELECT category_id FROM category WHERE title = ? LIMIT 1)";
        db.query(tagCheckSql, [tagName, categoryName], (err, checkResult) => {
          if (err) {
            console.error("Error finding tag:", err);
            tagsProcessed++;
            if (tagsProcessed === tags.length) {
              return res.status(201).json({ message: "Post created, but some tags failed to link.", postId: postId });
            }
            return;
          }
          if (checkResult.length > 0) {
            //LINK TAGS AND POSTS ___________________________________________________________________________________________________________________________________
            const tagId = checkResult[0].tag_id;
            CreatePostTag(postId, tagId);
          } else {
            //CREATE NEW TAG THEN LINK TAG TO POST__________________________________________________________________________________________________________________
            const createNewTagSql = "INSERT INTO tags (tag_name, category_id) VALUES (? , (SELECT category_id FROM category WHERE title = ? LIMIT 1))";
            db.query(createNewTagSql, [tagName, categoryName], (err, createResult) => {
              if (err) {
                console.error("Error creating tag:", err);
                tagsProcessed++;
                if (tagsProcessed === tags.length) {
                  return res.status(201).json({ message: "Post created, but some tags failed to link.", postId: postId });
                }
                return;
              }
              const newTagId = createResult.insertId;
              CreatePostTag(postId, newTagId);
            });
          }
        });
      });

      // return res.status(200).json({ message: "post created successfully", post: {} });
    });
  });

  router.post("/posts/join", authMiddleware, async (req, res) => {
    if (req.user.role != "user" && req.user.role != "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const userID = req.user.id;
    const postID = req.body.postID;

    const checkSQL =
      "SELECT num_joined, max_players, (SELECT COUNT(*) FROM join_post WHERE post_id = ? AND user_id = ?) AS already_joined FROM posts WHERE post_id = ?";
    db.query(checkSQL, [postID, userID, postID], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: "Error finding post" });
      }
      const post = result[0];
      if (post.already_joined > 0) {
        return res.status(409).json({ message: "Error, you have already joined this post" });
      }
      if (post.num_joined >= post.max_players) {
        return res.status(409).json({ message: "Error, post has reached max capacity" });
      }
      const sql = "INSERT INTO join_post (post_id, user_id) VALUES (?, ?)";
      db.query(sql, [postID, userID], (err, result) => {
        if (err) {
          console.error("Database error", err);
          return res.status(500).json({ message: "Error creating post" });
        }
        return res.status(200).json({ message: "post created successfully" });
      });
    });
  });
 

  return router;
};
