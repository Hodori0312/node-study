//npm 모듈 선언부분
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//라우터 선언
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

//Express 프레임워크 초기화
var app = express();

// View 엔진 정의
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//세션처리
app.use(session({
  secret : 'bWFuaWZlc3RvbWFuaWZlc3Rv',
  resave : true,
  saveUninitialized : true,
}));
// 세션을 모든 곳에서 사용 가능하도록 만든다.
app.use(function(req, res, next) {
  res.locals.user_id = req.session.user_id;
  res.locals.user_name = req.session.user_name
  next();
});

//해당 주소로 넘어오면 라우팅 파일 활성
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

// 404에러 처리부분(파일이 없을 경우)
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 에러 처리 부분
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
