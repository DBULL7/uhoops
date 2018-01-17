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