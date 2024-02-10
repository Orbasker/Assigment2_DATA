const mongoose = require("mongoose");

const EmergenctSupplySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { versionKey: false },
);

const EmergenctSupply = mongoose.model(
  "EmergencySupply",
  EmergenctSupplySchema,
);

module.exports = EmergenctSupply;
