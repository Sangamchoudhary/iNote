const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"; // We get this string from mongo compass

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("success");
  });
};
module.exports = connectToMongo;
