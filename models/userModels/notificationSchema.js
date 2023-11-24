const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  reciverId: {
    type: mongoose.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "Doorbeladmin",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("notification", schema);
