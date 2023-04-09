const express = require("express");
const { createPost, getPost, updatePost, deletePost, likePost, dislikePost, totalPost, topLikedPost, getAllPost } = require("../controller/posts");

const postRoutes = express.Router();

postRoutes.post("/",createPost);
postRoutes.get("/:Id",getPost);
postRoutes.put("/:Id",updatePost);
postRoutes.delete("/:Id",deletePost);
postRoutes.post("/:Id/like",likePost);
postRoutes.post("/:Id/unlike",dislikePost);
postRoutes.get("/analytics/posts",totalPost);
postRoutes.get("/analytics/posts/top-liked",topLikedPost);


module.exports = { postRoutes }