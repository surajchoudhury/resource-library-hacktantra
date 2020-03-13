const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

let Link = mongoose.model("Link", linkSchema);
module.exports = Link;
