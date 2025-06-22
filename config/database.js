
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://saneraza78692:TiLjrkvuBe7z1tyQ@cluster.jxjmmxb.mongodb.net/")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB; // ✅ This line is very important
