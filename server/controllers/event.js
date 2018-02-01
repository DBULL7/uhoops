let Event = require('../models/Event')
let jwt = require('jsonwebtoken')


exports.get = (req, res) => {
  Event.find()
    .populate('players.player', 'name _id position email')
    .exec((err, results) => {
      if (err) {
        return next(err)
      } else {
        res.json(results)
      }
    })
}

exports.put = (req, res) => { }

exports.deleteevent = (req, res) => { }

exports.post = (req, res) => {
  const token = req.cookies.admin
  jwt.verify(token, 'supersecret', (error, decoded) => {
    // might consider looking up id for additional security check 
    if (error) {
      // return not found 
    } else {
      // should be the id 
      let id = decoded._id
      let newEvent = new Event(req.body)
      newEvent.save((err, post) => {
        if (err) {
          return res.send(err)
        } else {
          res.json(post)
        }
      })
    }
  })
}