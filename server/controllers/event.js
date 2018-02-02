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


exports.patch = (req, res) => {
  const token = req.cookies.jwt
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Not authorized' })
    } else {
      let id = decoded._id
      Event.find({ _id: req.body.event, players: {$in: [id]}}, (err, docs) => {
        if (err) return res.json(err)
        if (!docs.length) {
          Event.findByIdAndUpdate(
            req.body.event,
            { $push: { players: id } },
            { new: true },
            (err, results) => {
              if (err) console.log(err, 'this is the err')
              if (!results) return res.status(404).json({ message: 'No event by that ID found.' })
              res.json({ message: 'Success' })
            }
          )
        } else {
          Event.findByIdAndUpdate(
            req.body.event,
            { $pull: { players: id }},
            { new: true },
            (err, results) => {
              if (err) return res.json({ message: err })
              res.json(results)
            }
          )
        }
      })
    }
  })
}


exports.put = (req, res) => {
  const token = req.cookies.admin 
  jwt.verify(token, 'supersecret', (error, decoded) => {
    if (error) return res.json({message: 'Not admin.'})
    let { _id, name, cost, description, date, location } = req.body 
    Event.findByIdAndUpdate(
      _id, 
      { "$set": { "name": name, "cost": cost, "description": description, "date": date, "location": location } },
      { new: true },
      (err, event) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(event);
      }
    })
  })
}


exports.deleteevent = (req, res) => { 
  const token = req.cookies.admin
  jwt.verify(token, 'supersecret', (error, decoded) => {
    if (error) return res.json({message: 'Not Admin'})
    Event.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) return res.status(500).json({message: 'Something went wrong'})
      res.json(result)
    })
  })
}


exports.post = (req, res) => {
  const token = req.cookies.admin
  jwt.verify(token, 'supersecret', (error, decoded) => {
    // might consider looking up id for additional security check 
    if (error) {
      // return not found 
    } else {
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