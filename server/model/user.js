const mongoose = require("mongoose");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, min: 1, max: 50 },
    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    bio: { type: String, minL: 1, max: 200 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
