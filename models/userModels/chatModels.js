const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user1: {
      type: mongoose.Types.ObjectId,
      ref: "Doorbeluser",
      required: true,
    },
    user2: {
      type: mongoose.Types.ObjectId,
      ref: "Doorbeluser",
      required: true,
    },
    // clinician: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "clinician",
    //   required: true,
    // },
    lastMessage: {
      type: String,
      required: false,
      default: "",
    },
    // name: {
    //   type: String,
    //   required: false,
    // },
    // profile_image: {
    //   type: String,
    //   required: false,
    // },
    timestamp: {
      type: Date,
      required: false,
      default: Date.now(),
    },
});

schema.set("timestamps", true);
module.exports = mongoose.model("Chat", schema);
