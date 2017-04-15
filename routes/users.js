//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),moment(시간정보를 가져오는 모듈),request-ip(현재 접속 아이피정보를 가져오는 모듈),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const moment = require('moment');
const requestIp = require('request-ip');
const crypto = require('crypto');
const User = require('../model/user.js');

function loginCheck(){
  if(req.session.user_code!=code) res.send('<script>alert("로그인정보를 확인해주세요"); location.href="/";</script>')
}

/* GET home page. */
//user.js의 '/'로 들어오는 처리를 받을 라우터 정의
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

router.get('/:user_code',function(req,res,next){
  var code = req.params.user_code;
  //sql 정의
  var sql = 'select code,id,name,tel,DATE_FORMAT(birthday,"%Y-%m-%d") as birthday from User where code=?';
  //query를 실행하는부분 ( 첫번째 인자값에 query문, 두번째 인자값에는 '?'로 처리된 value값을 정의함)
  conn.query(sql,[code],function(err,rows,fields){
    //쿼리실행의 콜백함수 정의
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      res.render('users_modify', {
        title : 'Express',
        code : rows[0].code,
        id : rows[0].id,
        name : rows[0].name,
        tel : rows[0].tel,
        birthday : rows[0].birthday,
      });
    }
  });
});

/*POST로 들어온 처리*/
//post로 넘어온 값을 bodyParser에서 처리하여 json형식으로 넘겨줌

//회원가입처리
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
  User.findOrCreate({
    where : {
      id : id
    },
    defaults :{
      password:password,
      name:name,
      tel:tel,
      birthday:birth,
      ip:ip,
      reg_date:now,
    }
  }).spread((user,created)=>{
    console.log(user.get({
      plain: true
    }));
    if(created===true){
      res.send('<script>alert("정상적으로 가입되었습니다");location.href="/";</script>');
    }else{
      res.send('<script>alert("이미 가입된 아이디가 있습니다");location.href="/users";</script>');
    }
  });
});

//회원수정처리
router.post('/:user_code', function(req, res, next) {
  var code = req.body.code;
  var password = req.body.password;
  //password 암호화 부분
  var shasum = crypto.createHash('sha512');
  shasum.update(password);
  password = shasum.digest('hex');
  var name = req.body.name;
  var tel = req.body.tel;
  var birth = req.body.birth;
  var code = req.params.user_code;
  //sql 정의
  var sql = 'update User set password=?,name=?,tel=?,birthday=? where code=?';
  //query를 실행하는부분 ( 첫번째 인자값에 query문, 두번째 인자값에는 '?'로 처리된 value값을 정의함)
  conn.query(sql,[password,name,tel,birth,code],function(err,rows,fields){
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
