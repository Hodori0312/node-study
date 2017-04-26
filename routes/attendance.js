//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const moment = require('moment');
const models = require('../models');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('attendance', {
    title: 'Express'
  });
});

router.post('/', function (req, res, next) {
  var today = moment().format('YYYY-MM-DD');
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  var user_code = req.session.user_code;
  var memo = req.body.memo;
  console.log(now);
  console.log(memo);
  models.attendance.findOrCreate({
    where: {
      date: today,
      idx: user_code
    },
    default: {
      idx: user_code,
      date: today,
      memo: memo,
      submit_date: now,
    }
  }).spread(
    (attendance, created) => {
      if (created) {
        res.send("<script>alert('출석이 완료되었습니다 ^__^'); location.href='/attendance';</script>");
      } else {
        res.send("<script>alert('오늘은 이미 출석하셨습니다 내일 또봐요 >__<'); location.href='/attendance';</script>");
      }
    });
});
module.exports = router;