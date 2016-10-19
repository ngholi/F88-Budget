module.exports = {
	registerRules : {
	 'email': {
	    notEmpty: true,
	    isEmail: true,
	    errorMessage: 'Invalid Email'
	  },
	  'password': {
	    notEmpty: true,
	    isLength: {
	      options: [{min: 8}],
	      errorMessage: 'Password must contain at least 8 characters'      
	    },
	    errorMessage: 'Invalid Password'
	  },
	  'name': {
	    isLength: {
	      options: [{min: 3}],      
	    },
	    errorMessage: 'Invalid Name'
	  },
	  'phoneNumber': {
	    optional: true,
	    isLength: {
	      options: [{ min: 5, max: 14 }],
	      errorMessage: 'Phone Number length must be from 5 to 14'
	    },
	    errorMessage: 'Invalid Phone Number'
	  },
	  'departmentId': {
	    optional: true,
	    isInt: true,
	    errorMessage: 'Invalid Department'
	  }
	},

	loginRules : {
		'email': {
	    notEmpty: true,
	    isEmail: true,
	    errorMessage: 'Invalid Email'
	  },
	  'password': {
	    notEmpty: true,
	    isLength: {
	      options: [{min: 8}],
	      errorMessage: 'Password must contain at least 8 characters'      
	    },
	    errorMessage: 'Invalid Password'
	  }
	},

	editUserRules:{
		  'userId':{
		  	notEmpty: true,
		  	isInt: true
		  },
		  'name': {
		  	optional: true,
		    isLength: {
		      options: [{min: 3}],      
		    },
		    errorMessage: 'Invalid Name'
		  },
		  'email': {
		    optional: true,
		    isEmail: true,
		    errorMessage: 'Invalid Email'
		  },
		  'phoneNumber': {
		    optional: true,
		    isLength: {
		      options: [{ min: 5, max: 14 }],
		      errorMessage: 'Phone Number length must be from 5 to 14'
		    },
		    errorMessage: 'Invalid Phone Number'
		  },
		  'departmentId': {
		    optional: true,
		    isInt: true,
		    errorMessage: 'Invalid Department'
		  }
	},

	selfEditRules:{
		 'name': {
		  	optional: true,
		    isLength: {
		      options: [{min: 3}],      
		   },
		   errorMessage: 'Invalid Name'
		 },
		 'phoneNumber': {
		    optional: true,
		    isLength: {
		      options: [{ min: 5, max: 14 }],
		      errorMessage: 'Phone Number length must be from 5 to 14'
		  	},
		    errorMessage: 'Invalid Phone Number'
		  },
	},

	changePasswordRules:{
		'oldPassword':{
			notEmpty: true,
		    isLength: {
		      options: [{min: 8}],
		      errorMessage: 'Password must contain at least 8 characters'      
		    },
		    errorMessage: 'Invalid Password'
		},
		'newPassword':{
			notEmpty: true,
		    isLength: {
		      options: [{min: 8}],
		      errorMessage: 'Password must contain at least 8 characters'      
		    },
		    errorMessage: 'Invalid Password'
		}
	},

	addDepartmentRules : {
		'name': {
			notEmpty: true,
			isLength: {
				options: [{min: 2}],
				errorMessage: 'Department must contain at least 2 characters'
			},
			errorMessage: 'Invalid department name'
		},
		'managerId': {
			optional: true,
			isInt: true,
			errorMessage: 'Invalid Department'
		},
		'parentDepartmentId': {
			optional: true,
			isInt: true,
			errorMessage: 'Invalid Super Department'
		}
	},

	editDepartmentRules : {
		'departmentId': {
			notEmpty: true,
			isInt: true,
			errorMessage: 'Invalid Department'
		},
		'name': {
			optional: true,
			isLength: {
				options: [{min: 2}],
				errorMessage: 'Department must contain at least 2 characters'
			},
			errorMessage: 'Invalid department name'
		},
		'managerId': {
			optional: true,
			isInt: true,
			errorMessage: 'Invalid Department'
		},
		'parentDepartmentId': {
			optional: true,
			isInt: true,
			errorMessage: 'Invalid Department'
		}
	}
}