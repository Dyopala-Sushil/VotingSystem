const mongoose = require("mongoose");
dbUrl = "mongodb://localhost:27017/voting-system-api";

mongoose.connect(dbUrl,(err,success)=>{
    if(err){
        console.log("Error Occured! DB not connected.")
    }else{
        console.log("DB connected successfully!")
    }
})