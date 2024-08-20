//To connet the app to database//
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/signuplogin")
  .then(() => {
    console.log("mongodbconnected");
  })
  .catch(() => {
    console.log("failed to connect");
  });
//Creating a schema//
const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//Schema maps to collection//
const collection = new mongoose.model("Collection1", logInSchema);
//exporting the collection //
module.exports = collection;
