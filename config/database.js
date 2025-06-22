// getting-started.js
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saneraza78692:TiLjrkvuBe7z1tyQ@cluster.jxjmmxb.mongodb.net/DevTinder"
  );
};

connectDB()
  .then(() => {
    console.log("database connection is established");
  
  })
  .catch((err) => {
    console.error("database can not established");
  });
