exports.index = (req, res) => {
	res.render('home/index', {})
}

exports.messaging = (req, res) => {
	res.render('home/messaging', {})
}

exports.notifications = (req, res) => {
	res.render('home/notifications', {})
}

exports.tours = (req, res) => {
	res.render('home/tours', {})
}

exports.profile = (req, res) => {
	res.render('home/profile', {})
}