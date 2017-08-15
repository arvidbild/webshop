var express = require("express");
var router = express.Router(); 
var Cart = require("../models/Chart");

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
	console.log(req.session);
	//create a new cart, if it already exist profgress with the current session - IF not create a new empty object. 
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	console.log("do I reach affter hte new Cart?");

	if(resource == "products") {
		console.log("do I reach the if statement?");
	
		ProductController.findById(id, function(err, result) {
			console.log("do i reach the monogdb?");
			console.log(result);
			if(err){
				res.json({
					confirmation: "fail",
					message: "not found"
				});
				
				return;
			}
			
				cart.add(result, result.id);
				req.session.cart = cart; 
				console.log(req.session.cart);
				res.redirect("/api/products");

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