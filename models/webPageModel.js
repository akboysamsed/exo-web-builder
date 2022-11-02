const mongoose = require("mongoose");

const webPageSchema = new mongoose.Schema({
      pageName: {
        type: String,
        required: true,
        unique:true
      },
      fileName: {
        type: String,
        required: true,
        unique:true
      },
      pageContent: {
        type: String,
        required: true,
      }
      
  });

module.exports =  mongoose.model("webPage", webPageSchema);
