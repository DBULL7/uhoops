const express = require('express')
const r = express.Router()
module.exports = r
let checkAuth = require('./controllers/helpers/checkAuth')
const landing = require('./controllers/landing')
r.get('/', landing.index)


const account = require('./controllers/account')
r.get('/api/v1/account', account.get)
r.patch('/api/v1/account/', account.patch)
// r.delete('/api/v1/account/:id', account.deleteaccount)
r.post('/api/v1/account', account.createAccount)
r.post('/api/v1/account/login', account.login)
r.get('/api/v1/account/:id', account.profile)


const about = require('./controllers/about')
r.get('/about', about.index)

const tours = require('./controllers/tours')
r.get('/tours', tours.index)

const home = require('./controllers/home')
r.get('/events', checkAuth, home.index)
r.get('/profile', checkAuth, home.index)
r.get('/settings', checkAuth, home.index)
r.get('/user/:id', checkAuth, (req, res) => {
  res.redirect('/')
})


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
r.delete('/api/v1/post/:id', post.deletepost)
r.post('/api/v1/post', post.post)
r.post('/api/v1/comment', post.comment)
r.get('/api/v1/comment/:id', post.commentStatus)
r.get('/api/v1/user/posts/:id', post.userPosts)

const user = require('./controllers/user')
r.get('/api/v1/user', user.get)
r.put('/api/v1/user/:id', user.put)
r.delete('/api/v1/user/:id', user.deleteuser)
r.post('/api/v1/user', user.post)



r.get('/admin/dashboard', admin.dashboard)


r.get('/api/v1/admin', admin.get)
r.put('/api/v1/admin/:id', admin.put)
r.delete('/api/v1/admin/:id', admin.deleteadmin)
r.post('/api/v1/admin', admin.post)
