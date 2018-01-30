let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')


let userSchema = new Schema({
      email:       { type: String, unique: true, trim: true, required: true, minlength: 3 },
      password:    { type: String, required: true },
      name:        { type: String, trim: true, required: true }, 
      location:    { type: String, default: ''},
      team:        { type: String, default: ''},
      phone:       { type: String, default: '' },
      position:    { type: String, default: '' },
      publicEmail: { type: String, default: '' },
      instagram:   { type: String, default: '' },
      facebook:    { type: String, default: '' },
      twitter:     { type: String, default: '' },
      snapchat:    { type: String, default: '' },
      bio:         { type: String, default: '' },
      created:     { type: Date, default: Date.now }
})


userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password) 
} 

module.exports = mongoose.model('User', userSchema)