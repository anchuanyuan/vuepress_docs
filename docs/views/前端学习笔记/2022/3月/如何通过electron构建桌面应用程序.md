---
title: 如何通过electron和vue构建桌面应用程序
date: 2022.03.06
sidebarDepth: 4
tags:
  - electron
categories:
  - electron
---

## 什么是electron?

一个 使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序 的技术

这是官网地址[官网](https://www.electronjs.org/)

官网的介绍如下

 Electron 基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。 

 Electron 兼容 Mac、Windows 和 Linux，可以构建出三个平台的应用程序。 

....

![1646577150497](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1646577150497.png)

官网有这么一段示例demo

```
#克隆
git clone https://github.com/electron/electron-quick-start

#进入目录
cd electron-quick-start

#安装依赖
npm install && npm start
```

我们下载下来 研究一哈目录,随便点点 看看写了什么

![1646578003476](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/224644-47416.png)

我们隐约猜到大概就是electron帮我们启动了一个谷歌浏览器,然后用这个浏览器打开了一个HTML页面



那我们就想了 那这玩意有啥用啊,我直接写html 用浏览器打开那不是一样吗?

其实并不是, 谷歌浏览器他只能执行js, 但是不能执行nodejs,也就是说 像nodejs直接读取硬盘文件这种系统交互的操作浏览器是做不到的(也不是完全不能,只是因为安全性原因有所限制)

因为有运行nodejs的能力,所以就完全可以看成一个桌面程序了

有些桌面软件就是基于electron制作的, 我们所熟知的就有 `visio studio code` IDE编辑和 `Typroa`编辑器等

## 浅尝一下

把刚才的工程安装好依赖并运行

这里我还是习惯用 yarn 作为包管理工具代替npm 进行包依赖的下载

工程目录下输入

```
yarn
```

哦吼 报错了

![1646578861043](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/230101-946921.png)

大概意思就是我没有 yarn 作为包管理的 .lock文件 

那我就吧 npm package-lock.json 删掉 再装一遍试试

![1646578940810](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1646578940810.png)

哦豁 又报错了

![1646579130930](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/230531-188026.png)

404 仓库找不到electron

我们得去找个靠谱的electron 镜像地址 因为源版地址在海外正常下载估计得个把月才能把那个几十MB包下载下来

- 我们来试试淘宝的镜像

  ![1646579728623](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/231528-984661.png)

执行下面的命令

```
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/

yarn
```

ok 开始下载了 挺快的 淘宝还挺管事  用了近140s

![1646579983281](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/231944-600329.png)

好的 看package.json 里面就一个脚本命令 咱们启动

```
yarn start
```

ok 桌面程序启动成功了 

![1646580091242](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232131-378829.png)

改改html里面的内容

![1646580190810](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232312-892592.png)

重载一下页面

![1646580388954](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232629-656339.png)

ok 页面生效了

![1646580614140](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/233014-643151.png)

## 浅尝一下nodejs的能力

看看nodejs 的api怎么读取系统文件目录的,我们尝试遍历一下当前目录

![1646580859961](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/233421-984018.png)

照着文档 写函数 获取文件名字遍历输出

![1646582968649](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/000929-307631.png)

ok 完事了 就遍历了一层 有些其实还是目录(node_moudules等都是目录,不重要 就是验证一nodejs能力)

![1646583023932](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/001025-103347.png)

好的 就到这里 后面讲如何把一个vue项目 直接变成一个electron项目,并完成系统托盘 开机自启 自动更新等功能

打包分发等

## 把vue项目变成electron项目

很简单 如果是vue2 + webpack 项目 两部就能完成

1. vue 工程里面直接执行如下命令

   ```
   vue add electron-builder
   ```

2. 尝试运行



## 演示一遍 vue项目变成electron

### 我们初始化一个vue2的项目

得确保自己安装了 vuecli 脚手架工具

yarn add @vue/cli -g

```
vue create vue-electron-demo
# 一路回车
```

![1646583691555](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002132-862149.png)

### 启动一下项目

```
cd vue-electron-demo
npm  run server
```

![1646583887469](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002447-815852.png)

ok 项目正常

![1646583929673](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002529-215688.png)

### 变成electron项目

```
vue add electron-builder
# 有选择就按回车 选最新版本就行
```

![1646584041167](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1646584041167.png)

好的安装完成了

发现文件目录有所变化,package.json 多了electron,启动命令 src下面还多了个background.js

![1646584193384](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002955-919395.png)

### 启动试试

```
yarn run electron:serve
```

哦吼!一个vue项目直接变成桌面程序启动了!

![1646584428880](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/003350-631220.png)

## 后面说怎么打包 怎么做图标 托盘 开机自启 主进程 和渲染进程通信等等

### 打包

待续...
