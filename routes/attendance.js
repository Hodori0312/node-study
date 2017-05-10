//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const moment = require('moment');
const models = require('../models');
const imgur_config = require('../imgur-config.json');
const imgur = require('imgur');
const fs = require("fs");
const multer = require('multer');
const upload =  multer();

/* GET home page. */
router.get('/:date?', function (req, res, next) {
  if(req.params.date){
    var today = req.params.date;
  }else{
    var today = moment().format('YYYY-MM-DD');
  }
  models.user.findAndCountAll({
    attributes : ['name',],
    include : {
      model : models.attendance,
      where : {
        date : today,
      },
    },
    order: 'idx DESC'
  }).then((result)=>{
    res.render('attendance',{
      contents : result.rows,
      count : result.count,
      moment : moment,
      date : today,
    });
  });
});

router.post('/', upload.single('image'), function (req, res, next) {
  if(!req.session.user_code) res.send('<script>alert("로그인후 이용해주세요"); location.href="/";</script>');
  var today = moment().format('YYYY-MM-DD');
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  var user_code = req.session.user_code;
  var memo = req.body.memo;
  var image = req.file.buffer.toString('base64');
  imgur.setCredentials(imgur_config.imgur_id, imgur_config.imgur_pwd, imgur_config.imgur_token);
  imgur.uploadBase64(image)
    .then(function (json) {
        console.log(json.data);
        models.attendance.findOrCreate({
        where : {
          date: today,
          idx: user_code,
        },
        defaults :{
          memo: memo,
          file_name : json.data.link,
          delete_hash : json.data.deletehash,
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
    })
    .catch(function (err) {
        console.error(err.message);
    });
});
module.exports = router;