var express = require('express');
var router = express.Router();

var authService = require('../services/auth-service');
var userService = require('../services/user-service');

router.post('/create', function(req, res) {
  authService.register(req)
  .then(function(user){
  	res.status(200).json({user:user});
  }, function(message){
  	res.status(400).json({message:message});
  })
});

router.post('/edit', function(req, res){
	userService.editUser(req)
	.then(function(user){
		res.status(200).json({user:user});
	}, function(message){
		res.status(400).json({message:message});
	})
});

router.delete('/delete', function(req, res){
	userService.deleteUser(req)
	.then(function(affectedRow){
		res.status(200).json({affectedRow:affectedRow});
	}, function(message){
		res.status(400).json({message:message});
	})
});

router.post('/edit-self', function(req, res){
	userService.editSelf(req)
	.then(function(user){
		res.status(200).json({user:user});
	}, function(message){
		res.status(400).json({message:message});
	})
})

router.post('/change-password', function(req, res){
	userService.changePassword(req)
	.then(function(user){
		res.status(200).json({user:user});
	}, function(message){
		res.status(400).json({message:message});
	})
})




module.exports = router;
