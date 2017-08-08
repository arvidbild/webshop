"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    
    fullName: {
        type: String,
    required: [true, "you have to provide a full name"] 
    },
    
 emailAdress: {
       type: String,
   required: [true, "you have to provide an email"],
     unique: [true, "Email belongs to a existing user"]
    },
    
   imagePath: {
        type: String,
      },
    assets: {
        type: String,
    }
    
        
});

var user = mongoose.model("user", userSchema);
module.exports = user;