const mongoose = require("mongoose");
const Newsmodel = mongoose.Schema({
  title: {
    type: String,
    // required: [true, "please provide Title"],
  },
  description: {
    type: String,
    // required: [true, "please provide Description"],
  },
  image: {
    type: String,
    // required: [true, "please Provide Image"],
  },
 
});

const News = mongoose.model("News", Newsmodel);
module.exports = News;