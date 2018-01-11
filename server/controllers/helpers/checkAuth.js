let jwt = require('jsonwebtoken')
let log = console.log 


const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt
  log(req.cookies)
  log(token)
  if (token) {
    jwt.verify(token, 'secret', (error, decoded) => {
      if (error) {
        return res.status(403).send({
          success: false,
          message: 'Invalid authorization token.'
        })
      }
      else {
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'You must be authorized to hit this endpoint'
    })
  }
}

module.exports = checkAuth