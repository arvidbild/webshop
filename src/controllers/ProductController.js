var Product = require("../models/Product");

module.exports = {

	find: function(params, callback) {
		console.log("you have reach the controller");
		
		Product.find(params, function(err, result){
			if (err) {
				callback(err, null);
				return;
			}	
			callback(null, result);
		});
	},

	findById: function(id, callback) {

		Product.findById(id, function(err, result){

			if(err) {
				callback(err, null);
				return;
			}
			callback(null, result);	
		});
	},

	create: function(params, callback) {
		Product.create(params, function(err, result){


			if(err){
				callback(err, null);
			return;			
			}
			callback(null, result);
		});	
	},

	update: function(params, callback) {
		Product.findByIdAndUpdate(id, params,{new:true}, function(err, result){

			if(err){
				callback(err,null);
			return; 
			}
			callback(null, result);	
		});
	},

	delete: function(id, callback) {
		Product.findByIdAndDelete(id, function(err,result){

			if(err){
				callback(err,null);
			return; 
			}
			callback(null, result);
		});

	}
}