const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log("mongoDB connectttt");
    })
    .catch((err) => {
      //throw new Error(err.message);
      console.log(err);
    });
};

module.exports = db;
