var express = require('express');
var router = express.Router();

var db = require('../models/index');
var User = db.User;

var authService = require('../services/auth-service');
var jwtService = require('../services/jwt-service');

router.post('/login', function(req, res){
	authService.checkLoginCredentials(req, function(user, message){
		if(user){
			res.status(200).json({token:jwtService.generateJWT(user)});
		}else{
			res.status(400).json({message:message});
		}
	})
});

router.post('/register', function(req, res){
	authService.register(req, function(user, message){
		if(user){
			res.status(200).json({user:user});
		}else{
			res.status(400).json({message:message});
		}
	})
});

module.exports = router;
