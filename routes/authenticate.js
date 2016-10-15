var express = require('express');
var router = express.Router();

var db = require('../models/index');
var User = db.User;

router.post('/login', function(req, res){
	User.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	}).then(function(users){
		console.log(users);
		if(users)
			res.json('ok');
		else
			res.json('no');
	})
});

router.post('/register', function(req, res){

});

module.exports = router;
