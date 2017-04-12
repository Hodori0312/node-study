//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),moment(시간정보를 가져오는 모듈),request-ip(현재 접속 아이피정보를 가져오는 모듈),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const moment = require('moment');
const requestIp = require('request-ip');
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
//user.js의 '/'로 들어오는 처리를 받을 라우터 정의
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

/*POST로 들어온 처리*/
//post로 넘어온 값을 bodyParser에서 처리하여 json형식으로 넘겨줌
router.post('/', function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  //password 암호화 부분
  var shasum = crypto.createHash('sha512');
  shasum.update(password);
  password = shasum.digest('hex');
  var name = req.body.name;
  var tel = req.body.tel;
  var birth = req.body.birth;
  //현재 시간정보를 받아옴
  var now=moment().format('YYYY-MM-DD HH:mm:ss');
  //현재 접속한 ip정보를 받아옴
  var ip =requestIp.getClientIp(req);
  //sql 정의
  var sql = 'insert into User (id,password,name,tel,birthday,ip,reg_date) values (?,?,?,?,?,?,?)';
  //query를 실행하는부분 ( 첫번째 인자값에 query문, 두번째 인자값에는 '?'로 처리된 value값을 정의함)
  conn.query(sql,[id,password,name,tel,birth,ip,now],function(err,rows,fields){
    //쿼리실행의 콜백함수 정의
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      res.redirect('/');     
    }
  });
});

module.exports = router;
