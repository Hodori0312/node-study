//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('attendance', { title: 'Express' });
});

module.exports = router;