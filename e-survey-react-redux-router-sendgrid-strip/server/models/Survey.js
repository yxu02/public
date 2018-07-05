const mongoose = require("mongoose");
const RecipientSchema = require('./Recipient');

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],  //array of RecipientSchema
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  //_user notation tells mongoDB that this is a reference type
  //need to set up the relationship at model instantiation
  _user: {type: Schema.Types.ObjectId, ref:'User'},
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);