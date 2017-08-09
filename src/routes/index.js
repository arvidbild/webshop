var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/updateProduct", function(req,res,nest){
	res.render("updateProduct",null);
});

module.exports = router;
