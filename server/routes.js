const express = require('express')
const r = express.Router()
module.exports = r

const home = require('./controllers/home')
r.get('/', home.index)


const account = require('./controllers/account')
r.get('/api/v1/account', account.get)
r.put('/api/v1/account/:id', account.put)
r.delete('/api/v1/account/:id', account.deleteaccount)
r.post('/api/v1/account', account.createAccount)
r.post('/api/v1/account/login', account.login)

const about = require('./controllers/about')
r.get('/about', about.index)