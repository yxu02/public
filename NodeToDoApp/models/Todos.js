const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDosSchema = new Schema({
  text: {
    type:String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completedAt:{
    type: Number,
    default: null
  }
});

module.exports.Todo = mongoose.model('toDos', toDosSchema);