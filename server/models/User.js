let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')


let userSchema = new Schema({
      email:    { type: String, unique: true, trim: true, required: true },
      password: { type: String, required: true },
      name:     { type: String, trim: true, required: true }, 
      created:  { type: Date, default: Date.now }
})


userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password) 
} 

module.exports = mongoose.model('User', userSchema)