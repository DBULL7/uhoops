let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
let bcrypt = require('bcrypt')

let adminSchema = new Schema({
      username: String,
      password: String
})

adminSchema.methods.comparePassword = function (password) {
      return bcrypt.compareSync(password, this.password)
} 

module.exports = mongoose.model('Admin', adminSchema)