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
		}
	}
}