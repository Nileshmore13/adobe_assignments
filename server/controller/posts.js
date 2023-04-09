const { postModel } = require("../model/posts");

const createPost = async (req, res) => {
  try {
    const { userId, content, likes } = req.body;
    const newPost = new postModel({
      userId,
      content,
      likes,
    });

    await newPost.save();
    res.status(200).json({ message: "new post created seccessfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};


const getPost = async (req, res) => {
  try {
    const { userId:Id } = req.params;
    const post = await postModel.find({Id});
    res.status(200).json({ post });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { Id } = req.params;
    const { content: newContent } = req.body;

    const newValue = {
      $set: {
        content: newContent,
      },
    };
    await postModel.updateOne({ _id: Id }, newValue);
    res.status(200).json({ message: "post updated" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { Id } = req.params;

    await postModel.findByIdAndDelete(Id);
    res.status(200).json({ message: "post Deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const likePost = async (req, res) => {
  try {
    const { Id } = req.params;

    let post = await postModel.findById({ _id: Id });
    post.likes++;
    await post.save();
    res.status(200).json({ message: "post liked successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const dislikePost = async (req, res) => {
  try {
    const { Id } = req.params;

    let post = await postModel.findById({ _id: Id });
    if (post.likes > 0) {
      post.likes--;
      await post.save();
      return res.status(200).json({ message: "post dis-liked successfully" });
    }
    res.status(200).json({ message: "cant unlike this post" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const totalPost = async (req, res) => {
  try {
    const totalPost = await postModel.countDocuments();
    res.status(200).json({ totalPost });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const topLikedPost = async (req, res) => {
  try {
    const top_Liked_Post = await postModel.find().sort({likes:-1}).limit(5)
    res.status(200).json({ top_Liked_Post });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  totalPost,
  topLikedPost,
};
