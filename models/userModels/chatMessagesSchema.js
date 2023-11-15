const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doorbeluser",
      require: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("chatMessage", schema);
