const jwt = require('jsonwebtoken');
const logger = require('../logger')


const verifyToken = (req, res, next) => {
  try {
    const token = jwt.decode(req.headers.authorization)
    req.userId = token.userId
    
    return next();

  } catch (err) {
    
    logger.error(`verifyToken error ${JSON.stringify(err.message)}`)
    
    return res.status(401).json({
      code: 401,
      message: "Token is not valid"
    })
  }
}

module.exports = verifyToken;