let jwt = require('jsonwebtoken')



exports.get = (req, res) => { 
  let token = req.cookies.jwt 
  jwt.verify(token, 'secret', (error, decoded) => {
    if (error) {
      res.status(500).send(error) 
    } else {
      let { _id, name, email } = decoded 
      res.status(200).json({ id: _id, name: name, email: email })
    }
  })
}

exports.put = (req, res) => { }

exports.deleteuser = (req, res) => { }

exports.post = (req, res) => { }