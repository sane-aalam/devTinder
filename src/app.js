const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
dotenv.config();

//* Middleware to parse JSON data from the request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:7777',
  credentials: true, // optional, if you're using cookies or sessions
}));

//! import all routers into app.js
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//! Connect to MongoDB database using Mongoose
connectDB()
  .then(() => {
    console.log("database connection is established");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not established");
  });
