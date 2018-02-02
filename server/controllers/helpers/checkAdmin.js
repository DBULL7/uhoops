let jwt = require('jsonwebtoken')
let log = console.log


const checkAdmin = (req, res, next) => {
  const token = req.cookies.admin
  if (token) {
    jwt.verify(token, 'supersecret', (error, decoded) => {
      if (error) {
        let err = new Error('Something Went Wrong Try To Signin Again')
        err.status = 500
        next(err)

      } else {
        next()
      }
    })
  } else {
    let err = new Error('Admin Access Only')
    err.status = 403
    next(err)
  }
}

module.exports = checkAdmin