const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialapi",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("MongoDB connected!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB