// getting-started.js
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saneraza78692:TiLjrkvuBe7z1tyQ@cluster.jxjmmxb.mongodb.net/"
  );
};

module.exports = connectDB;
