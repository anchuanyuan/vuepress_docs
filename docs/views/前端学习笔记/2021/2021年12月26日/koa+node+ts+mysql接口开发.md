---
title: koa+node+ts+mysql接口开发
date: 2021-12-26
sidebarDepth: 4
tags:
  - NodeJS
categories:
  - NodeJS
---

# koa + ts + mysql 开发后台接口

## 01-初始化项目

- 新建文件夹 

  ```
  npm init -y
  ```

- 安装依赖 koa koa-router @types/koa  @types/koa-router

  ```bash
  yarn add  koa koa-router @types/koa  @types/koa-router
  ```

- 根目录新建index.ts   app文件夹 app下新建 controller/index.ts router/index.ts

  index.ts

  ```typescript
  import run from "./app";
  
  run(9999)
  ```

  app/index.ts

  ```typescript
  import Koa from 'koa'
  import router from './router'
  import {Server} from 'http'
  
  const app = new  Koa()
  app.use(router.routes())
  
  const run = (port:Number):Server =>{
     return app.listen(port)
  }
  
  export default run
  ```

  app/router/index.ts

  ```typescript
  import  KoaRouter from 'koa-router'
  
  const router = new KoaRouter({prefix:'/api'})
  import IndexController from '../contorller/index'
  
  router.get('/',IndexController.index)
  
  export default router
  
  ```

- app/contorller/index.ts

  ```typescript
  import { Context } from "koa";
  
  class IndexController {
      index (ctx:Context) {
          ctx.body = ['a','b']
      }
  }
  
  export default new IndexController()
  ```

  

- 安装ts-node  typescript

  ```bash
  yarn add ts-node typescript -D
  
  # 启动服务
  ts-node index.ts
  ```

  