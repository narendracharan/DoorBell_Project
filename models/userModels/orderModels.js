const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  postalCode: {
    type: Number,
    require: true,
  },
  orderNotes: {
    type: String,
    require: true,
  },
  orderStatus: {
    type: String,
    default: "Paid",
    enum: ["Paid", "Refund", "Cancelled"],
  },
  products: [
    {
      products_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: [],
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("userOrder", schema);
