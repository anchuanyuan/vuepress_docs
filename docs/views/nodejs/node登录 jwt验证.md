
---
title: NodeJs(Express)的用户注册、登录和授权(jwt)
date: 2020-07-05
sidebarDepth: 4
tags:
    - Node
categories:
    - NodeJs
---



2020年7月5日22:32:46

[toc]


# NodeJs(Express)的用户注册、登录和授权

来自 ==  B站全栈之巅

## 1.创建http服务器

```js
const express = require('express')
const {User} =  require('./model')

const app = express()

// 要想获得 json内容 必须要可以对json内容进行处理
app.use(express.json())

app.get('/api/users', async(req, res) => {
    const users = await User.find()
    res.send(users)
})

app.post('/api/register',async (req,res)=>{
    // console.log(req.body);
    
  const user = await  User.create({
        username:req.body.username,
        password:req.body.password
    })
     res.send(user)
})

app.listen('5000', () => {
    console.log(`http://localhost:5000`)
})

```



### Tip 关于http-client的使用(查看文末的补充)

![1593960842054](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202007/06/000640-545598.png)

## 2.连接数据库定义数据模型

```js
const mongooes = require('mongoose')

mongooes
    .connect('mongodb://localhost:27017/express-aurt', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(res => {
        console.log('连接成功')
    })
    .catch(err => {
        console.log(err)
    })
// 创建用户模型 model
const UserSchema = new mongooes.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongooes.model('User', UserSchema)

module.exports = { User }

```



## 3.获取json 请求体的中间件

```js
// 要想获得 json内容 必须要可以对json内容进行处理
app.use(express.json())
```

## 4.关于用户名作为唯一键(unique)

```js
const UserSchema = new mongooes.Schema({
    username: {
        type: String,
        unique: ture
    },
    password: {
        type: String
    }
})
//  useCreateIndex: true
```

## 5.使用bcrypt密码进行散列存储

```js
 password: {
        type: String,
        set(val){
            return require('bcrypt').hashSync(val,8)
            // 参数1:要散列的值;2:散列指数; 指数越高越安全,但是性能消耗大
        }
    }
```

## 6.登录验证

```js
app.post('/api/login', async (req, res) => {
    // console.log(req.body);

    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isValid) {
        return res.status(422).send({
            message: '密码错误'
        })
    }
    res.send({ user, token: 'token' })
})
```

## 7.生成token(jsonwebtoken)

### 登录的时候签发token

```js
app.post('/api/login', async (req, res) => {
    // console.log(req.body);

    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isValid) {
        return res.status(422).send({
            message: '密码错误'
        })
    }
    // 设置token
    const token = require('jsonwebtoken').sign({
        id:String(user._id) 
    },'jwer')
    res.send({ user, token })
})
```

### tip注意事项

签发的时候有两个参数,**第二个是属于秘钥**,应该是全局一致的存在某个不能被提交的配置文件中文件(如环境配置文件.envconfig之类的),第一个参数可用作签发加密的认证,之所以用用户的id是因为用户id肯定是唯一值,这也是最简单的方式来告诉服务端token对应的用户(后台可以用这个id可以找到该用户)

## 8.token验证

```js
app.get('/api/userInfo', async (req, res) => {
    console.log(req.headers.authorization.split(' ').pop())
    const raw = String(req.headers.authorization)
        .split(' ')
        .pop() // 确保是个字符串
    const { id } = jwt.verify(raw, SCERT)
    const user = await User.findById(id)
    res.send(user)
})
app.listen('5000', () => {
    console.log(`http://localhost:5000`)
})
```

## 9.token验证的提取,使用express中间件实现

上面验证token的代码不可能,在每一个接口里面写一遍

所以需要提取出来,这里利用中间件提取出来

**注意事项**:如何传递自定的数据user? 把定义的数据赋到req上,在下一个next里获取就行了

```js
// 定义中间件
const auth = async (req, res,next)=>{
    const raw = String(req.headers.authorization)
    .split(' ')
    .pop() // 确保是个字符串
    const { id } = jwt.verify(raw, SCERT)
    req.user = await User.findById(id)
    next()
}
```

想要完整实现肯定是 要,加入错误处理的

## 补充: 

### 关于 vscode httpclient 插件测试用例的代码

**文件名**: test.http 

```bash
# 定义请求根路由
@url=http://localhost:5000/api
@json=Content-Type: application/json
###
GET  {{url}}/users

### 注册用户
POST {{url}}/register
# Content-Type: application/json  设置请求携带的数据的类型是json 写成变量方便使用
{{json}}

{
    "username":"zs4",
    "password":"pwd"
}

### 登录
POST {{url}}/login
{{json}}

{
    "username":"zs4",
    "password":"pwd"
}
### 个人信息

GET {{url}}/userInfo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDFmYzc4YjRkNGJjNzg4NDY1YzQ5YSIsImlhdCI6MTU5NDAyMjMzMn0.egUUsXFNfNp0qtIewPgPDUty6_j3yre3NIcXnB4hV18
```

### model 模型的定义

```js
const mongooes = require('mongoose')

mongooes
    .connect('mongodb://localhost:27017/express-auth', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log('连接成功')
    })
    .catch(err => {
        console.log(err)
    })
// 创建用户模型 model
const UserSchema = new mongooes.Schema({
    username: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        set(val){
            return require('bcrypt').hashSync(val,8)
        }
    }
})

const User = mongooes.model('User', UserSchema)

module.exports = { User }

```

文章结束, 感谢B站 up主 **全站之巅 **的技术视频讲解,附上链接

[1小时搞定NodeJs(Express)的用户注册、登录和授权](https://www.bilibili.com/video/BV1Nb411j7AC/)

