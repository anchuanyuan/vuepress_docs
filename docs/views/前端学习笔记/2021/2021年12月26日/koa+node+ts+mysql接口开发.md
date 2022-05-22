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

  

## 02 使用nodemon 热重载

- 根目录下面新建nodemon.json

  ```
  {
      "watch":["app/**/**.ts","index.ts"],
      "ignore":["node_modules"],
      "exec": "ts-node index.ts",
      "ext":".ts"
  }
  ```

- 安装 nodemon 

  ```bash
  npm i -g nodemon
  ```

- 修改 package.json 启动脚本

  ```json
    "scripts": {
      "start": "nodemon"
    },
  ```

## 03 使用jest进行单元测试

- 安装 jest @type/jest  ts-jest

  ```bash
  yarn add jest @type/jest ts-jest -D
  ```

- 根目录下面新建test 目录

  test/index.test.ts

  ```
  describe('sum',()=>{
      it('sum 1', ()=>{
          expect(1 + 1).toEqual(2)
      })
  })
  ```

- 安装jest run 插件

  ![1640617481531](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202112/27/230442-600148.png)

![1640617489629](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202112/27/230451-988170.png)

- 使用网络请求进行单元测试

  - 安装包含网络测试的包 supertest @types/supertest -D 

    ```
    yarn add supertest @types/supertest -D
    ```

    初始化配置文件

    ```
    yarn ts-jest config:init
    ```

    test/http.test.ts

    ```typescript
    
    import request from 'supertest'
    import run from '../app/index'
    import {Server} from 'http'
    describe('http测试',()=>{
        let server: Server;
        beforeAll( ()=>{
            server = run(3000)
        })
        it('GET /api', ()=>{
            return request(server)
            .get('/api')
            .expect(200)
        })
        afterAll( ()=>{
            server.close()
        })
    })
    ```

  - 报错就安装 typescript      npm i  typescript   -g 并初始化 ts 配置文件

    

## 04 使用dotevn区分环境

- 安装依赖

  ```
  yarn add dotenv @types/dotenv
  ```

- 新建.evn 文件(通用做法是这个文件不被版本控制 都是新建一个 .envexample )

  ```properties
  NODE_ENV=dev
  PORT=9000
  
  DB_HOST=localhost
  DB_DATABASE=test
  DB_USERNAME=test
  DB_PASSWORD=123456
  DB_PORT=3306
  ```

  

- 修改入口文件

  ```typescript
  //引用文件
  import Koa from 'koa'
  import router from './router'
  import {Server} from 'http'
  import dotenv from 'dotenv'
  //dotenv.config()
  //console.log(process.env);
  
  
  const app = new  Koa()
  app.use(router.routes())
  
  const run = (port:any):Server =>{
     return app.listen(port)
  }
  
  export default run
  ```

- app/config/index.ts

  ```typescript
  import dotenv from 'dotenv'
  dotenv.config()
  export default {
      server:{
          port: process.env.PORT
      },
      db:{
          host:process.env.DB_HOST,
          database:process.env.DB_DATABASE,
          username:process.env.DB_USERNAME,
          password:process.env.DB_PASSWORD,
          port:process.env.DB_PORT
      }
  }
  ```

## 05 使用log4j收集日志

[log4js npm介绍](https://www.npmjs.com/package/log4js)

![1641371486803](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202201/05/164134-154020.png)

- 添加log4js依赖

  ```
  yarn add log4js @types/log4js
  ```

- app/logger/index.ts

  ```typescript
  import { configure, getLogger } from "log4js";
   
  configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
  });
  
  export default getLogger()
  ```

- 控制器中使用

  ```typescript
  import { Context } from "koa";
  import logger from '../logger'
  class IndexController {
      index (ctx:Context) {
          logger.info('msg',ctx)
          ctx.body = ['a','b',"c",'d','q123']
      }
  }
  
  export default new IndexController()
  ```

## 06 使用sequelize-typescript orm框架

[sequelize介绍](https://github.com/demopark/sequelize-docs-Zh-CN)

[中文简介](https://www.sequelize.com.cn/)

[sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)

- 前置依赖 @types/node @types/validator

  ```
  yarn add  @types/node @types/validator -D
  ```

- 需要的依赖

  ```bash
  yarn add sequelize reflect-metadata sequelize-typescript
  ```

- tsconfig.json 需要重新配置

  ```bash
  "target": "es6", // or a more recent ecmascript version
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
  ```

- db/index.ts

  ```typescript
  import path from 'path';
  import  {Sequelize} from 'sequelize-typescript'
  import config from '../config';
  console.log(config);
  
  const sequelize = new Sequelize(config.db.database as string, config.db.username as string, config.db.password, {
      host: config.db.host,
      port:Number(config.db.port),
      dialect:'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
      models:[path.join(__dirname,'models','**/*.ts'),path.join(__dirname,'models','**/*.js')],
      define:{
        timestamps:false,
        updatedAt:'updatedAt',
        createdAt:'createdAt',
      }
    });
    
    const db =async()=>{
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
  export default db
  ```

- service/UserService.ts

  ```typescript
  import User from "../db/models/UserModel";
  class UserService {
      async getUser(){
        return  await User.findOne({where:{name:'zs'}})
      }
  }
  
  export default new UserService
  ```

- db/models/UserModel.ts

  ```typescript
  import { Column, Model, Table,PrimaryKey } from "sequelize-typescript";
  
  @Table({ tableName: 'User'})
  export default class User extends Model {
      @Column
      name!:string 
  }
  ```

- 控制器

  ```typescript
  import { Context } from "koa";
  import logger from '../logger'
  import UserService from "../service/UserService";
  class IndexController {
      async index (ctx:Context) {
          logger.info('msg',ctx)
          const user =await UserService.getUser()
          ctx.body ={ arr:['a','b',"c",'d','q123'], user}
      }
  }
  
  export default new IndexController()
  ```

