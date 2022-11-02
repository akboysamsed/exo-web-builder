const mongoose = require("mongoose");
 
const connectDatabase  = () => {
    
mongoose.connect(process.env.DB_HOST).then((data)=>{
    console.log(`Server is Connected with MongoDB: ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err);
    
    });

}

module.exports = connectDatabase;