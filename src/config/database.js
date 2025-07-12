const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongoURL);
    console.log(
      `MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
