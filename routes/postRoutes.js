const express = require("express");
const {
    getAllPosts,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
} = require("../controllers/postController");
const protect = require('../middleware/authMiddleware')


const router = express.Router();

router.route("/").get(protect, getAllPosts).post(protect, createPost);

router.route("/:id").get(protect, getSinglePost).patch(protect, updatePost).delete(protect, deletePost);

module.exports = router
