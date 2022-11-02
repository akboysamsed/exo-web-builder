const app = require("./app");
const env = require("dotenv");
env.config({path:"./config/config.env"})
const connectDatabase = require("./config/database");
var request = require('request');
const Port = process.env.PORT || 5000




// connecting to database 
connectDatabase();



app.listen(Port,()=>{
    console.log(`Server is running at ${Port} `)
})