const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {type: String,require:true},
    content: { type: String, min: 1, max: 300 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = { postModel };
