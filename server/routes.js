const express = require('express')
const r = express.Router()
module.exports = r

const landing = require('./controllers/landing')
r.get('/', landing.index)


const account = require('./controllers/account')
r.get('/api/v1/account', account.get)
r.put('/api/v1/account/:id', account.put)
r.delete('/api/v1/account/:id', account.deleteaccount)
r.post('/api/v1/account', account.createAccount)
r.post('/api/v1/account/login', account.login)

const about = require('./controllers/about')
r.get('/about', about.index)

const tours = require('./controllers/tours')
r.get('/tours', tours.index)

const home = require('./controllers/home')
r.get('/home', home.index)

const camps = require('./controllers/camps')
r.get('/camps', camps.index)
r.get('/home/messaging', home.messaging)
r.get('/home/notifications', home.notifications)
r.get('/home/tours', home.tours)
r.get('/home/profile', home.profile)