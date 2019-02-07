var express = require('express');
var router = express.Router();
var url=require("url");
var nodemailer=require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  var email=url.parse(req.url,true).query.emailName;  //收件人
  var Title=url.parse(req.url,true).query.title; //邮件标题
  var text=url.parse(req.url,true).query.text; //邮件内容
  var content="";
  var transport=nodemailer.createTransport({
    host:"smtp.qq.com",  //发送人邮箱类型
    secureConnection:true, //使用SSL
    auth:{
      user:"woshiwuxingxing@qq.com", //发送人邮箱
      pass:"uckiceehsdvjbfda"  //邮箱授权码
    }
  })
  var mailOptions={
    from:"你老公 woshiwuxingxing@qq.com",  //前面可以变成你邮件的昵称
    to:email,  //收件人
    subject:Title, //邮件标题
    html:content, //邮件内容
  }
  // 使用sendMail发送
  transport.sendMail(mailOptions,function (err,data) {
    if(err) console.log(err)
    else console.log(data);
  })
  res.send({"msg":"成功"});
});
// 邮箱授权码：
module.exports = router;
