const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb-url", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
