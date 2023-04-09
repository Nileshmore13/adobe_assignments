const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/user");
const { postRoutes } = require("./routes/posts");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/",userRouter);
app.use("/posts",postRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8000, () => console.log(`server is running on 8000`));
  })
  .catch((err) => console.log(`${err} did not connect`));
