const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatMessage",
    require: true,
  },
  name: {
    type: String,
    required: false,
  },
  profile_image: {
    type: String,
    required: false,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("clinician", schema);
