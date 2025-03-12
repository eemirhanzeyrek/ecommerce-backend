const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    console.log(`MongoDB Connected: ${mongoDB.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);

    process.exit();
  }
};

module.exports = connectMongoDB;
