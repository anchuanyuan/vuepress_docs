---
title: vue冷知识
date: 2022-02-22
sidebarDepth: 4
tags:
  - Vue
categories:
  - Vue
---

## 【Vue】生产环境能使用Devtools

```js
__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', (document.querySelector('#app').__vue__.__proto__.constructor.config.devtools = true) && document.querySelector('#app').__vue__.__proto__.constructor)
```

## 在览器直接查看vue实例

选中元素

在控制台输入
```js
$0.__vue__
```