const express = require('express');
// 路径处理模块
const path = require('path')
const https = require('https')
const fs = require('fs')

// 创建web服务器
const app = express();
app.use('/uploads',express.static(path.join(__dirname+ '/uploads')));

// app.get('*', (req, res) => {
//     console.log('访问者：' + req.socket.remoteAddress.slice(7) + ' :' + req.socket.remotePort);
//     res.send()
// })

// 接受81服务器传递来的
app.get('/Code', (req, res) => {
    res.send(req.query.id)
})

app.get('/login', (req, res) => {
    if (req.query.user == 'admin' && req.query.password == '123456') {
        res.json({
            title: "我真体贴",
            route: [
                {
                    path: "/demo1",
                    name: "Demo1",
                    component: 'demo1.vue'
                },
                {
                    path: "/demo2",
                    name: "Demo2",
                    component: 'demo2.vue'
                },
                {
                    path: "/demo3",
                    name: "Demo3",
                    component: 'demo3.vue'
                }
            ]
        })
    } else if(req.query.user == 'admin1' && req.query.password == '123456') {
        res.json({
            title: "我真可爱",
            route: [
                {
                    path: "/demo1",
                    name: "Demo1",
                    component: 'demo1.vue'
                },
                {
                    path: "/demo2",
                    name: "Demo2",
                    component: 'demo2.vue'
                }
            ]
        })
    } else {
        res.json({
            code:400,
            mesage:"账号密码错误",
            账号一: {user: "admin",password: 123456},
            账号二: {user: "admin1",password: 123456}
        })
    }
})

app.get('/2022.jpg', (req, res)=>{

    const ip = req.socket.remoteAddress.slice(7)
    console.log('访问者：' + ip + ' :' + req.socket.remotePort+ ` [${new Date(Date.now()).toLocaleString()}]`);
    // res.send({
    //     ip: ip,
    //     port: req.socket.remotePort
    // })
    fs.readFile('./uploads/2022.jpg', function (error, data) {
        res.writeHead('200', {'Content-Type': 'image/jpeg'});
        res.write(data,'binary')
        res.end(data,'binary')
    });

    // console.log(path.join(__dirname))
    // res.send(path.join(__dirname, 'uploads/4500089c70e9e0207e03e871b3bb5df961d1.png'))
    // res.redirect(301, 'https://matsuzaka.top:404/uploads/4500089c70e9e0207e03e871b3bb5df961d1.png');

})

let httpsOptions = {
    // https钥匙
    key: fs.readFileSync('./key/8155783_matsuzaka.top.key'),
    cert: fs.readFileSync('./key/8155783_matsuzaka.top.pem')
}
https.createServer(httpsOptions, app).listen(404);
