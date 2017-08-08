var Users = require("../models/User");

module.exports = {

	find: function(params, callback) {

		Users.find(params,function(err,result){
			if (err) {
				callback(err,null);
				return;
			}	
			callback(null,result); 
		});	

	}, 

	findById: function(id, callback){

		Users.findById(id, function(err,result){
			
			if(err){
				callback(err,null);
				return;
			}
			callback(null,result);
		});
	},

	create: function(params,callback){
		Users.create(params, function(err,result){
			if(err){
				callback(err,null);
				return;
			}
			callback(null,result);
		})
	},

	update: function(params, callback){
		
		Users.findByIdAndUpdate(id,params,{new:true},function(err, result){
			if(err){
				callback(err,null);
				return;
			}
			callback(null,result);
		});
	},

	delete: function(id, callback){
		Users.findByIdAndDelete(id, function(err, result){
			if(err){
				callback(err,null);
				return;
			}
			callback(null,result);
		});
	}


}