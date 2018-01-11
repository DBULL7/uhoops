let jwt = require('jsonwebtoken')


exports.index = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, 'secret', (error, decoded) => {
			if (error) {
				// render unlogged in home page 
				res.render('landing/index', {})
			} else {
				// render newsfeed 
				res.render('home/index', {})
			}
		})
	} else {
		// render home page 
		res.render('landing/index', {})
	}	
	
}