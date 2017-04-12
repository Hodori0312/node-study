//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db_config  = require('../db-config.json');
const crypto = require('crypto');

//mysql 연결정보 저장
var conn = mysql.createConnection({
  port     : db_config.port,
  host     : db_config.host,
  user     : db_config.user,
  password : db_config.password,
  database : db_config.database,
});

//mysql 연결처리
conn.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST로 들어온 처리(로그인처리)*/
//post로 넘어온 값을 bodyParser에서 처리하여 json형식으로 넘겨줌
router.post('/login', function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var shasum = crypto.createHash('sha512');
  shasum.update(password);
  password = shasum.digest('hex');
  //sql 정의
  var sql = 'select code,count(*) as cnt from User where id=? and password=?';
  //query를 실행하는부분 ( 첫번째 인자값에 query문, 두번째 인자값에는 '?'로 처리된 value값을 정의함)
  conn.query(sql,[id,password],function(err,rows,fields){
    //쿼리실행의 콜백함수 정의
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      var cnt=rows[0].cnt;
      if(cnt==1){
        req.session.user_id=id;
        req.session.user_code=rows[0].code;
        res.send('<script>alert("정상적으로 로그인 되었습니다");location.href="/";</script>');
      }else{
        res.send('<script>alert("아이디나 비밀번호가 틀립니다");return false;</script>');
      }
    }
  });
});

/* 로그아웃 처리 */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err) console.log(err);
    res.send('<script>alert("로그아웃 되었습니다"); location.href="/";</script>')
  });
});

module.exports = router;

module.exports = router;
