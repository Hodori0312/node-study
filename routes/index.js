//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../model/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST로 들어온 처리(로그인처리)*/
//post로 넘어온 값을 bodyParser에서 처리하여 json형식으로 넘겨줌
router.post('/login', function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var shasum = crypto.createHash('sha256');
  shasum.update(password);
  password = shasum.digest('hex');
  User.findAndCount({
    where : {
      id : id,
      password : password
    }
  }).then((result)=>{
    console.log(result.count);
    if(result.count>0){
      req.session.user_id=id;
      req.session.user_code=result.rows[0].code;
      res.send('<script>alert("정상적으로 로그인 되었습니다");location.href="/";</script>');
    }else if(result.count==0){
      res.send('<script>alert("아이디나 비밀번호가 틀립니다");location.href="/";</script>');
    }
  },
    (err)=>{
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  );
});

/* 로그아웃 처리 */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err) console.log(err);
    res.send('<script>alert("로그아웃 되었습니다"); location.href="/";</script>');
  });
});

module.exports = router;