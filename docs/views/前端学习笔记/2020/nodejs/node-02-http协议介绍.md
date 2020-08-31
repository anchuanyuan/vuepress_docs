---
title: Node02-请求响应原理及HTTP协议
date: 2020-01-11
sidebarDepth: 5
tags:
    - Node
categories:
    - NodeJs
---
# 请求响应原理及HTTP协议

## 服务器端基础概念

### 1.1 网站的组成

网站应用程序主要分为两大部分：客户端和服务器端。

客户端：在浏览器中运行的部分，就是用户看到并与之交互的界面程序。使用HTML、CSS、JavaScript构建。

服务器端：在服务器中运行的部分，负责存储数据和处理应用逻辑。

![](./media/node02-2.png)![](./media/node02-1.jpg)



### 1.2 Node 网站服务器

能够提供网站访问服务的机器就是网站服务器，它能够接收客户端的请求，能够对请求做出响应。

![](./media/node02-3.png)

### 1.3 IP地址

互联网中设备的唯一标识。

IP是 Internet Protocol Address 的简写，代表互联网协议地址

![](./media/node02-4.png)

### 1.4 域名

由于IP地址难于记忆，所以产生了域名的概念，所谓域名就是平时上网所使用的网址。

http://www.itheima.com  =>  http://124.165.219.100/

虽然在地址栏中输入的是网址, 但是最终还是会将域名转换为ip 才能访问到指定的网站服务器



### 1.5 端口

使用端口区分不同的服务，它是一些具有一定范围的数字, 范围是0到65535, 每一个向外界提供服务的软件, 都要占用一个端口

![](./media/node02-5.png)



### 1.6 URL

统一资源定位符，又叫URL（Uniform
Resource Locator），是专为标识Internet网上资源位置而设的一种编址方式，我们平时所说的网页地址指的是URL。

URL的组成

传输协议://服务器IP或域名:端口/资源所在位置标识

http：超文本传输协议，提供了一种发布和接收HTML页面的方法。



### 1.7 开发过程中客户端和服务器端说明

在开发阶段，客户端和服务器端使用同一台电脑，即开发人员电脑。



## 创建web服务器

```js
  // 引用系统模块
 const http = require('http');
  // 创建web服务器
 const app = http.createServer();
  // 当客户端发送请求的时候
 app.on('request', (req, res) => {
        //  响应
       res.end('<h1>hi, user</h1>');
 });
  // 监听3000端口
 app.listen(3000);
 console.log('服务器已启动，监听3000端口，请访问 localhost:3000')

```



## HTTP 协议

### 3.1 HTTP协议的概念

超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）规定了如何从网站服务器传输超文本到本地浏览器，它基于客户端服务器架构工作，是客户端（用户）和服务器端（网站）请求和应答的标准。

![](./media/node02-6.png)



### 3.2 报文

在HTTP请求和响应的过程中传递的数据块就叫报文，包括要传送的数据和一些附加信息，并且要遵守规定好的格式。

![](./media/node02-7.png)



### 3.3 请求报文



1. 请求方式 （Request Method）

   1. get 请求数据
   2. post 发送数据

2. 请求地址 （Request URL）

   ```js
    app.on('request', (req, res) => {
        req.headers  // 获取请求报文
        req.url      // 获取请求地址
        req.method   // 获取请求方法
    });

   ```

   

### 3.4 响应报文

1. HTTP 状态码

   200 请求成功

   404 请求的资源没有被找到

   500 服务器端错误

   400 客户端请求有语法错误

2. 内容类型

   text/html

   text/css

   application/javascript

   image/jpeg

   application/json

```js
 app.on('request', (req, res) => {
     // 设置响应报文
     res.writeHead(200, {         'Content-Type': 'text/html;charset=utf8‘
     });
 });

```



## HTTP请求与响应处理

### 4.1 请求参数

客户端向服务器端发送请求时，有时需要携带一些客户信息，客户信息需要通过请求参数的形式传递到服务器端，比如登录操作。

![](./media/node02-8.png)



### 4.2 Get请求参数

参数被放置在浏览器地址栏中，例如：http://localhost:3000/?name=zhangsan&age=20

参数获取需要借助系统模块url，url模块用来处理url地址

```js
 const http = require('http');
 // 导入url系统模块 用于处理url地址
 const url = require('url');
 const app = http.createServer();
 app.on('request', (req, res) => {
     // 将url路径的各个部分解析出来并返回对象
         // true 代表将参数解析为对象格式
     let {query} = url.parse(req.url, true);
     console.log(query);
 });
 app.listen(3000);

```



### 4.3 POST 请求参数

参数被放置在请求体中进行传输

获取POST参数需要使用data事件和end事件

使用querystring系统模块将参数转换为对象格式

```js
 // 导入系统模块querystring 用于将HTTP参数转换为对象格式
 const querystring = require('querystring');
 app.on('request', (req, res) => {
     let postData = '';
     // 监听参数传输事件
     req.on('data', (chunk) => postData += chunk;);
     // 监听参数传输完毕事件
     req.on('end', () => { 
         console.log(querystring.parse(postData)); 
     }); 
 });

```

### 4.4 路由

路由是指客户端请求地址与服务器端程序代码的对应关系。简单的说，就是请求什么响应什么



![](./media/node02-11.png)



```js
 // 当客户端发来请求的时候
 app.on('request', (req, res) => {
     // 获取客户端的请求路径
     let { pathname } = url.parse(req.url);
     if (pathname == '/' || pathname == '/index') {
         res.end('欢迎来到首页');
     } else if (pathname == '/list') {
         res.end('欢迎来到列表页页');
     } else {
        res.end('抱歉, 您访问的页面出游了');
     }
 });

```

### 4.5 静态资源

服务器端不需要处理，可以直接响应给客户端的资源就是静态资源，例如CSS、JavaScript、image文件



### 4.6 动态资源

相同的请求地址不同的响应资源，这种资源就是动态资源

![](./media/node02-12.png)



### 4.7 客户端请求途径

![](./media/node02-13.png)

## NodeJS 异步编程

### 5.1 同步API& 异步API

同步API：只有当前API执行完成后，才能继续执行下一个API

```js
console.log('before'); 
console.log('after');
```

异步API：当前API的执行不会阻塞后续代码的执行

```js
console.log('before');
setTimeout(
   () => { console.log('last');
}, 2000);
console.log('after');

```



### 5.2 同步API, 异步API的区别（获取返回值 ）

同步API可以从返回值中拿到API执行的结果, 但是异步API是不可以的

```js
    // 同步
  function sum (n1, n2) { 
      return n1 + n2;
  } 
  const result = sum (10, 20);

```

```js
    // 异步
  function getMsg () { 
      setTimeout(function () { 
          return { msg: 'Hello Node.js' }
      }, 2000);
  }
  const msg = getMsg ();

```



### 5.3 回调函数

自己定义函数让别人去调用。

```js
  // getData函数定义
 function getData (callback) {}
  // getData函数调用
 getData (() => {});

```



### 5.4 使用回调函数获取异步API执行结果

```js
function getMsg (callback) {
    setTimeout(function () {
        callback ({ msg: 'Hello Node.js' })
    }, 2000);
}
getMsg (function (msg) { 
    console.log(msg);
});

```

### 5.5 同步API, 异步API的区别（代码执行顺序）

同步API从上到下依次执行，前面代码会阻塞后面代码的执行

```js
for (var i = 0; i < 100000; i++) { 
    console.log(i);
}
console.log('for循环后面的代码');

```



异步API不会等待APIi有返回结果后再向下执行代码

```js
console.log('代码开始执行'); 
setTimeout(() => { console.log('2秒后执行的代码')}, 2000);
setTimeout(() => { console.log('"0秒"后执行的代码')}, 0); 
console.log('代码结束执行');

```



### 5.6 代码执行顺序分析

```js
console.log('代码开始执行');
setTimeout(() => {
    console.log('2秒后执行的代码');
}, 2000); 
setTimeout(() => {
    console.log('"0秒"后执行的代码');
}, 0);
console.log('代码结束执行');

```

![](./media/node02-14.png)

### 5.7 Node.js中的异步API

```js
 fs.readFile('./demo.txt', (err, result) => {});
```



```js
 var server = http.createServer();
 server.on('request', (req, res) => {});

```

