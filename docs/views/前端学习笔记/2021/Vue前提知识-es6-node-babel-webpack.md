---
title: Vue前提知识-es6-node-babel-webpack
date: 2021-11-20
sidebarDepth: 4
tags:
  - Vue
categories:
  - 进阶
---

[TOC]

# Vue前提知识-es6-node-babel-webpack

# 模块化简介

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的`require`、Python 的`import`，甚至就连 CSS 都有`@import`，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

[CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html)

## Node 应用由模块组成，采用 CommonJS 模块规范。

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。



## module对象

 Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。 

每个模块内部，都有一个`module`对象，代表当前模块。它有以下属性。

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` 模块的文件名，带有绝对路径。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回一个对象，表示调用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
- `module.exports` 表示模块对外输出的值。

ES6模块化

 [Module 的语法 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/module) 

[ES6模块化在node中的使用](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

Node.js 要求 ES6 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。Node.js 遇到`.mjs`文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定`"use strict"`。

如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。

## 差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

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

 Node.js 在浏览器之外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使得 Node.js 的性能非常好。 

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

## 简单使用

![1638971708329](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/08/215509-820732.png)

- 首先我们创建一个npm 项目

  新建babel-demo 文件夹 用 npm init -y 初始化package.json文件

  ```
  npm init -y
  ```

- 然后,我们安装 @babel/cli 包 作为开发依赖

  ```
  npm i @babel/cli -D
  ```

- 接着,我们执行 npx babel  提示 ` Cannot find module '@babel/core'`缺少@babel/core这个包 因为@babel/cli 依赖这个包 所以我们把它安装上

  ```
  npm i @babel/core -D
  ```

- 然后根据官网的命令 指定输入 和输出

  ```
  npx babel src --out-dir lib
  ```

- 发现输出和输入一样的 没什么卵用, 这是因为没有配置需要转换的东西

- 如果你想转换箭头函数,可以这么写, 但是前提你得按照 @babel/plugin-transform-arrow-functions 

  ```bash
  # 先要去安装这个转换包
  npm i @babel/plugin-transform-arrow-functions -D
  npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
  ```

- es6的语法多了去了,不想每个包自己手动装一遍?

  代码中仍然残留了其他 ES2015+ 的特性，我们希望对它们也进行转换。我们不需要一个接一个地添加所有需要的插件，我们可以使用一个 "preset" （即一组预先设定的插件）。 

  可以写配置文件 .babelrc ( 或者`babel.config.json` 的文件（需要 `v7.8.0` 或更高版 )里面用官方的预设文件

  安装@babel/preset-env

  ```
  npm i @babel/preset-env -D
  ```

  .babelrc

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
npx babel src --out-dir lib --presets=@babel/env
```



# webpack简单了解

## [为什么选择 webpack](https://webpack.docschina.org/concepts/why-webpack/)

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

[webpack官网](https://webpack.docschina.org/)

主要用到一下几个功能

- 代码转译

- 模块合并

- 混淆压缩

- 代码分割

- 自动刷新

- 代码校验


## webpack 快速入门

## 基本概念---打包入口、打包出口、loader、插件

### 打包入口、打包出口

#### 在基于node的环境中打包现代语法的js文件

- 新建一个项目

```bash
npm init - y
```

- 安装webpack

```bash
npm i webpack -D
```

- 写一个配置文件如下,指定打包入口,指定打包出口

  webpack.config.js

```js
module.exports = {
  // 入口文件配置
  entry: './src/app.js',
  // 出口文件配置项
  output: {
    // 输出的路径，webpack2起就规定必须是绝对路径
    path: path.join(__dirname, 'dist'),
    // 输出文件名字
    filename: 'bundle.js'
  },
  mode: 'development' // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
}

```

- 执行npx webpack 会提示让你安装webpack cli命令行工具

  选择yes 就能打包成功了  在相应地方就能看见输出的打包后的文件

- 默认的配置文件就叫webpack.config.js 可以修改  执行命令的时候指定就行了

  比如: npx webpack --config build/devserve.js

  build/devserve.js

  ```
  const path = require('path')
  /** @type {import('webpack').Configuration} */
  module.exports = {
    // 入口文件配置
    entry: './src/app.js',
    // 出口文件配置项
    output: {
      // 输出的路径，webpack2起就规定必须是绝对路径
      path: path.join(process.cwd(), 'dist2'), // process.cwd()命令执行所在路径
      // 输出文件名字
      filename: 'bundle.js'
    },
    mode: 'development' // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
  }
  ```

  

  每次这样写太麻烦了可以在 npm 项目 package.json 中指定命令的脚本

  ```json
   {
      "name": "webpack-demo",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "build": "npx webpack --config build/devserve.js" 
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "dayjs": "^1.10.7",
        "vue": "^2.6.14"
      },
      "devDependencies": {
        "webpack": "^5.65.0",
        "webpack-cli": "^4.9.1"
      }
    }
  ```

### webpack插件

- HtmlWebpackPlugin -- 自动生成html文件并 引入打包的文件

  ```bash
  npm i html-webpack-plugin -D
  ```
  
- 对插件进行配置
  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const path = require('path')
  
  /** @type {import('webpack').Configuration} */
  module.exports = {
    // 入口文件配置
    entry: './src/app.js',
    // 出口文件配置项
    output: {
      // 输出的路径，webpack2起就规定必须是绝对路径
      path: path.join(process.cwd(), 'dist2'), // 命令执行所在路径
      // 输出文件名字
      filename: 'bundle.js'
    },
    mode: 'development', // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
    plugins :[
      new HtmlWebpackPlugin ({
        filename: 'index.html',
        template: path.join(process.cwd(),'public/index.html')
      })
    ]
  }
  ```
  
  filename: 输出的文件名字
  
  template: 模板html ,不写的话会默认生成一个空html文件引入编译好的js
  
   在上面的示例中，`html-webpack-plugin` 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中 

### webpack-dev-server 

开发的时候大家都是习惯热更新的,不能每次都手动编译然后去预览吧

webpack-dev-server  解决了这个问题

- 安装 

  ```bash
  npm i webpack-dev-server -D
  ```

- 配置

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const path = require('path')
  
  /** @type {import('webpack').Configuration} */
  module.exports = {
    // 入口文件配置
    entry: './src/app.js',
    // 出口文件配置项
    output: {
      // 输出的路径，webpack2起就规定必须是绝对路径
      path: path.join(process.cwd(), 'dist2'), // 命令执行所在路径
      // 输出文件名字
      filename: 'bundle.js'
    },
    mode: 'development', // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
    plugins :[
      new HtmlWebpackPlugin ({
        filename: 'index.html',
        template: path.join(process.cwd(),'public/index.html')
      })
    ],
    devServer: {
      port: 9000,
      open: true,
      client: {
        progress: true,
      },
      // 代理设置 对接口很有用
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
        },
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
      externals: {
        jquery: 'jQuery',
      },
      // compress: true,
    }
  }
  ```

  tip: webpack-dev-serve 生成的文件在内存里面

### 如何使用loader

![1639236327712](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202112/11/232529-50493.png)

以用babel转换es6代码为例

- 先安装 @babel/cli @babel/core  babel-loader 

  配置babel的配置文件 .babelrc

  ```
  {
    "presets": [
      [
        "@babel/preset-env"
        }
      ]
    ]
  }
  ```

  

- webpack配置文件进行修改

```
module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
```

