const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false}
});

//for sub-document, instead of define the model, you export it
module.exports = recipientSchema;