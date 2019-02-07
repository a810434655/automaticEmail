var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer=require('nodemailer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var schedule=require("node-schedule");
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
var transport=nodemailer.createTransport({
  host:"smtp.qq.com",  //发送人邮箱类型
  secureConnection:true, //使用SSL
  auth:{
    user:"woshiwuxingxing@qq.com", //发送人邮箱
    pass:"uckiceehsdvjbfda"  //邮箱授权码
  }
})
function scheduleCronstyle(){
  schedule.scheduleJob('0 0 8 * * *', function(){
    var mailOptions={
      from:"你老公 woshiwuxingxing@qq.com",  //前面可以变成你邮件的昵称
      to:"woshiwuxingxing@qq.com",  //收件人
      subject:"祝你越来越胖", //邮件标题
      html:"<p>起床了 大笨猪<p/>", //邮件内容
    }
// 使用sendMail发送
    transport.sendMail(mailOptions,function (err,data) {
      if(err) console.log("发送失败");
      else console.log(data);
    })
  });
}
scheduleCronstyle();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
