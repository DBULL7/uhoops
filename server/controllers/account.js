let bcrypt = require('bcrypt')
let User = require('../models/User')
let jwt = require('jsonwebtoken')

exports.get = (req, res) => {
  res.send(req.cookies)
}

exports.put = (req, res) => { }

// exports.deleteaccount = (req, res) => { }

exports.createAccount = (req, res, next) => { 
  var newUser = new User(req.body);
  if (newUser.password.length < 8) {
    return res.status(400).json({ message: 'Password Length Too Short.'})
  }
  if (!newUser.name.length) return res.json({ message: 'Name Required.'})
  if (!newUser.email.length) return res.json({ message: 'Email Required.'})
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: 'Email Taken.'})
    } else {
      user.password = undefined;
      let token = jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'secret')
      res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({ message: 'Success' })
    }
  })
}

exports.login = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password required.'})
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500)
    }
    if (!user) {
      res.status(401).json({ message: 'User not found.'})
    } else {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Wrong Password.'})
      } else {
        user.password = undefined
        let token = jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'secret')
        res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true}).json({ message: 'Success'})
      }
    }
  })
}