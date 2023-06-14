const jwt = require('jsonwebtoken')

const secretKey = process.ENV.JWT_SECRET_KEY

function generateToken (payload) {
  return jwt.sign(payload, secretKey)
}

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = {
  generateToken,
  verifyToken
}
