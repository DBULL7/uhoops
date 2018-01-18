let Post = require('../models/Post')
let jwt = require('jsonwebtoken')
let User = require("../models/User")

exports.get = (req, res, next) => { 
  Post.find()
    .populate('postedBy', 'name')
    .populate('comments.postedBy', 'name _id')
    .exec((err, results) => {
    if (err) {
      return next(err)
    } else {
      res.json(results)
    }
  })
}


exports.like = (req, res) => { 
  let token = req.cookies.jwt 
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      
    } else {
      let userID = decoded._id 
      Post.find({ _id: req.body.post, likedBy: { $in: [userID] }}, (err, docs) => {
        if (err) {
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
          res.status(500).json({ message: err })
        } else {
          if (docs.length) {
            res.status(200).json({ message: 'Liked.' })
          } else {
            res.status(404).json({ message: 'Not Liked.'})
          }
        }
      })
    }
  })
}


exports.commentStatus = (req, res) => {
  let token = req.cookies.jwt
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Not logged in.' })
    } else {
      let userID = decoded._id 
      Post.find({ _id: req.params.id }, {'comments.postedBy': userID }, (err, doc) => {
        if (err) {
          res.status(500).json({ message: err })
        } else {
          if (doc[0].comments.length) {
            res.status(200).json({ message : 'Commented.' })
          } else {
            res.json({ message : 'No Comment.' })
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


exports.comment = (req, res) => {
  const token = req.cookies.jwt 
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Not authorized' })
    } else {
      let id = decoded._id 
      let comment = { postedBy: id, content: req.body.comment }
      Post.findByIdAndUpdate(
        req.body.id, 
        { $push: { comments: comment }},
        { new: true },
        (err, results) => {
          if (err) console.log(err, 'this is the err')
          if (err) return res.status(404).json({ message: 'Post not found.'})
          res.json(results)
        } 
      )
    }
  })
}