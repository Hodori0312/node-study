//이 페이지에서 사용할 모듈정의
//mysql,Crypto(암호화),moment(시간정보를 가져오는 모듈),request-ip(현재 접속 아이피정보를 가져오는 모듈),db정보를 담아두는 모듈
const express = require('express');
const router = express.Router();
const moment = require('moment');
const requestIp = require('request-ip');
const crypto = require('crypto');
const models = require('../models');

/* GET home page. */
//user.js의 '/'로 들어오는 처리를 받을 라우터 정의
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

router.get('/:user_code',function(req,res,next){
  var IDX = req.params.user_code;
  if(!req.session.user_code || req.session.user_code!=IDX) res.send('<script>alert("로그인정보를 확인해주세요"); location.href="/";</script>');
  models.user.findById(IDX).then(
    (result)=>{
      console.log(result);
      console.log(result.dataValues);
      var data=result.dataValues;
      res.render('users_modify', {
        title : 'Express',
        code : data.idx,
        id : data.id,
        name : data.name,
        tel : data.tel,
        birthday : moment(data.BIRTH).format("YYYY-MM-DD"),
      });
    },
    (reject)=>{
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  )
});

/*POST로 들어온 처리*/
//post로 넘어온 값을 bodyParser에서 처리하여 json형식으로 넘겨줌

//회원가입처리
router.post('/', function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  //password 암호화 부분
  var shasum = crypto.createHash('sha256');
  shasum.update(password);
  password = shasum.digest('hex');
  var name = req.body.name;
  var tel = req.body.tel;
  var birth = req.body.birth;
  var ip = requestIp.getClientIp(req);
  //현재 시간정보를 받아옴
  var now=moment().format('YYYY-MM-DD HH:mm:ss');
  models.user.findOrCreate({
    where : {
      id : id
    },
    defaults :{
      pass:password,
      name:name,
      tel:tel,
      birth:birth,
      reg_date:now,
      ip : ip,
    }
  }).all().then((result)=>{
    if(result[1]===true){
      res.send('<script>alert("정상적으로 가입되었습니다");location.href="/";</script>');
    }else{
      res.send('<script>alert("이미 가입된 아이디가 있습니다");location.href="/users";</script>');
    }
  },
  (reject)=>{
    res.status(500).send('Internal Server Error');
    console.log(reject);
  }
  );
});

//회원수정처리
router.post('/:user_code', function(req, res, next) {
  var IDX = req.params.user_code;
  if(!req.session.user_code || req.session.user_code!=IDX) res.send('<script>alert("로그인정보를 확인해주세요"); location.href="/";</script>');
  var password = req.body.password;
  //password 암호화 부분
  var shasum = crypto.createHash('sha256');
  shasum.update(password);
  password = shasum.digest('hex');
  var name = req.body.name;
  var tel = req.body.tel;
  var birth = req.body.birth;
  var code = req.params.user_code;
  models.user.update({
    pass : password,
    name : name,
    tel : tel,
    birth : birth,
  },{
    where :{
      idx : code
    }
  }
  ).then((count,rows)=>{
    if(count>0){
      res.send('<script>alert("회원정보수정이 완료되었습니다"); location.href="/users/'+code+'";</script>');
    }else{
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

module.exports = router;
