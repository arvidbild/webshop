//"use strict";

var Product = require("../src/models/Product");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/webshop");

var products = [
    
new Product({

    name: "General",
    price: 10,
description: "One of the most classic products",
}),

new Product({

    name: "Goteborgs Rapé",
    price: 30,
description: "This is the favourite among Gothenburgers",
}),    
    
new Product({

    name: "Onix",
    price: 20,
description: "Onix is the non-nicotine snus.",
    })  
];
    
var done = 0; 
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err,result) {
        done++;
        if (done === products.length) {
            exit();
        }                                       
    });
}

function exit () {
    mongoose.disconnect;
}

console.log("hej seeder");