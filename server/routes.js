const express = require('express')
const r = express.Router()
module.exports = r
let checkAuth = require('./controllers/helpers/checkAuth')
let checkAdmin = require('./controllers/helpers/checkAdmin')

const landing = require('./controllers/landing')
r.get('/', landing.index)


const account = require('./controllers/account')
r.get('/api/v1/account', account.get)
r.patch('/api/v1/account/', account.patch)
r.delete('/api/v1/account/:id', account.deleteaccount)
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
r.get('/user/:id', checkAuth, home.index)


const camps = require('./controllers/camps')
r.get('/camps', camps.index)

r.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.redirect('/')
})

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
// delete comment 
// report post
r.patch('/api/v1/post/:id', post.reportPost)
// report comment 

const user = require('./controllers/user')
r.get('/api/v1/user', user.get)
r.put('/api/v1/user/:id', user.put)
r.delete('/api/v1/user/:id', user.deleteuser)
r.post('/api/v1/user', user.post)

const admin = require('./controllers/admin')
r.get('/admin', admin.index)
r.get('/admin/dashboard', checkAdmin, admin.dashboard)
r.post('/api/v1/admin/login', admin.login)
r.post('/api/v1/admin', admin.create)
r.patch('/api/v1/admin/post/:id', checkAdmin, admin.dismissReport)
r.delete('/api/v1/admin/post/:id', checkAdmin, admin.deletePost)

const event = require('./controllers/event')
r.get('/api/v1/event', event.get)
r.patch('/api/v1/event', event.patch)
r.put('/api/v1/event', event.put)
r.delete('/api/v1/event/:id', event.deleteevent)
r.post('/api/v1/event', checkAdmin, event.post)
r.patch('/api/v1/event/:id', event.removePlayerByAdmin)

r.get('/admin/dashboard/event/:id', checkAdmin, admin.event)
r.get('/admin/logout', (req, res) => {
  res.clearCookie('admin')
  res.redirect('/') 
})