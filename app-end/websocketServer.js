const express = require('express');
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const ws = require('ws')

// 配置body
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 创建web服务器
const app = express();

// 创建https服务
// let server = https.createServer({
//     // https钥匙
//     key: fs.readFileSync('./key/8155783_matsuzaka.top.key'),
//     cert: fs.readFileSync('./key/8155783_matsuzaka.top.pem')
// })
// 创建 https wws
// let wss = new ws.WebSocketServer({ server });

// 创建 http wws，端口为1000
let wss = new ws.WebSocketServer({ port: 1000 });

// 暴露wss，直接给app执行开启
wss.on("connection", (connection) => {
  // 处理客户端发送过来的消息
  connection.on("close", function (code, reason) {
    // console.log("有人关闭");
  });

  connection.on("message", function (connectionData, reason) {
    // 如果没有cookie，就给他返回一个新cookie
    let cookie = Math.random().toString(36).slice(2)
    if (!JSON.parse(connectionData).userCookie) {
      // 发生一个消息给用户(cookie)
      connection.send(JSON.stringify({ userCookie: cookie }));
    }

    // 禁言
    if(JSON.parse(connectionData).userCookie === '') return connection.send(JSON.stringify({
        userMsgInfo: '发送失败，已被禁言',
        userMsgDate: Date.now(),
        userCookie: '系统系统系统系统系统'
    }))

    // 空消息不处理
    if(JSON.parse(connectionData).userMsg.trim() === '') return
    // 把新消息写入文件中
    var userCookie = JSON.parse(connectionData).userCookie;
    fs.readFile("data/userMsgInfos.json", "utf8", function (err, data) {
      let arr = JSON.parse(data);
      let obj = {
        userImg: "/userImg.png",
        userMsgInfo: JSON.parse(connectionData).userMsg,
        userMsgDate: Date.now(),
        userCookie: userCookie || cookie,
        type: JSON.parse(connectionData).type,
      };
      arr.push(obj);

      // 写文件
      let newArr = JSON.stringify(arr);
      fs.writeFile("data/userMsgInfos.json", newArr, "utf8", (err) => {
        // 把这个内容返回给用户
        // connection.sendText(JSON.stringify(obj));

        // 成功后给每一个用户发一条消息
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(obj));
            }
        });
      });
    });
  });

  //监听异常
  connection.on("error", (err) => {
    console.log(err);
    console.log("-----------------------------------");
  });

  // 监听data事件
  connection.on("data", (data) => {
    console.log(data);
    console.log("即将杀死客户端");
  });
});

// https 时调用  执行websocket处理连接方法
// server.listen(9999);
// https.createServer(httpsOptions, app).listen(1000);

