const Post = require("../models/postModel");

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        if (!posts || posts.length === 0) {
            return res.status(200).json({ status: "success", message: "There are no Posts to show" })
        }
        return res
            .status(200)
            .json({ status: "get all post success", results: posts.length, data: { posts } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed" });
    }
};

// Get a single post by its ID
const getSinglePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                status: "get single post failed",
                message: "No post found with that id.",
            });
        }
        return res.status(200).json({
            status: "get single post success",
            data: { post },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed", message: 'Server Error.'
        });
    }
};

const createPost = async (req, res, next) => {
    try {
        const post = await new Post(req.body).save();
        return res.status(201).json({
            status: "Post created  successfully!",
            data: { post },
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "create post failed",
            message: 'Server Error.'
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        // Use destructuring to extract the fields we want from `req.body`
        const { title, body } = req.body;

        // Firstly check if there is a body and if it has either of these properties
        if (!title && !body) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide both a title and some body.",
            });
        }

        let post = await Post.findByIdAndUpdate(
            postId,
            { title, body },
            { new: true, runValidators: true }
        ).exec();

        // If no post with that ID   exists, send back a 404
        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "No post with this id exists.",
            });
        } else {
            // Otherwise, send back an updated post
            return res.status(200).json({
                status: "Update success",
                data: { post },
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: "Update failed",
            message: 'Server Error.'
        });
    }
};

// @desc Delete a post by its Id
// @route DELETE /api/posts/:id
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find the post using the provided ID. If it doesn't exist, return a 404
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                status: "Fail",
                message: "The post does not exist."
            })
        };

        // Remove the post from the database and return a response to the client
        await Post.findOneAndDelete({ _id: postId });
        return res.status(200).json({
            status: 'Success',
            data: null,
            message: `Deleted post with id ${postId}`
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'delete failed',
            message: 'Server Error.'
        });
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}