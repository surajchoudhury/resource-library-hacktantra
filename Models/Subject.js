const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  modules: [{
    type: Schema.Types.ObjectId,
    ref: 'Mentor'
  }],
  Image: {
    type: String
  }
})

module.exports = mongoose.model('Subject', subjectSchema)