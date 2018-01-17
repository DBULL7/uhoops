let Post = require('../models/Post')
let jwt = require('jsonwebtoken')
let User = require("../models/User")

exports.get = (req, res, next) => { 
  Post.find().populate('postedBy', 'name').exec((err, results) => {
    if (err) {
      return next(err)
    } else {
      res.json(results)
    }
  })

  // })
}
//   let


exports.like = (req, res) => { 
  let token = req.cookies.jwt 
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      
    } else {
      let userID = decoded._id 
      Post.find({ _id: req.body.post, likedBy: { $in: [userID] }}, (err, docs) => {
        if (err) {
          // something went wrong
          res.status(500).json({message: err})
        } else {
          if (docs.length) {
            Post.findByIdAndUpdate(
              req.body.post,
              { $pull: { likedBy: userID }, $inc: { likes: -1 }},
              { new: true },
              (err, results) => {
                if (err) return res.json({ message: err })
                res.send(results)
              }
            )
            // need to remove from array and decrement likes
          } else {
            Post.findByIdAndUpdate(
              req.body.post,
              { $push: { likedBy: userID }, $inc: { likes: 1 } },
              { new: true },
              (err, results) => {
                if (err) return res.json({ message: err })
                res.send(results)
            })
          }
        }
      })
    }
  })
}

exports.likeStatus = (req, res) => {
  let token = req.cookies.jwt
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Not logged in.'})
    } else {
      let userID = decoded._id 
      
      Post.find({ _id: req.params.id, likedBy: { $in: [userID] } }, (err, docs) => {
        if (err) {
          // something went wrong
          res.status(500).json({ message: err })
        } else {
          if (docs.length) {
            res.status(200).json({ message: 'Liked.' })
            // need to remove from array and decrement likes
          } else {
            res.status(404).json({message: 'Not Liked.'})
          }
        }
      })
    }
  })
}

// exports.deletepost = (req, res) => { }

exports.post = (req, res) => {
  const token = req.cookies.jwt
  jwt.verify(token, 'secret', (error, decoded) => {
    // might consider looking up id for additional security check 
    if (error) {
      // return not found 
    } else {
      // should be the id 
      let id = decoded._id 
      let newPost = new Post({
        // need to scrub content for xss attack
        content: req.body.content,
        postedBy: id 
      })
      newPost.save((err, post) => {
        if (err) {
          return res.send(err)
        } else {
          res.json(post)
        }
      })
    }
  })
}