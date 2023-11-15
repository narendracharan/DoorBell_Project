const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  }
});

schema.set("timestamps", true);
module.exports = mongoose.model("Clinician", schema);
