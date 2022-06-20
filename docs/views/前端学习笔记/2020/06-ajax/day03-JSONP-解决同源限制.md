---
title: AJAX-03-JSONP-解决同源限制
date: 2020-07-08
sidebarDepth: 4
tags:
    - ajax
categories:
    - 前端学习笔记
---

## 同源政策

### Ajax请求限制

Ajax 只能向自己的服务器发送请求。

比如现在有一个A网站、有一个B网站，A网站中的 HTML 文件只能向A网站服务器中发送 Ajax 请求，B网站中的 HTML 文件只能向 B 网站中发送 Ajax 请求，但是 A 网站是不能向 B 网站发送 Ajax请求的，同理，B 网站也不能向 A 网站发送 Ajax请求。

### 什么是同源

如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源。

http://www.example.com/dir/page.html

http://www.example.com/dir2/other.html：同源

http://example.com/dir/other.html：不同源（域名不同）

http://v2.www.example.com/dir/other.html：不同源（域名不同）

http://www.example.com:81/dir/other.html：不同源（端口不同）

https://www.example.com/dir/page.html：不同源（协议不同）

### 同源政策的目的

同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指
A 网站在客户端设置的 Cookie，B网站是不能访问的。

随着互联网的发展，同源政策也越来越严格，在不同源的情况下，其中有一项规定就是无法向非同源地址发送Ajax 请求，如果请求，浏览器就会报错。

## 使用 JSONP 解决同源限制问题

jsonp 是 json with padding 的缩写，它不属于 Ajax 请求，但它可以模拟 Ajax 请求。

1. 将不同源的服务器端请求地址写在 script 标签的 src 属性中。

   ```html
   <script src="www.example.com"></script>
   <script src=“https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
   ```

2. 服务器端响应数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数。

   ```javascript
    const data = 'fn({name: "张三", age: "20"})';
    res.send(data);
   ```

3. 在客户端全局作用域下定义函数 fn。

   ```javascript
   function fn (data) { }
   ```

4. 在 fn 函数内部对服务器端返回的数据进行处理。

   ```javascript
   function fn (data) { console.log(data); }
   ```

### JSONP 代码优化

1. 客户端需要将函数名称传递到服务器端。

2. 将 script 请求的发送变成动态请求。

   ```javascript
   		// 为按钮添加点击事件
   		btn.onclick = function () {
   			// 创建script标签
   			var script = document.createElement('script');
   			// 设置src属性
   			script.src = 'http://localhost:3001/better?callback=fn2';
   			// 将script标签追加到页面中
   			document.body.appendChild(script);
   			// 为script标签添加onload事件
   			script.onload = function () {
   				// 将body中的script标签删除掉
   				document.body.removeChild(script);
   			}
   		}
   ```

3. 封装 jsonp 函数，方便请求发送。

   ```javascript
   function jsonp (options){
     // 动态创建 script 标签
     var script = document.createElement('script')
     // 为script标签 添加src属性
     script.src = options.url;
     // 将 script 标签追加到页面上
     document.body.appendChild(script);
     // 为script 标签添加onload事件
     script.onload = function () { 
     		document.body.removeChild(script)
     }
   }
   ```

   

4. 服务器端代码优化之 res.jsonp 方法。

   ```js
   app.get('/better', (req, res) => {
   	// 接收客户端传递过来的函数的名称
   	//const fnName = req.query.callback;
   	// 将函数名称对应的函数调用代码返回给客户端
   	//const data = JSON.stringify({name: "张三"});
   	//const result = fnName + '('+ data +')';
   	// setTimeout(() => {
   	// 	res.send(result);
   	// }, 1000)
   	res.jsonp({name: 'lisi', age: 20});
   });

   ```

### 获取腾讯天气信息案例

#### 腾讯天气接口

url：https://wis.qq.com/weather/common

| 参数名       | 必选 | 类型   | 说明   |
| ------------ | ---- | ------ | ------ |
| source       | 是   | String | pc、xw |
| weather_type | 是   | String | air    |
| province     | 是   | String | 省份   |
| city         | 是   | string | 城市   |

##### 日期格式化

```js
		function dateFormat(date) {
			var year = date.substr(0, 4);
			var month = date.substr(4, 2);
			var day = date.substr(6, 2);
			var hour = date.substr(8, 2);
			var minute = date.substr(10, 2);
			var seconds = date.substr(12, 2);
			return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + seconds + '秒';
		}
```

**返回值**

```json


    myJsonp017363176455629659({
        "data": {
            "forecast_1h": {
                "0": {
                    "degree": "20",
                    "update_time": "20190529100000",
                    "weather": "多云",
                    "weather_code": "01",
                    "weather_short": "多云",
                    "wind_direction": "西风",
                    "wind_power": "5"
                },
                "1": {
                    "degree": "21",
                    "update_time": "20190529110000",
                    "weather": "多云",
                    "weather_code": "01",
                    "weather_short": "多云",
                    "wind_direction": "西风",
                    "wind_power": "5"
                },
                
            }
        },
        "message": "OK",
        "status": 200
    })



```



### CORS 跨域资源共享

CORS：全称为 Cross-origin-resource sharing，即跨域资源共享，它允许浏览器向跨域服务器发送 Ajax 请求，克服了 Ajax 只能同源使用的限制。

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202009/16/233803-231966.png)

```
origin: http://localhost:3000

```

```
 Access-Control-Allow-Origin: 'http://localhost:3000'
 Access-Control-Allow-Origin: '*'

```

Node 服务器端设置响应头示例代码：

```javascript
 app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, POST');
     next();
 })

```

#### 访问非同源数据 服务器端解决方案

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202009/16/233805-103387.png)

#### cookie 复习

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202009/16/233811-857504.png)

#### withCredentials属性

在使用Ajax技术发送跨域请求时，默认情况下不会在请求中携带cookie信息。

withCredentials：指定在涉及到跨域请求时，是否携带cookie信息，默认值为false

Access-Control-Allow-Credentials：true 允许客户端发送请求时携带cookie
