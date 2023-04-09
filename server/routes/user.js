const express = require("express");
const { register, login, updateUser, deleteUser, totalUser, activeUsers } = require("../controller/user");

const userRouter = express.Router();

userRouter.post("/users",register);
userRouter.post("/login",login);
userRouter.put("/users/:userId",updateUser);
userRouter.delete("/users/:userId",deleteUser);
userRouter.get("/analytics/users",totalUser);
userRouter.get("/analytics/users/top-active",activeUsers);

module.exports = { userRouter }