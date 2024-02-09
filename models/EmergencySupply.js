const mongoose = require('mongoose')
// sourcery skip: use-object-destructuring
const Schema = mongoose.Schema

const EmergenctSupplySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    quantity: {
      type: Number,
      min: 0,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    }
  },
  { versionKey: false }
)

const EmergenctSupply = mongoose.model(
  'EmergencySupply',
  EmergenctSupplySchema
)

module.exports = EmergenctSupply
