const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (juror) => {
  const payload = {
    BadgeNumber: juror.BadgeNumber,
    PinCode: juror.PinCode
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.body.BadgeNumber = decoded.BadgeNumber // Store the decoded token in the request object
    next() // Call the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = {
  generateToken,
  verifyToken
}
