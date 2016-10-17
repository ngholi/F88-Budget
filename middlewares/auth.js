var jwtService = require('../services/jwt-service');

module.exports = {
	
	verifyToken : function(req, res, next){
		
		if(req._parsedUrl.pathname == '/authenticate/login' && req.method == 'POST'){
			next();
		}else{
			//verify the token
			jwtService.verifyToken(req.headers.authorization)
			.then(function(decoded){
				req.payload = decoded;
				next();
			},function(){
				res.status(401).json({message: 'Unauthorized'});
			})
		}	
	}
}