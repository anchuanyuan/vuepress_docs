---
title: AJAX-02-FormdData及模板引擎-art-template
date: 2020-07-07
sidebarDepth: 4
tags:
    - ajax
categories:
    - 前端学习笔记
---

## 模板引擎

### 模板引擎概述

作用：使用模板引擎提供的模板语法，可以将数据和 HTML 拼接起来。

官方地址：
https://aui.github.io/art-template/zh-cn/index.html

#### 使用步骤

1.  下载 art-template 模板引擎库文件并在 HTML 页面中引入库文件

  ```html
  <script src="./js/template-web.js"></script>
  ```

2.  准备 art-template 模板

  ```html
   <script id="tpl" type="text/html">
       <div class="box"></div>
   </script>
  ```

3.  告诉模板引擎将哪一个模板和哪个数据进行拼接

  ```js
   var html = template('tpl', {username: 'zhangsan', age: '20'});
  ```

4.  将拼接好的html字符串添加到页面中

  ```js
  document.getElementById('container').innerHTML = html;
  ```

5.  通过模板语法告诉模板引擎，数据和html字符串要如何拼接`

  ```html
   <script id="tpl" type="text/html">
       <div class="box"> {{ username }} </div>
   </script>
  ```

  ​

### 案例

#### 验证邮箱地址唯一性

1. 获取文本框并为其添加离开焦点事件

   ```javascript
   		// 获取页面中的元素
   		var emailInp = document.getElementById('email');
   		var info = document.getElementById('info');

   		// 当文本框离开焦点以后
   		emailInp.onblur = function () {  ……  }
   ```

2. 离开焦点时，检测用户输入的邮箱地址是否符合规则

   ```javascript
   	emailInp.onblur = function () { 
               
        // 获取用户输入的邮箱地址
   	 var email = this.value;
   	 // 验证邮箱地址的正则表达式
   	 var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        }
   			
   ```

3. 如果不符合规则，阻止程序向下执行并给出提示信息

   ```js
   			// 如果用户输入的邮箱地址不符合规则
   			if (!reg.test(email)) {
   				// 给出用户提示
   				info.innerHTML = '请输入符合规则的邮箱地址';
   				// 让提示信息显示为错误提示信息的样式
   				info.className = 'bg-danger';
   				// 阻止程序向下执行
   				return;
   			}
   ```

4. 向服务器端发送请求，检测邮箱地址是否被别人注册

   ```javascript
   			// 向服务器端发送请求
   			ajax({
   				type: 'get',
   				url: 'http://localhost:3000/verifyEmailAdress',
   				data: {
   					email: email
   				},
   				success: function (result) {
   					console.log(result);
   				},
   				error: function (result) {
   					console.log(result)
   				}
   			});
   ```

5. 根据服务器端返回值决定客户端显示何种提示信息

   ```javascript
   			// 向服务器端发送请求
   			ajax({
   				type: 'get',
   				url: 'http://localhost:3000/verifyEmailAdress',
   				data: {
   					email: email
   				},
   				success: function (result) {
   					console.log(result);
   					info.innerHTML = result.message;
   					info.className = 'bg-success';
   				},
   				error: function (result) {
   					console.log(result)
   					info.innerHTML = result.message;
   					info.className = 'bg-danger';
   				}
   			});
   ```

#### 搜索框内容自动提示

1. 获取搜索框并为其添加用户输入事件

   ```html
   	<div class="container">
   		<div class="form-group">
   			<input type="text" class="form-control" placeholder="请输入搜索关键字" id="search">
   			<ul class="list-group" id="list-box">
   				
   			</ul>
   		</div>
   	</div>
   	<script src="/js/ajax.js"></script>
   	<script src="/js/template-web.js"></script>
   	<script type="text/html" id="tpl">
   		{{each result}}
   			<li class="list-group-item">{{$value}}</li>
   		{{/each}}
   	</script>
   ```

   ```javascript
   		// 获取搜索框
   		var searchInp = document.getElementById('search');
   		// 获取提示文字的存放容器
   		var listBox = document.getElementById('list-box');
   		// 清除上一次开启的定时器
   		clearTimeout(timer);
   		// 当用户在文本框中输入的时候触发
   		searchInp.oninput = function () { }
   ```

2. 获取用户输入的关键字

   ```js
   		var key = this.value;
   		// 如果用户没有在搜索框中输入内容
   		if (key.trim().length == 0) {
   			// 将提示下拉框隐藏掉
   			listBox.style.display = 'none';
   			// 阻止程序向下执行
   			return;
   		}
   ```

   ​

3. 向服务器端发送请求并携带关键字作为请求参数

   ```js
   			// 向服务器端发送请求
   			// 向服务器端索取和用户输入关键字相关的内容
   			ajax({
   					type: 'get',
   					url: 'http://localhost:3000/searchAutoPrompt',
   					data: {
   						key: key
   					},
   					success: function (result) {
   						// 使用模板引擎拼接字符串
   						var html = template('tpl', {result: result});
   					}
   			})
   ```

   ​

4. 将响应数据显示在搜索框底部

   ```js
   			success: function (result) {
   						// 使用模板引擎拼接字符串
   						var html = template('tpl', {result: result});
   						// 将拼接好的字符串显示在页面中
   						listBox.innerHTML = html;
   						// 显示ul容器
   						listBox.style.display = 'block';
   			}

   ```

5. 为了避免请求发送过于频繁需要添加定时器

   ```js
   			// 开启定时器 让请求延迟发送
   			timer = setTimeout(function () {
   				// 向服务器端发送请求
   				// 向服务器端索取和用户输入关键字相关的内容
   				ajax({
   					type: 'get',
   					url: 'http://localhost:3000/searchAutoPrompt',
   					data: {
   						key: key
   					},
   					success: function (result) {
   						// 使用模板引擎拼接字符串
   						var html = template('tpl', {result: result});
   						// 将拼接好的字符串显示在页面中
   						listBox.innerHTML = html;
   						// 显示ul容器
   						listBox.style.display = 'block';
   					}
   				})
   			}, 800)
   ```

   ​

#### 省市区三级联动

1. 通过接口获取省份信息

   ```js
   		// 获取省份信息
   		ajax({
   			type: 'get',
   			url: 'http://localhost:3000/province',
   			success: function (data) {
   				// 将服务器端返回的数据和html进行拼接
   				var html = template('provinceTpl', {province: data});
   				// 将拼接好的html字符串显示在页面中
   				province.innerHTML = html;
   			}
   		});
   ```

2. 使用JavaScript获取到省市区下拉框元素

   ```js
   		// 获取省市区下拉框元素
   		var province = document.getElementById('province');
   		var city = document.getElementById('city');
   		var area = document.getElementById('area');
   ```

3. 将服务器端返回的省份信息显示在下拉框中

   ```js
   			success: function (data) {
   				// 将服务器端返回的数据和html进行拼接
   				var html = template('provinceTpl', {province: data});
   				// 将拼接好的html字符串显示在页面中
   				province.innerHTML = html;
   			}
   ```

4. 为下拉框元素添加表单值改变事件（onchange）

   ```js
   		// 为省份的下拉框添加值改变事件
   		province.onchange = function () { }
   ```

5. 当用户选择省份时，根据省份id获取城市信息

   ```js
   			// 获取省份id
   			var pid = this.value;

   			// 清空县城下拉框中的数据
   			var html = template('areaTpl', {area: []});
   			area.innerHTML = html;

   			// 根据省份id获取城市信息
   			ajax({
   				type: 'get',
   				url: '/cities',
   				data: {
   					id: pid
   				},
   				success: function (data) {
   					var html = template('cityTpl', {city: data});
   					city.innerHTML = html;
   				}
   			})
   ```

6. 当用户选择城市时，根据城市id获取县城信息

   ```js
   		// 当用户选择城市的时候
   		city.onchange = function () {
   			// 获取城市id
   			var cid = this.value;
   			// 根据城市id获取县城信息
   			ajax({
   				type: 'get',
   				url: 'http://localhost:3000/areas',
   				data: {
   					id: cid
   				},
   				success: function(data) {
   					var html = template('areaTpl', {area: data});
   					area.innerHTML = html;
   				}
   			})
   		}
   ```

## FormData

### FormData 对象的作用

1. 模拟HTML表单，相当于将HTML表单映射成表单对象，自动将表单对象中的数据拼接成请求参数的格式。
2. 异步上传二进制文件

### FormData 对象的使用

准备 HTML 表单

```html
 <form id="form">
     <input type="text" name="username" />
     <input type="password" name="password" />
     <input type="button"/>
</form>
```

将 HTML 表单转化为 formData 对象

```js
var form = document.getElementById('form'); 
var formData = new FormData(form);
```

提交表单对象

```js
xhr.send(formData);
```

### 注意

1. **Formdata 对象不能用于 get 请求，因为对象需要被传递到 send 方法中，而 get 请求方式的请求参数只能放在请求地址的后面。**

2. **服务器端 bodyParser 模块不能解析 formData 对象表单数据，我们需要使用formidable模块进行解析。**

   ```js
   app.post('/formData', (req, res) => {
   	// 创建formidable表单解析对象
   	const form = new formidable.IncomingForm();
   	// 解析客户端传递过来的FormData对象
   	form.parse(req, (err, fields, files) => {
   		res.send(fields);
   	});
   });
   ```

   ​

### FormData 对象的实例方法

1. 获取表单对象中属性的值

   ```js
    formData.get('key');
   ```

2. 设置表单对象中属性的值

   ```js
   formData.set('key', 'value');
   ```

3. 删除表单对象中属性的值

   ```js
   formData.delete('key');
   ```

4. 向表单对象中追加属性值

   ```js
   formData.append('key', 'value');
   ```

   **注意：set 方法与 append 方法的区别是，在属性名已存在的情况下，set 会覆盖已有键名的值，append会保留两个值。**

### FormData 二进制文件上传

```html
<input type="file" id="file"/>
```

```javascript
 var file = document.getElementById('file')
// 当用户选择文件的时候
 file.onchange = function () {
     // 创建空表单对象
     var formData = new FormData();
     // 将用户选择的二进制文件追加到表单对象中
     formData.append('attrName', this.files[0]);
     // 配置ajax对象，请求方式必须为post
     xhr.open('post', 'www.example.com');
     xhr.send(formData);
 }
```

### FormData 文件上传进度展示

```javascript
 // 当用户选择文件的时候
 file.onchange = function () {
     // 文件上传过程中持续触发onprogress事件
     xhr.upload.onprogress = function (ev) {
         // 当前上传文件大小/文件总大小 再将结果转换为百分数
         // 将结果赋值给进度条的宽度属性 
         bar.style.width = (ev.loaded / ev.total) * 100 + '%';
     }
 }
```

### FormData 文件上传图片即时预览

在我们将图片上传到服务器端以后，服务器端通常都会将图片地址做为响应数据传递到客户端，客户端可以从响应数据中获取图片地址，然后将图片再显示在页面中。

```javascript
 xhr.onload = function () {
     var result = JSON.parse(xhr.responseText);
     var img = document.createElement('img');
     img.src = result.src;
     img.onload = function () {
         document.body.appendChild(this);
     }
 }
```

