const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Module"
    }
  ],
  image: {
    type: String
  }
});

module.exports = mongoose.model("Subject", subjectSchema);
