const mongoose = require("mongoose");

const editRouteSchema = new mongoose.Schema({

code:{type:String,
default:`const express = require("express");
const editedRoute = express.Router();
const Path = require("path");
const WebPage = require("../models/webPageModel");
module.exports = editedRoute;

// add custom route below - be carefull while writing code
`}

});

module.exports = mongoose.model("editedRoute", editRouteSchema);
