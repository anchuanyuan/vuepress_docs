---
title: 关于vue2 element 的打IE11兼容性问题
date: 2021-05-24
sidebarDepth: 4
tags:
  - JS进阶
categories:
  - 前端学习笔记
---

## 关于 vue2 element 的打 IE11 兼容性问题

项目环境

vue2.x

element

需求兼容 ie11

现象 1: 打包后 ie11 显示 ElementUI 语法有错误

尝试在 vue.config.js 里面加入这一句

```js
transpileDependencies: [/node_modules[/\\\\](element-ui|vuex|)[/\\\\]/],
```

![1621648174098](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1621648174098.png)

开发环境可能不再报错

现象二: 打包发布以后 Element 继续报错 exports is not defined

![1621648310860](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202105/22/095151-654758.png)

查阅发现网友给出答案

解决 : 在 babel.config.js 中加入如下代码 (注意格式)

![1621648527687](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202105/22/095529-582681.png)

注意这要再套一个数组

相关参考:

[官网对 transpileDependencies 参数的说明](https://cli.vuejs.org/zh/config/#transpiledependencies)

[网友的回答](https://bbs.csdn.net/topics/393535515)
