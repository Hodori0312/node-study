var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err) console.log(err);
    res.send('<script>alert("로그아웃 되었습니다"); location.href="/";</script>')
  });
});
module.exports = router;