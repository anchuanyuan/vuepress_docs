---
title: 【chrome】你只会使用console.log吗？
sidebarDepth: 4
tags:
  - 工具
categories:
  - 工具
---


# 【chrome】你只会使用console.log吗？

```js
Object.keys(console)

['debug', 'error', 'info', 'log', 'warn', 'dir', 'dirxml', 'table', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp', 'context', 'memory']
```

## 快捷打印多个变量

利用es6 的对象简写

```
const a = 1
const b = 2
const c = 3

console.log({a,b,c})
```

##  控制样式
```
console.log
console.info
console.warn
console.error
```

## 获得执行时间

```
console.time('time') 
for(let i=0;i<1000;i++){
    
}

console.timeEnd('time')  // 必须和上面time的名字字符串保持一致
// time: 30282.838134765625 ms 
```

## 打印对象默认收起状态 

console.dir

## dir 还可以用来查看文档节点属性
console.dir(document)
console.dir($0)

## 表格打印
console.table

## 控制打印样式

```js
let a = 10
console.log(`%c ${a}`, `background-color: pink`)
// 打印输出的颜色就是 后面指定的颜色
```
