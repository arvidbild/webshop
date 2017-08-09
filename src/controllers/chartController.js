<<<<<<< HEAD
var Charts = require("../models/Chart.js");
=======
var Charts = require("../models/Chart.js");



module.exports = {

	create: function(params, callback){
		
		Charts.create(params, function(err,result){

			if(err){
				callback(err,null),
				return; 
			}
			callback(null, result);
		});
	}
}
>>>>>>> testbranch
