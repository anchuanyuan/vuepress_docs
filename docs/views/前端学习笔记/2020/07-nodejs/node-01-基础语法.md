---
title: Node01-基础语法
date: 2020-01-10
sidebarDepth: 5
tags:
    - Node
categories:
    - NodeJs
---
## Node.js编程

### Node环境配置

#### Node是什么

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205308-875674.png)

**Node** **是一个**基于Chrome V8引擎的**JavaScript代码运行环境**。

#### 语言与运行环境

浏览器（软件）能够运行JavaScript代码，浏览器就是JavaScript代码的运行环境。

Node（软件）能够运行JavaScript代码，Node就是JavaScript代码的运行环境。

#### Node.js是什么

Node.js是运行在代码环境之上的语言.

JavaScript代码运行在浏览器中，JavaScript是语言，浏览器是运行环境。

JavaScript代码运行在Node 中，Node.js是语言，Node是运行环境。

#### Node.js运行环境下载


LTS = long term support 长期支持版 稳定版

Current 最新版 拥有最新特性 稳定版本的候选版本

[下载地址](https://nodejs.org/en/)

#### Node.js运行环境安装

windows系统用户在Node官网下载后缀为.msi的文件到本地，双击下一步下一步安装即可。

- 代号2502、2503错误的解决方法

  - 以管理员身份运行cmd

  - 输入 msiexec /package node安装包位置

  ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205323-979670.jpeg)

检测Node运行环境是否安装：打开命令行工具，输入node -v 如果出现Node环境版本号则说明安装成功。

- 若出现如下错误

  ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205412-640445.png)

  - 将node.exe所在文件夹配置到PATH系统环境变量中

#### PATH环境变量

- 告诉操作系统在命令行工具中执行的命令在什么位置。

- 可以在任何盘符下面输入你想要输入的命令，而不需要将盘符切换到命令的所在位置。

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205505-890900.png)

 ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205517-596738.png)

### Node.js快速入门

#### Node.js组成

- JavaScript由三部分组成，ECMAScript，DOM，BOM。

- Node.js是由ECMAScript及Node 环境提供的一些附加API组成的，包括文件、网络、路径等等一些更加强大的 API。

 ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205528-431000.png)

#### Node.js基础语法

##### 基础语法

所有ECMAScript语法在Node环境中都可以使用

在Node环境下执行代码，使用Node命令执行后缀为.js的文件即可

```javascript
/* 文件名称 1.helloworld.js */
console.log('nodejs入门');
/* 其他ECMAScript语法都可以在这里使用 比如数组、对象、判断、循环 */
```

![](media/node01-1.helloworld.png)

##### 全局对象

在**浏览器**中全局对象是**window**，在**Node**中全局对象是**global**

Node中全局对象下有以下方法，可以在任何地方使用，**global可以省略**

- console.log()    在控制台中输出
- setTimeout()    设置超时定时器
- clearTimeout() 清除超时时定时器
- setInterval()     设置间歇定时器
- clearInterval()  清除间歇定时器

在浏览器环境中 全局作用域下声明的变量可以在window对象下找到

```javascript
var message = 'hello';
console.log(window.message); // 'hello'
```

但是在Node环境下则不可以

```javascript
var message = 'hello';
console.log(global.message); // undefined
```

### 模块化开发

- JavaScript弊端
  - 浏览器端JavaScript在使用的时候存在两大问题, **命名冲突**和**文件依赖**。

  - 模块化开发需要依赖第三方库文件，具有代表性有require.js和sea.js。

    ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205545-947384.png)

- 生活中的模块化

  ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205602-321238.png)

- 软件中的模块化

  一个功能就是一个模块，多个模块可以组成完整应用，抽离一个模块不会影响其他功能的运行。

 ![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205615-595822.png)

- Node.js中模块化开发规范

  Node.js规定一个JavaScript文件就是一个模块，模块内部定义的变量和函数默认情况下在外部无法得到

  模块内部可以使用exports对象进行成员导出，使用require方法导入其他模块

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205629-658754.png)

- 模块成员导出

  ```js
    // a.js
    // 在模块内部定义变量
   let version = 1.0;
   // 在模块内部定义方法
   const sayHi = name => `您好, ${name}`;
   // 向模块外部导出数据 
   exports.version = version;
   exports.sayHi = sayHi;

  ```

- 模块成员的导入

  ```js
    // b.js
    // 在b.js模块中导入模块a
   let a = require('./b.js');
    // 输出b模块中的version变量
   console.log(a.version);
    // 调用b模块中的sayHi方法 并输出其返回值
   console.log(a.sayHi('黑马讲师')); 
   // 导入模块时后缀可以省略

  ```

- 模块成员导出的另一种方式

  ```js
  module.exports.version = version;
  module.exports.sayHi = sayHi;

  // exports是module.exports的别名(地址引用关系)，导出对象最终以module.exports为准

  ```

- 模块导出两种方式的联系与区别
![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205708-859267.png)

  ```js
  exports.version = version;
  module.exports.version = version;
  ============================================================================================
  module.exports = { 
      name: 'zhangsan',
  }

  ```

  

#### 系统模块

> Node环境封装了大量系统级别的API，为了方便管理和使用，不同功能的API被划分到了不同的类别中，例如文件操作，网络操作，这个类别就是模块。模块内部实际上就是对功能的封装。

##### fs模块：文件操作

​	f：file 文件 ，s：system 系统，文件操作系统

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205724-169671.png)

- fs.readFile() 读文件

  ```js
  const fs = require('fs');
  fs.reaFile('文件路径/文件名称'[,'文件编码'], callback);
  ```

  

- fs.writeFile() 向文件中写入内容 (覆盖)

- fs.appendFile() 向文件中追加内容 (追加)

- fs.mkdir() 创建目录

  ```js
  fs.writeFile('文件路径/文件名称', '数据', callback);

   const content = '<h3>正在使用fs.writeFile写入文件内容</h3>';
   fs.writeFile('../index.html', content, err => {
     if (err != null) { 
         console.log(err);
         return;
     }
     console.log('文件写入成功');
   });

  ```

  

##### path模块：路径操作

###### 为什么要进行路径拼接

​	不同操作系统的路径分隔符不统一

​	/public/uploads/avatar

​	Windows上是 \  /

​	Linux上是 /

###### 路径拼接语法

```js
 path.join('路径', '路径', ...)

  // 导入path模块
 const path = require('path');
  // 路径拼接
 let finialPath = path.join('itcast', 'a', 'b', 'c.css');
  // 输出结果 itcast\a\b\c.css
 console.log(finialPath);

```



#### 第三方模块

> 别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，所以又名包。
>
> 第三方模块有两种形式：
>
> 1. 以文件的形式存在，提供实现项目具体功能的API接口。
> 2. 以命令行工具形式存在，辅助项目开发，例如
>    1. 当文件修改时，自动重新node该文件
>    2. 将md文档转换为更加通用的HTML文档

##### 获取第三方模块

- npmjs.com：第三方模块的存储和分发仓库

![](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202008/31/205741-836920.png)

- npm (node package manager) ： node的第三方模块管理工具

  下载：npm install 模块名称

  卸载：npm unintall package 模块名称

  全局安装与本地安装

  ​	命令行工具：全局安装

  ​	库文件：本地安装

##### 更改下载镜像

由于npm网站在国外，所以下载速度会比较慢。

淘宝在国内建立了第三方模块服务器cnpm，每隔10分钟会和npm网站同步一次，使用cnpm下载速度会非常快。

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

##### nodemon&nrm&gulp

- 在需要使用的文件中通过require方式将模块引入
  
  - require('第三方模块名称');
- 根据文档提供的API使用第三方模块
  - **nodemon**

    nodemon是一个命令行工具，用以辅助项目开发。

    在 Node.js 中，每次修改文件都要在命令行工具中重新执行该文件，非常繁琐

    使用步骤:

    1. 使用npm install nodemon –g 下载它
    2. 在命令行工具中用nodemon命令替代node命令执行文件

  - **nrm**

    nrm ( npm registry manager )：npm下载地址切换工具

    npm默认的下载地址在国外，国内下载速度慢

    使用步骤:

    1. 使用npm install nrm –g 下载它
    2. 查询可用下载地址列表 nrm ls
    3. 切换npm下载地址 nrm use 下载地址名称

  - **gulp**
    1. gulp的安装:
       1. 定位终端到项目目录 执行 npm install gulp -s 本地安装gulp的库文件 
       2. 执行 npm install gulp-cli -g 全局安装gulp的命令行工具

    2. gulp能做什么

       1. 项目上线，HTML、CSS、JS文件压缩合并
       2. 语法转换（es6、less ...）
       3. 公共文件抽离
       4. 修改文件浏览器自动刷新

    3. gulp的使用

       1. 使用npm install gulp下载gulp库文件
       2. 在项目根目录下建立gulpfile.js文件
       3. 重构项目的文件夹结构 src目录放置源代码文件 dist目录放置构建后文件
       4. 在gulpfile.js文件中编写任务.
       5. 在命令行工具中执行gulp任务

    4. gulp中提供的方法

       gulp.src()：获取任务要处理的文件

       gulp.dest()：输出文件

       gulp.task()：建立gulp任务

       gulp.watch()：监控文件的变化

       ```js
        const gulp = require('gulp');
         // 使用gulp.task()方法建立任务
        gulp.task('first', () => {
           // 获取要处理的文件
           gulp.src('./src/css/base.css') 
           // 将处理后的文件输出到dist目录
           .pipe(gulp.dest('./dist/css'));
        });
       ```

    5. gulp的插件:
       1. gulp-htmlmin:html代码压缩 安装 npm install --save gulp-htmlmin
       2. gulp-file-include:html公共模块提取 npm install gulp-file-include 
       3. gulp-less:less语法转化 npm install gulp-less 
       4. gulp-csso:css压缩 npm install gulp-cssgo
       5. gulp-babel:JavaScript语法转化 npm install --save-dev gulp-babel @babel/core @babel/preset-env
       6. gulp-uglify:压缩混淆js代码 npm install --save-dev gulp-uglify
       7. ！！！！！！注意！Gulp 4最大的变化就是你不能像以前那样传递一个依赖任务列表 如果Gulp是4.0的版本需要手动指定版本号 比如 npm install gulp@3.9.1 -D

  - json_server

#### package.json

> 项目描述文件，记录当前项目信息，例如项目名称、版本、作者、github地址、当前项目依赖了哪些第三方模块，目的是方便他人了解项目信息，下载项目依赖文件，使用npm init -y命令生成。
>

##### node_modules文件夹的问题

1. 文件夹以及文件过多过碎，当我们将项目整体拷贝给别人的时候,，传输速度会很慢很慢. 
2. 复杂的模块依赖关系需要被记录，确保模块的版本和当前保持一致，否则会导致当前项目运行报错

##### 项目依赖

在项目的开发阶段和线上运营阶段，都需要依赖的第三方包，称为项目依赖。

使用`npm install 包名`命令下载的文件会默认被添加到package.json文件的dependencies字段中。

##### 开发依赖

在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包，称为开发依赖。

使用`npm install 包名 --save-dev`命令将包添加到package.json文件的devDependencies字段中。

##### 为什么记录依赖项

1. Node.js中下载的第三方包文件拥有非常多的细碎文件，将项目通过移动硬盘传递给别人时传输速度非常慢.
2. 使用git工具管理项目时，不希望git管理node_modules文件夹，也不会将其上传到github中.

当其他人获取到项目时，可以在项目根目录下执行`npm install` 命令，npm工具会自动去package.json文件中查找项目依赖文件并下载.

3. 当项目上线以后，可以直接运行`npm install --production`下载项目依赖，避免下载项目开发依赖。

```javascript
 {
    "dependencies": {
        "jquery": "^3.3.1“
    },
    "devDependencies": {
        "gulp": "^3.9.1“
    }

 } 

```
#### 模块查找规则

##### 当模块拥有路径但没有后缀时

```js
require('./find.js');
require('./find');
```

1. require方法根据模块路径查找模块，如果是完整路径，直接引入模块。
2. 如果模块后缀省略，先找同名JS文件再找同名JS文件夹
3. 如果找到了同名文件夹，找文件夹中的index.js
4. 如果文件夹中没有index.js就会去当前文件夹中的package.json文件中查找main选项中的入口文件
5. 如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

##### 当模块没有路径且没有后缀时

```
require('find');
```

1. Node.js会假设它是系统模块
2. Node.js会去node_modules文件夹中
3. 首先看是否有该名字的JS文件
4. 再看是否有该名字的文件夹
5. 如果是文件夹看里面是否有index.js
6. 如果没有index.js查看该文件夹中的package.json中的main选项确定模块入口文件
7. 否则找不到报错
