const express = require("express");
const router = express.Router();
const Path = require("path");
const WebPage = require("../models/webPageModel");
const fs = require("fs");
module.exports = router;
 
// add custom route here - be carefull while writing code 



// end of add custom route here 


createRoute = () => {
  router.route("/").get((req, res) => {
    
    res.render(Path.join(__dirname, `../views/index`));

  });

  router.route("/:file").get(async (req, res) => {
    let WebData = await WebPage.findOne({fileName:req.params.file})
        res.status(200).render(Path.join(__dirname, `../views/${req.params.file}`),{
        })
   
  });
};


createRoute();
