const express = require('express')
const r = express.Router()
module.exports = r
let checkAuth = require('./controllers/helpers/checkAuth')
const landing = require('./controllers/landing')
r.get('/', landing.index)


const account = require('./controllers/account')
r.get('/api/v1/account', account.get)
r.put('/api/v1/account/:id', account.put)
// r.delete('/api/v1/account/:id', account.deleteaccount)
r.post('/api/v1/account', account.createAccount)
r.post('/api/v1/account/login', account.login)


const about = require('./controllers/about')
r.get('/about', about.index)

const tours = require('./controllers/tours')
r.get('/tours', tours.index)

const home = require('./controllers/home')
r.get('/home', checkAuth, home.index)
r.get('/home/messaging', checkAuth, home.messaging)
r.get('/home/notifications', checkAuth, home.notifications)
r.get('/home/tours', checkAuth, home.tours)
r.get('/home/profile', checkAuth, home.profile)


const camps = require('./controllers/camps')
r.get('/camps', camps.index)

r.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.redirect('/')
})