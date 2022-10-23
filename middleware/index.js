const jwt = require('jsonwebtoken');
const moment = require('moment')
const logger = require('../logger')


const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)
    jwt.decode(req.headers.authorization)
    
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