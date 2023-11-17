const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
    enum: ["Mother", "Daughter", "Clinician"],
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("chatMessage", schema);
