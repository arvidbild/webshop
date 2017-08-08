var Products = require("../models/Product");

module.exports = {

	find: function(params, callback) {
		
		Products.find(params, function(err, results){
			if (err) {
				callback(err, null);
				return;
			}	
			callback(null, results);
		});
	},

	findById: function(id, callback) {

		Products.findById(id, function(err, result){

			if(err) {
				callback(err, null);
				return;
			}
			callback(null, result);	
		});
	},

	create: function(params, callback) {
		Products.create(params, function(err, result){


			if(err){
				callback(err, null);
			return;			
			}
			callback(null, result);
		});	
	},

	update: function(params, callback) {
		Products.findByIdAndUpdate(id, params,{new:true}, function(err, result){

			if(err){
				callback(err,null);
			return; 
			}
			callback(null, result);	
		});
	},

	delete: function(id, callback) {
		Products.findByIdAndDelete(id, function(err,result){

			if(err){
				callback(err,null);
			return; 
			}
			callback(null, result);
		});

	}

}




