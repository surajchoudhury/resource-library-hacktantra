const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String
    },
    image: {
      type: String
    },
    faq: {
      type: String
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject"
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Mentor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
