const express = require("express");
  const editedRoute = express.Router();
  const Path = require("path");
  const WebPage = require("../models/webPageModel");
  module.exports = editedRoute;
  
  // add custom route below - be carefull while writing code
  editedRoute.route('/work').get((req,res)=>{
    res.send("Wow it's Working")
})
  