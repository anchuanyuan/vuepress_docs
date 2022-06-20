---
title: vue 项目 webpack 配置代理，报错代理失败
date: 2021-07-07
sidebarDepth: 4
tags:
  - Vue
categories:
  - 前端学习笔记
---

## vue 项目 webpack 配置代理，报错代理失败，Proxy error: Could not proxy request xxx from xxx

1. 原因

- 是因为代理对象没有开启服务，不能访问到对象服务器
- 代理规则写错

2. 代理设置说明

```js
    // ...
    devServer: {
        proxy: {
        '/api': {
            target: 'http://localhost:8080', // 要代理的路径
            changeOrigin: true, // 是否改变域名
            pathRewrite: {  // 把路径重写 比如 你 原本请求的是 xxxx/api/login  => xxxx/login
            '^/api': ''
            }
        }
    }
  // ...
```

参考文章

[大吕十六 不见长安 vue 项目 webpack 配置代理，报错代理失败](https://blog.csdn.net/qq_43305958/article/details/108442901)

[ 刘运召 vue-cli 3.0 之跨域请求 devServer 代理配置](https://blog.csdn.net/Liu_yunzhao/article/details/90520028)
