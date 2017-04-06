const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const aes256 = require('aes256');
const moment = require('moment');
const requestIp = require('request-ip');
const db_config  = require('../db-config.json');

//aes암호화 알고리즘
const key = 'passwordmaking';
const cipher = aes256.createCipher(key);

var conn = mysql.createConnection({
  port     : db_config.port,
  host     : db_config.host,
  user     : db_config.user,
  password : db_config.password,
  database : db_config.database,
});

conn.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

/*POST로 들어온 처리*/
router.post('/', function(req, res, next) {
  var id = req.body.id;
  var password = cipher.encrypt(req.body.password);
  var name = req.body.name;
  var tel = req.body.tel;
  var birth = req.body.birth;
  var now=moment().format('YYYY-MM-DD HH:mm:ss');
  var ip =requestIp.getClientIp(req);
  var sql = 'insert into User (id,password,name,tel,birthday,ip,reg_date) values (?,?,?,?,?,?,?)';
  conn.query(sql,[id,password,name,tel,birth,ip,now],function(err,rows,fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      res.redirect('/');     
    }
  });
});

module.exports = router;
