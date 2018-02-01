let Admin = require('../models/Admin')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

exports.index = (req, res) => {
	res.render('admin/index', {})
}

exports.dashboard = (req, res) => {
	res.render('admin/dashboard', {})
}


exports.login = (req, res, next) => {
	if (!req.body.password) {
		return res.status(400).json({ message: 'Password required.' })
	}
	Admin.findOne({ username: req.body.username }, (err, user) => {
		if (err) {
			return res.status(500)
		}
		if (!user) {
			res.status(401).json({ message: 'Nada.' })
		} else {
			if (!user.comparePassword(req.body.password)) {
				res.status(401).json({ message: 'Nope.' })
			} else {
				user.password = undefined
				let token = jwt.sign({ _id: user._id }, 'supersecret')
				res.cookie('jwt', token, { maxage: 900000, httpOnly: true }).json({ message: 'Success' })
			}
		}
	})
}


exports.create = (req, res) => { 
	var newAdmin = new Admin(req.body);

	newAdmin.password = bcrypt.hashSync(req.body.password, 10);
	newAdmin.save((err, user) => {
		if (err) {
			return res.status(400).send({ message: 'Email Taken.' })
		} else {
			user.password = undefined;
			let token = jwt.sign({ _id: user._id }, 'supersecret')
			res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({ message: 'Success' })
		}
	})
}
