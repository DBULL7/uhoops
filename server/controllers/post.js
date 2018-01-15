let Post = require('../models/Post')
let jwt = require('jsonwebtoken')
let User = require("../models/User")

exports.get = (req, res, next) => { 
  Post.find({}, (err, posts) => {
    if (err) {
      return next(err)
    } else {
      res.json(posts)
    }
  })
}
//   let


// exports.put = (req, res) => { }

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