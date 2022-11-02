const mongoose = require("mongoose");

const pageSectionSchema = new mongoose.Schema({

    fileName: {
      type: String,
      required: true,
      unique:true
    },
    sectionName: {
      type: String,
      required: true,
      unique:true
    },
    sectionContent: {
      type: String,
      required: true,
    },
});

module.exports = mongoose.model("pageSection", pageSectionSchema);
