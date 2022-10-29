
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const history = require('connect-history-api-fallback');
const formidable = require('formidable');
const FormData = require('form-data');
const axios = require('axios')
const https = require("https");
const app = express()

// 执行ws聊天模块
require('./websocketServer.js')

// 用于处理vue history模式路由下的刷新问题
app.use(history({
  // 如果是该连接，则不跳转
  rewrites: [
    { from: /\/ip/, to: '/ip'},
    { from: /\/actionsCode/, to: '/actionsCode'},
    { from: /\/toutiao/, to: '/toutiao'},
    { from: /\/backstage/, to: '/backstage'},
    { from: /\/sugrec/, to: '/sugrec'},
  ]
}))

// 开放html目录
app.use(express.static(path.join(__dirname+ '/views/html')));

// 开放uploads目录
app.use('/uploads', express.static(path.join(__dirname+ '/uploads')));
const jsonParser = bodyParser.json()


// 设置跨域
// app.all("*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
//     res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
//     if (req.method.toLowerCase() == 'options')
//         res.send(200); //让options尝试请求快速结束
//     else
//         next();
// });


// 词联想的接口
app.get('/sugrec', async (req,res)=>{
    const resovle = await axios({
        url: `https://suggestion.baidu.com/su?p=3&ie=UTF-8&cb=`,
        params:{
           wd: req.query.wd
        }
    })
    res.send(resovle.data)
})

// 上传文件
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm()
    // 保留上传文件的后缀名
    form.keepExtensions = true;

    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        if (Object.keys(files).length !== 0) {
            var ran = Math.floor(Math.random()*10000) // 4位随机数
            //旧的路径
            var oldpath = files.file.filepath;
            //新的路径
            var newpath = __dirname + '/uploads/'+ran+files.file.originalFilename;
            //改文件名
            fs.rename(oldpath,newpath,function (err) {
                if(err) console.log('改名失败', err)
            });
            res.send({
                fileName:files.file.originalFilename,
                ran
            })
        } else {
            return;
        }
    })

})

// 搜索文件，返回对应的文件
app.get('/search',(req,res)=>{
const dir = path.join(__dirname, 'uploads')
const files = fs.readdirSync(dir)
    // 如果传过来的是空串，那么不反悔
    if(req.query.name==false) {
        res.send(['您还未输入任何内容'])
        return;
    }
    let datas = files.filter((item)=>{
        return item.indexOf(req.query.name) > -1 
    })
    res.send(datas.length == 0 ? ['未搜索到任何内容'] : datas)
})

let code = null
// 发送删除文件的请求给82服务器，并且携带一个验证码
app.get('/actionsCode',(req,res)=>{
    if(req.query.code == '123456'){
        code = Math.random().toString(36).slice(2)
        res.redirect(302, 'https://matsuzaka.top:404/Code?id='+ code);
    } else {
        res.send('验证失败')
    }
})

// 删除文件，验证码需要提前访问： http://xxx:404Code?id=123456 获取 (140行)
app.post('/del',jsonParser , (req, res) => {
    if(req.body.Code == code){
        const dir = path.join(__dirname, 'uploads/') + req.body.FileName
        fs.rm(dir,function(err){
            if(err){
                res.send('没有找到该文件，删除失败')
            } else {
                console.log('删除了' + req.body.FileName)
                res.send('删除成功啦')
            }
        })
    } else {
        res.send('权限不够')
    }
})

// 聊天室第一次获取整体信息
app.post('/getMsgInfo', jsonParser,(req,res)=>{
    fs.stat('data/userMsgInfos.json',function(err,stats){
        fs.readFile('data/userMsgInfos.json', 'utf8', function (err, data) {
            res.send(data)
        })
    })
})


// 首页的获取数据
app.post('/getNetwork', jsonParser,(req,res)=>{
    fs.stat('data/network.json',function(err,stats){
        fs.readFile('data/network.json', 'utf8', function (err, data) {
            res.send(data)
        })
    })
})

// 设置中的测试接口
app.post('/ApiTest', jsonParser,async (req,res)=>{
    console.log(`[${new Date(Date.now()).toLocaleString()}] 请求了==> `, req.body)
    console.log('--------------------------------')
    try {
        const {url, method, params, data, fromData} = req.body.options 
        let options = {
              url: url || "http://matsuzaka.top:404/login",
              method: method || "GET"
        }
        
        if(fromData){
            const f = new FormData();
            for (const key in data) {
               f.append(key, data[key]);
            }
            if(method == 'GET' || method == '') {
                options.params = f
            } else if(req.body.options.method == 'POST') {
                options.data = f
            } else if(req.body.options.method == 'PUT') {
                options.data = f
            } else if (req.body.options.method == "DELETE") {
                options.params = f
            }
            var resovle = await axios(options)
            res.send(JSON.stringify(resovle.data))
        } else {
            if(method == 'GET' || method == '') {
                options.params = params
            } else if(req.body.options.method == 'POST') {
                options.data = params
            } else if(req.body.options.method == 'PUT') {
                options.data = params
            } else if (req.body.options.method == "DELETE") {
                options.params = params
            }
            var resovle = await axios(options)
            res.send(JSON.stringify(resovle.data))
        }
        
    } catch(err){
        console.log('error==> ', err.message)
    }
})

// http开启端口
app.listen(80, () => {
    console.log('127.0.0.1开启')
})

// 如果服务器链接是 https协议的，需引入专门的key
// const httpsOptions = {
//     key: fs.readFileSync('./key/8155783_matsuzaka.top.key'),
//     cert: fs.readFileSync('./key/8155783_matsuzaka.top.pem')
// };
// https.createServer(httpsOptions, app).listen(443);
