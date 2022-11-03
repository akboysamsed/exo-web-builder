const express = require("express");
  const editedRoute = express.Router();
  const Path = require("path");
  const WebPage = require("../models/webPageModel");
  module.exports = editedRoute;
  
  // add custom route below - be carefull while writing code
  editedRoute.route('/work/:name').get((req,res)=>{
    res.send(`<center><h1>Hello, ${req.params.name} it's Working</h1></center>`)
})
  