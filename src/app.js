const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;

//* Middleware to parse JSON data from the request body
app.use(express.json());
app.use(cookieParser());


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
