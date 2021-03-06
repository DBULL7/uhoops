let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let postSchema = new Schema({
      content: String,
      postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
      },
      likes: { type: Number, default: 0 },
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
      comments: [{
            content: String,
            postedBy: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
            }
      }],
      postedAt: { type: Date, default: Date.now },
      reported: { type: Boolean, default: false } 
})

module.exports = mongoose.model('Post', postSchema)