const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Image: {
        type: Array,
        require: true,
      },
});

schema.set("timestamps", true);
module.exports = mongoose.model("image", schema);
