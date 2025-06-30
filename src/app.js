const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

//* Middleware to parse JSON data from the request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//! import all routers into app.js
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
