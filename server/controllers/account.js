let bcrypt = require('bcrypt')
let User = require('../models/user')

exports.get = (req, res) => { }

exports.put = (req, res) => { }

exports.deleteaccount = (req, res) => { }

exports.post = (req, res, next) => { 
  var newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({ message: err})
    } else {
      user.password = undefined;
      return res.json(user);
    }
  })
}