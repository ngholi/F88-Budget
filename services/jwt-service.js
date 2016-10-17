var jwt = require('jsonwebtoken');
var config = require('../app-config');
var NodeCache = require('node-cache');

var JWT_KEY = config.JWT_KEY;
var User = require('../models/index').User;
var userCache = new NodeCache({stdTTL:3600, checkperiod:0});

var jwtservice = {};

jwtservice.generateJWT = function(user){
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate()+60);
	var userInfo = {
		id: user.id,
		name:user.name,
		email:user.email,
		exp: parseInt(exp.getTime()/1000)
	}
	userCache.set(user.id, userInfo);
	return jwt.sign(userInfo,JWT_KEY);
};

jwtservice.verifyToken = function(tokenString){
	//verify the authorization
	return new Promise(function(fulfill,reject){
		if(tokenString && tokenString.substring(0,7) == "Bearer "){
			var token = tokenString.substr("Bearer ".length);
			jwt.verify(token, JWT_KEY, function(err, payload){
				if(err || payload.exp < Math.floor(Date.now()/1000)){
					reject();
				}else{
					var user = userCache.get(payload.id);
					if(user && isEqual(user, payload)){
						fulfill(payload);
					}
					else{
						User.findOne({
							 where: {
							 	id: payload.id,
							 	name: payload.name,
							 	email: payload.email
							 },
						}).then(function(user){
							if(user)
								fulfill(payload);
							else
								reject();
						}).catch(function(err){
							reject();
						})
					}
				}
			})
		}else{
			reject();
		}
	})
}

var isEqual = function(user, payload){
	if(user.id == payload.id && user.name == payload.name && 
		user.email == payload.email && user.exp == payload.exp)
		return true;
	else
		return false;
}

module.exports = jwtservice;