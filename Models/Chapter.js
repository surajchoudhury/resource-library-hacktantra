const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
