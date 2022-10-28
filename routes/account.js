const express = require('express');
const router = express.Router();
const tbAccount = require('../db/account'); 
const logger = require('../logger');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/index');
const bcrypt = require('bcrypt')
const Sequelize = require("sequelize");

router.post('/create', verifyToken, async function (req, res, next) {

  try {
    await tbAccount.create({
      id: req.body.id,
      password: bcrypt.hashSync('eoqnwndro1!', 10),
      name: req.body.name
    })
    
    res.status(200).json({
      code: 200,
      message: '추가되었습니다.'
    })
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    var message = err.message;
    if(err instanceof Sequelize.UniqueConstraintError) {
      message = '이미 존재하는 아이디입니다.'
    }

    res.status(200).json({
      message: message
    })
  }
});

router.post('/delete', verifyToken, async function (req, res, next) {

  try {
    const result = await tbAccount.destroy({
      where: {
        id: req.body.id,
      }
    })

    if(result) {
      res.status(200).json({
        code: 200,
        message: '삭제되었습니다.'
      })  
    }else {
      res.status(200).json({
        code: 400,
        message: '삭제 실패'
      })  
    }    
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
});

router.post('/login', async function (req, res)  {
  try {
    const result = await tbAccount.findOne({
      where: {id: req.body.userId}
    })
    
    if(result && bcrypt.compareSync(req.body.password, result.password)) {
      const token = jwt.sign({
        userId: req.body.userId,
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
        issuer: process.env.JWT_ISSUER,
      });
      res.status(200).json({ code: 200, token, id: result.id, grade: result.grade })
    }else {
      res.status(200).json({ code: 400, message: '아이디 또는 비밀번호를 확인해주세요.' })
    }
    
  }  
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

router.get('/detail', verifyToken, async function (req, res)  {
  try {
    const result = await tbAccount.findOne( {
      attributes: ['id', 'name', 'password'] ,
      where: {id: req.userId}
    })
    
    if(result) {
      res.status(200).json({ code: 200, result })
    }else {
      new Error('User Not Found')
    }
  }  
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

router.get('/detail/all', verifyToken, async function (req, res)  {
  try {
    const result = await tbAccount.findAll( {
      attributes: ['id', 'name', 'grade', 'createdAt'] 
    })
    
    if(result) {
      res.status(200).json({ code: 200, result })
    }
  }  
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/update/password', verifyToken, async function (req, res)  {
  try {
    const result = await tbAccount.update({
      password: bcrypt.hashSync(req.body.password, 10)
      // password: req.body.password
    }, { where: {
      id: req.body.id
    }})
    
    if(result && result[0] > 0) {
      res.status(200).json({ code: 200 })
    }else {
      new Error('Failed to update password')
    }
  }  
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/update/grade', verifyToken, async function (req, res)  {
  try {
    console.log(req.body)
    const result = await tbAccount.update({
      grade: req.body.grade
    }, { where: {
      id: req.body.id
    }})
    
    if(result && result[0] > 0) {
      res.status(200).json({ code: 200 })
    }else {
      new Error('Failed to update grade')
    }
  }  
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

module.exports = router;
