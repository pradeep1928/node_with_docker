const express = require("express");
const {
    getAllPosts,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

module.exports = router
