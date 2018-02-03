let Admin = require('../models/Admin')
let Event = require('../models/Event')
let Post = require('../models/Post')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

exports.index = (req, res) => {
	res.render('admin/index', {})
}

exports.dashboard = (req, res, next) => {
	Event.find()
	  .populate('players', 'name _id position email')
		.exec((err, results) => {
			if (err) {
				return next(err)
			} else {
				Post.find({reported: true})
					.populate('postedBy', 'name _id')
					.exec((err, reportedPosts) => {
						if (err) {
							return next(err)
						} else {
							res.render('admin/dashboard', { events: results, reported: reportedPosts })
						}
					})	
			}
		})
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
				res.cookie('admin', token, { maxage: 900000, httpOnly: true }).json({ message: 'Success' })
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
			res.cookie('admin', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({ message: 'Success' })
		}
	})
}


exports.event = (req, res, next) => {
	Event.findById(req.params.id)
		.populate('players', 'name _id position email')
		.exec((err, event) => {
			if (err) {
				return next(err)
			} else {
				if (event) {
					res.render('admin/event', { event: event })
				} else {
					next()
				}
			}
		})
}