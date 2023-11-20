const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
    require: true,
  },
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "Doorbeluser",
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("chatMessage", schema);
