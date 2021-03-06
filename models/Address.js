const mongoose = require('mongoose')

const { Schema } = mongoose

const AddressSchema = new Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true }
})

module.exports = mongoose.model('Address', AddressSchema)
