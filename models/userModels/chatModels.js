const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    mother: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    daughter: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    clinician: {
      type: mongoose.Types.ObjectId,
      ref: "clinician",
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
    },
    profile_image: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Date,
      required: false,
      default: Date.now(),
    },
});

schema.set("timestamps", true);
module.exports = mongoose.model("Chat", schema);
