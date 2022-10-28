---
title: knowledge

date: 2022-06-10

sidebarDepth: 4

tags:
    - knowledgeExtension
categories:
    - Tip
---

# 每日知识扩充-Preloading modules

在vite 作为开发工具的时候 有`build.polyfillModulePreload`这样一个配置项

下面是 网络上对 polyfillModulePreload 的解释

[modulepreload](https://developer.chrome.com/blog/modulepreload/)

[相关博客](https://blog.csdn.net/huangyangquan3/article/details/118642384)

[相关介绍](https://guybedford.com/es-module-preloading-integrity#modulepreload-polyfill)

ts 项目 

# 2022年6月13日14:27:34 探究babel背后的工作原理
[babel背后的工作原理](https://juejin.cn/post/7108268258020556836#heading-15)
[Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)

js项目 路径识别问题
jsconfig.json
```json
{ 
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```
## 2022年10月28日23:41:35
### 设置阿里镜像
npm config set registry=https://registry.npmmirror.com
npm config set disturl=https://registry.npmmirror.com/-/binary/node
 
### 设置electron仓库
npm config set electron_mirror=https://registry.npmmirror.com/-/binary/electron/
