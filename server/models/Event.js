let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let eventSchema = new Schema({
      name:     { type: String, required: true },
      location: { type: String, required: true },
      cost:     { type: Number, required: true },
      date:     { type: String },
      players:  [{
            player: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
            }
      }]

})

module.exports = mongoose.model('Event', eventSchema)