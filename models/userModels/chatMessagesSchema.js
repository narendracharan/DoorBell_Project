const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  lastMessage: {
    type: String,
    required: false,
    default: "",
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "Doorbeladmin",
    require: true,
  },
  sentBy: {
    type: String,
    require: true,
    enum: ["User", "Admin"],
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("chatMessage", schema);
