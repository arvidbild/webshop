"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var chartSchema = new Schema ({

	last_modified: {type: String},
	status: {type: String},
	items: {type: Number},
	quantity: {type: Number}
}); 


module.exports = mongoose.model("Chart", chartSchema);