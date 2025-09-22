const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (db, cloudinary) {
    router.get('/', (req, res) =>{
        const sql = "SELECT category.*, COUNT(posts.post_id) AS num_posts  FROM category LEFT JOIN posts ON category.category_id=posts.category_id GROUP BY category.title";
        db.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching categories: ",err);
                return res.status(500).json({ message: "Error fetching categories" });
            }
            return res.status(200).json(results);
        })
    })
    router.get('/:title/posts', (req,res) => {
        const title = req.params.title;
        const sql = "SELECT posts.* FROM posts LEFT JOIN category ON category.category_id = posts.category_id  WHERE category.title = ?";
        db.query(sql, [title], (err, results) => {
            if (err) {
                console.error("Error fetching posts for category: ",err);
                return res.status(500).json({ message: "Error fetching posts for category" });
            }
            return res.status(200).json(results);
        })
    })


    //INSERTING POSTS SQL CODE
    // INSERT INTO `posts` (`post_id`, `user_id`, `category_id`, `title`, `description`, `start_time`, `expiry_time`, `max_players`, `num_joined`) VALUES (NULL, '1', '2', 'fajerrr', 'asdasdadsasd', current_timestamp(), (current_timestamp() + interval 2 hour), '4', '0')
    return router;
}

