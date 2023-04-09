const { userModel } = require("../model/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { postModel } = require("../model/posts");

const register = async (req, res) => {
  const { name, email, bio, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, salt);

    const user = new userModel({ name, email, bio, password: passwordHash });

    const newUser = await user.save();

    res.status(201).json({ message: "Register Successfull", newUser });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({ token, user });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name: newName, bio: newBio } = req.body;

    const newValues = {
      $set: {
        name: newName,
        bio: newBio,
      },
    };

    await userModel.updateOne({ _id: userId }, newValues);

    res.status(200).json({ message: "user details updated successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await userModel.findByIdAndDelete({ _id: userId });

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const totalUser = async (req, res) => {
  try {
    const totalNumUser = await userModel.countDocuments();

    res.status(200).json({ message: totalNumUser });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

const activeUsers = async (req, res) => {
  try {
    const pipeline = [
        {
          $lookup: {
            from: "posts",
            localField: "userId",
            foreignField: "_id",
            as: "Posts"
          }
        },
        {
          $addFields: {
            post_count: { $size: "$Posts" }
          }
        },
        {
          $sort: { post_count: -1 }
        },
        {
          $limit: 5
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            post_count: 1
          }
        }
      ];
  
      const result = await userModel.aggregate(pipeline)

    res.status(200).json({message:"Most active users", result });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  totalUser,
  activeUsers,
};
