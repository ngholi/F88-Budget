module.exports = {
	registerCriteria : {
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
	    isLength: {
	      options: [{ min: 2, max: 10 }],
	    },
	    errorMessage: 'Invalid Department'
	  }
	}
}