var express = require("express");
var router = express.Router(); 

var ProductController = require("../controllers/ProductController");
var userController = require("../controllers/userController");

router.get("/:resource", function(req,res,next){
	console.log("you have reach the API");

	var resource = req.params.resource;
		
		if (resource == "products") {
		console.log("you are in the IF statement");
			ProductController.find(req.query, function(err,results){
				
					if(err){
						res.json({
							confirmation: "fail",
							message: err
						});
						return;
					}
					console.log(results);
					var products = results
					res.render("products", {data: products}); 			
		});
	}
});

router.get("/:resource/:id", function(req, res, next) {

	var resource = req.params.resource;
	var id = req.params.id;

	if(resource == "Products") {
	
		ProductController.findById(id, function(err, result) {

			if(err){
				res.json({
					confirmation: "fail",
					message: "not found"
				});
				
				return;
			}
				res.json({
					confirmation: "sucsess",
					result: result
				});
			});
	}
});

router.post("/:resource", function(req, res, next){

	var resource = req.params.resource; 

	if (resource == "createProduct"){
		ProductController.create(req.body, function(err, result){
			if (err){
				res.json({
					confirmation: "fail",
					message: "the post method didnt work"
				});
			return;
			}
			res.json({
				confirmation: "sucess with router.post",
				result: result
			});
		});
	}

	if (resource == "signup"){
		userController.create(req.body, function(err,result){
			if(err){
				res.json({
					confirmation: "fail",
					message: "the post method didnt work"
					});
				return;
				}			
			res.json({
				confirmation: "sucess with router.post",
				message: result
				})		
		})
	}


});

router.post("/:resource/:id", function(req,res,next){

	if(resource =="products"){
		chartController.create(req.body, function(err,result){
			if(err){
				res.json({
					confirmation: "fail",
					message: "Post to chartController didnt work"
				});
			return; 	
			}
			res.json({
				confirmation: "Sucess with router post to chartController",
				message: result
			});
		});
	}

});

router.put("/:resource/:id", function(req,res,next){
console.log("we reached the API");
	var resource = req.params.resource;
	var id = req.params.id;

	if(resource == "createProduct"){
	ProductController.findByIdAndUpdate(id,params ,{new:true}, function(err, result){
		if (err){
			res.json({
				confirmation: "fail",
				message: "The update didnt work"
			});
		return;
		}
		res.json({
			confirmation: "sucess",
			message: result
			});
		});
	}
});

router.delete("/:resource/:id",function(req,res,next){

	var resource = req.params.resource;
	var id = req.params.id; 

	ProductController.findByIdAndRemove(id, function(err,result){
		if (err){
			res.json({
				confirmation: "fail",
				message: "The delete didnt work"
			});
		return;
		}
		res.json({
			confirmation: "sucess with delete",
			message: result
			});		
	});
});


module.exports = router; 