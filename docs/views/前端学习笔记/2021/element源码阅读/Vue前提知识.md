

---
title: Vue前提知识
date: 2021-12-09
sidebarDepth: 4
tags:
  - Vue
categories:
  - 进阶
---


# ES6简介

 ES 的全称是 ECMAScript , 它是由 ECMA 国际标准化组织,制定的一项脚本语言的标准化规范。 

 它往往被称为[JavaScript](https://baike.baidu.com/item/JavaScript)或[JScript](https://baike.baidu.com/item/JScript) 

 [欧洲计算机制造商协会](https://baike.baidu.com/item/欧洲计算机制造商协会/2052072)，European Computer Manufacturers Association 



## 什么是ES6？什么是ES2015？它们是什么关系呢？

ES2015是ECMAScript 2015的简称，ECMA又是欧洲计算机制造者协会的简称，ECMAScript代表 JavaScript 这门语言所遵循的规范。2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了，直到2015年ES6.0才正式出炉。因此，ES6 这个词的原意，就是指 JavaScript 语言在ES5.1后的下一个版本ES6.0。

标准委员会决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。(ES2015、ES2016.....)

所以，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

ES6代表着 JS 这门语言最新的标准，是非常有必要学习的。目前以Chrome为首的现代浏览器已经基本实现了ES6的大多数新特性，即使在不支持ES6的浏览器上，开发者也可以通过转译工具如`Babel`将ES6代码转译为ES5代码来实现兼容。

[ES6新语法新特性](https://chuanyuan_an.gitee.io/vuepress_blog/views/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020/js%E8%BF%9B%E9%98%B6/%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3ES6%E7%AC%94%E8%AE%B0.html#set)

let const 箭头函数 解构语法 剩余参数 async await 新增的其他api

# node的简单了解

## nodejs简介

 运行在 V8 JavaScript 引擎（Google Chrome 的内核） 的 js 

## Node.js 与浏览器js的区别

语法层面上是一模一样的,只是运行环境的不同导致提供的api不同(个人理解)

- 浏览器js提供操作Web 平台 API的api,比如 操作`dom`对象,`window`对象等 ,控制浏览器的各种行为

- Nodejs 能提供操作系统级别的API 比如读取文件等,能控制操作系统的行为

- 模块化语法不同  Node.js 中使用 `require()`，而在浏览器中则使用 `import`。(  浏览器中正在推广实现 的一种ES 模块标准 )

[node中文网](http://nodejs.cn/learn/differences-between-nodejs-and-the-browser)

## node安装

[node安装](http://nodejs.cn/learn/how-to-install-nodejs)

下载一步步确定就行  (建议用nvm 可以实现多个版本的node的任意切换)

## 基本api示例

用读取文件为例子

1 在命令窗口 直接输入 node,就可以进入node执行环境

![1638889993253](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/231314-902375.png)

![1638890111257](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/231511-498464.png)

2.执行下面的代码

```
const fs = require('fs')
try {
  const data = fs.readFileSync('test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}
```

![1638890461713](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/232117-533045.png)

或者直接 node xxx.js 也可以直接运行改js脚本文件

![1638890702567](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/232503-406178.png)

## Nodejs带来了什么?

![1638890968189](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/232929-348495.png)

## 第三方包如何使用 npm是什么玩意?

npm 就是包管理器,管理项目中的包依赖

## 如何创建npm 项目并管理依赖包?

### 找个文件夹 执行 如下命令就可以创建了

```bash
npm init -y
```

生成的package.json 文件就包含了整个node项目的各种信息,里面会记录依赖信息,可以设置脚本命令

![1638891413028](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/233653-742548.png)



### 添加一个包 比如 添加 日期操作库 dayjs

```bash
npm i dayjs
#i 是install的简写
```

![1638892343502](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/235224-164744.png)

### 怎么使用这个包

![1638892502416](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/235503-185362.png)

### 可以用import语法使用这个包吗?不是说nodejs对ES支持友好吗

默认是不可以的

![1638892771182](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/07/235932-172164.png)

但是只要你按照的说的改一下 package.json 里面的项目模块方式就行了

![1638892837863](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/08/000110-582905.png)

![1638892873293](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/08/000114-198973.png)

# babel简介

[babel中文网](https://www.babeljs.cn/docs/)

![1638971708329](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/08/215509-820732.png)

```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

把src下面所有的js 文件进行转换

```
npx babel src --out-dir lib
```

 这将解析 `src` 目录下的所有 JavaScript 文件，并应用我们所指定的代码转换功能，然后把每个文件输出到 `lib` 目录下。由于我们还没有指定任何代码转换功能，所以输出的代码将与输入的代码相同（不保留原代码格式）。我们可以将我们所需要的代码转换功能作为参数传递进去。 

```
npm install --save-dev @babel/plugin-transform-arrow-functions

npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

 我们不需要一个接一个地添加所有需要的插件，我们可以使用一个 "preset" （即一组预先设定的插件）。 

```
npm install --save-dev @babel/preset-env

npx babel src --out-dir lib --presets=@babel/env
```



# webpack简单了解

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

[webpack官网](https://webpack.docschina.org/)

主要用到一下几个功能

- 代码转译

- 模块合并

- 混淆压缩

- 代码分割

- 自动刷新

- 代码校验

  