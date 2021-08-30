---
title: Day05-VueRoute 路由
date: 2020-08-17
sidebarDepth: 4
tags:
  - Vuex
categories:
  - 前端学习笔记
---

[TOC]

## Vue 路由

### 1.路由的基本概念与原理

#### 1.1 路由分类

- 后端路由

  - 概念：根据不同的用户 URL 请求，返回不同的内容
  - 本质：URL 请求地址与服务器资源之间的对应关系

  <img src="C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1584470652913.png" alt="1584470652913" style="zoom:80%;" />

- 前端路由(前负责事件监听，触发事件后，通过事件函数渲染不同内容)

  - 概念：根据不同的用户事件，显示不同的页面内容

  - 本质：用户事件与事件处理函数之间的对应关系

#### 1.2 基于 URL 的 hash 原理实现一个简单前端路由

思路:

​ 不同的 a 链接 都会改变 url 地址从而改变 location.hash 的值

通过监听 window.onhashchange 原生事件 来改变绑定在 vm 里组件绑定的值,随着值的变化改变内容的显示

![1584547228247](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1584547228247.png)

具体细节:

```html
<!-- 根据 :is 属性指定的组件名称，把对应的组件渲染到 component 标签所在的位置 -->
<!-- 可以把 component 标签当做是【组件的占位符】 -->
<component :is="comName"></component>
const vm = new Vue({ el: '#app', data: { comName: 'zhuye' }, // 注册私有组件
components: { zhuye, keji, caijing, yule } })
```

### 2.vue-router 的基本使用

#### 2.1 Vue router 介绍

Vue router [官网 https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

![1584547950431](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202108/31/003123-327108.png)

#### 2.2 Vue router 使用步骤

```javascript
//1.引入相关的库文件
	<！--导入vue 文件，为全局window 对象挂载 vue构造函数-->
	<script src="./1ib/vue_2.5.22.js"></script>
	<！--导入vue-router 文件，为全局 window对象挂载 VueRouter 构造函数-->
	<script src="./lib/vue-router 3.0.2.js"></script>
// 2.添加路由链接
     <div id="app">
		<router-link to="/user">User</router-link>
         //会被渲染成a标签 和 href属性
		<router-link to="/register">Register</router-link>
	</div>
//3.添加路由填充位(路由占位符)
     <router-view></router-view>
//4.定义路由组件
   const User={
		template:'<h1>User组件</h1>
   }
	const Register={
		template:'<h1>Register组件</h1>
	}
//5.配置路由规则并创建路由实例
     //创建路由实例对象
	var router=new VueRouter（{
	//routes是路由规则数组
		routes:[
            //每个路由规则都是一个配置对象，其中至少包含path和component两个属性：
            //path 表示当前路由规则匹配的hash地址
            //component 表示当前路由规则对应要展示的组件
            {path:'/user'，component:User}，
            {path:'/register'，component:Register}
 		]
}）
//6.把路由挂载到Vue根实例中
        new Vue（{
			e1：’#app’，
			//为了能够让路由规则生效，必须把路由对象挂载到vue实例对象上
			router:router
}
```

### 3.vue-router 嵌套路由

嵌套路由的定义 要通过 children 属性来实现

```js
const router=new VueRouter({
routes:[   						    		     		      		  {path:'/user',component:User},
{path:'/register',component:Register,
    //通过children 属性,为/register添加子路由规则
	children:[
 		{path:'/register/tab1',component:Tab1},
 		{path:'/register/tab2',component:Tab2}
	]
}
)
```

### 4.vue-router 动态路由匹配

#### 4.1 动态路由基本用法

应用场景：通过动态路由参数的模式进行路由匹配

```js
var router=new VueRouter（{
routes:[
	//动态路径参数以冒号开头
	{path：'/user/:id'，component:User}
]

const User={
  	/路由组件中通过sroute.params获取路由参数
	template:'<div>user{{$route.params.id}}</div>'
}
```

#### 4.2 路由组件传递参数(使用 props 将组件和路由解耦)

##### 4.2.1 props 的值为布尔类型

```js
const router=new VueRouter（{
	routes:[
	//如果 props 被设置为true，route.params将会被设置为组件属性
	{path:'/user/：id'，component:User，props:true}
}）

const User={
	props:['id']，//使用props 接收路由参数
    template:'<div>用户ID:{{id}</div>'//使用路由参数
}
```

##### 4.2.2 props 的值为对象类型

```js
const router=new VueRouter（{
	routes:[
    //如果props是一个对象，它会被按原样设置为组件属性 id将无法访问
    	{path:'/user/：id'，component:User，props:{uname:'lisi'，age：12}
	]
}）

const User={
	props:['uname'，'age']，template：<div>用户信息：{{uname+---'+age}}</div>'
}
```

##### 4.23.props 的值为函数类型

```

const router=new VueRouter（{
    routes:[
    //如果props是一个函数，则这个函数接收route对象为自己的形参
    {path:'/user/：id'，component:User，props:route=>（{uname:'zs'，age：20，id:route.params.id}）}
]
}）
const User={
props:['uname'，'age'，'id']，template:'<div>用户信息：{{uname+'---'+age+'---'+id}}</div>'
```

### 5.vue-router 命名路由

为了更加方便的表示路由的路径，可以给路由规则起一个别名，即为“命名路由"。

```js

const router=new VueRouter（{
	routes:[
		path:'/user/:id'，name:'user'，component:User
	]
}）
<router-link:to="t nane:'user'，params:{id：123}}">User</router-link>

router.push（{name:'user'，params:{id：123}}）
```

### 6.vue-router 编程式导航

#### 6.1 页面导航的两种方式

- 声明式导航：通过点击链接实现导航的方式，叫做声明式导航例如：普通网页中的`<a></a>`链接或 vue 中的`<router-link></router-link>`
  ·编程式导航：通过调用 JavaScript 形式的 API 实现导航的方式，叫做编程式导航例如：普通网页中的 location.href

```js
常用的编程式导航API如下：
this.$router.push（'hash地址）
this.$router.go（n）//n是数字
```

### 7.基于 vue-router 的案例

后台管理路由的实现

路由,子路由路由重定向,动态路由传参,编程式导航

### 8.路由守卫
