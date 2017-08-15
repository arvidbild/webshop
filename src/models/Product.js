"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var productSchema = new Schema ({
    		
//    		_id: {type: Number},
           name: {type: String, default: ""},
          price: {type: Number},
    description: {type: String, default: ""},
//    lastUpdated: {type: Number},
//       category: {type: String},
       	  brand: {type: String},
//       	 assets: {type: String},
//       	 attrs: {type: String},
//       	 variants: {type: String},
	imagePath: {type:String}
    
});

module.exports = mongoose.model("Product", productSchema);