let jwt = require('jsonwebtoken')

exports.index = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, 'secret', (error, decoded) => {
			if (error) {
				// render unlogged in home page 
				res.render('tours/index', {})
			} else {
				// render loggedin tours page 
				res.render('home/index', {})
			}
		})
	} else {
		// render regular page 
		res.render('tours/index', {})
	}	
	
}