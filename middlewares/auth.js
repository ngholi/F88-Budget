var jwtService = require('../services/jwt-service');

module.exports = {
	verifyToken : function(req, res, next){
		console.log(req._parsedUrl.pathname);
		if(req._parsedUrl.pathname == '/authenticate/login' && req.method == 'POST'){
			next();
		}else{
			//verify the token
			jwtService.verifyToken(req.headers.authorization, function(decoded){
				if(decoded){
					next();
				}else{
					res.status(401).json({message: 'Unauthorized'});
				}
			})
			//next();
		}	
	}
}