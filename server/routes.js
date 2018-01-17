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
r.get('/messaging', checkAuth, home.messaging)
r.get('/tours', checkAuth, home.tours)
r.get('/profile', checkAuth, home.profile)


const camps = require('./controllers/camps')
r.get('/camps', camps.index)

r.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.redirect('/')
})

const admin = require('./controllers/admin')
r.get('/admin', admin.index)

const pro_combine = require('./controllers/pro_combine')
r.get('/pro_combine', pro_combine.index)

const college_prep = require('./controllers/college_prep')
r.get('/college_prep', college_prep.index)

const curriculum_k8 = require('./controllers/curriculum_k8')
r.get('/curriculum_k8', curriculum_k8.index)

const development_league = require('./controllers/development_league')
r.get('/development_league', development_league.index)

const post = require('./controllers/post')
r.get('/api/v1/post', post.get)
r.put('/api/v1/post', post.like)
r.get('/api/v1/post/:id', post.likeStatus)
// r.delete('/api/v1/post/:id', post.deletepost)
r.post('/api/v1/post', post.post)
