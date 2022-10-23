const express = require('express');
const router = express.Router();
const tbAccount = require('../db/account'); 
const logger = require('../logger');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/index');
const bcrypt = require('bcrypt')
const Sequelize = require("sequelize");

router.post('/join', async function (req, res, next) {

  try {
    const account = { ...req.body.account }

    await tbAccount.create({
      id: account.id,
      password: bcrypt.hashSync(account.password, 10),
      name: account.name,
      isAdmin: account.isAdmin
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

    res.status(500).json({
      message: message
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
      res.status(200).json({ code: 200, token, isAdmin: result.isAdmin })
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

router.get('/list', verifyToken, async function (req, res, next) {

  try {
    
    const result = await counseling.findAll({
      order: [
        ['idx', 'DESC']
      ]
    })

    res.status(200).json({
      code: 200,
      data: result,
    });
    
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    });
  }
});

router.post('/create', async function (req, res, next) {
  try {
    
    await counseling.create(req.body)
    
    res.status(200).json({
      code: 200,
      message: 'success',
    });
    
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
});
router.post('/delete', verifyToken, async function (req, res, next) {

  try {

    const result = await counseling.destroy({
      where: {
        idx: req.body
      }
    })
    
    if (result) {
      res.status(200).json({
        code: 200,
        message: "success",
      });
    } else {
      res.status(200).json({
        code: 400,
        message: "fail",
      });
    }

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
});

module.exports = router;
