---
title: element源码阅读
date: 2021-11-20
sidebarDepth: 4
tags:
  - element源码阅读
categories:
  - 进阶
---

# element源码阅读

## 模拟源码 从0开始实现element组件库

## 1.初始化工程 
- 新建一个文件夹 my-ui

- 终端执行 npm init -y 生成package.json 

  ```
  npm init -y
  ```


- 新建src 文件夹 src 文件夹下新建index.js

  暴露install方法 

  ```js
  const install = function(Vue,opt={}){
      console.log('VueUse的时候会自动执行这个方法并接收Vue对象');
  }
  
  export default {
      install
  }
  ```

- 参照源码 准备一个components集合,类型是vue单文件组件,遍历集合并导出每一个组件

  ```
  import Button from '../packages/button/index'
  const components = []
  
  
  const install = function(Vue,opt={}){
      console.log('VueUse的时候会自动执行这个方法并接收Vue对象');
  }
  
  export default {
      install
  }
  ```

- 需要根目录下新建packages文件夹里面写每一个component单文件组件

  以button组件为例

  - packages文件夹新建button/index.js  button/src/index.vue

    ![1637417232573](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202111/20/220827-946155.png)

  - button/index.js  

    ```js
    import Button from "./src/index.vue"
    
    Button.install = function (VUe,opt={}){
        Vue.component(Button.name,Button)
    }
    export default Button
    ```

  - button/src/index.vue

    ```js
    <template>
      <button>myui按钮{{abcd}} {{name}}</button>
    </template>
    
    <script>
    export default {
        name:"MyButton",
        data(){
          text:"abcd"
        },
        props:{
          name:{
            type:String,
            default(){
              return '测试'
            }
          }
        }
    }
    </script>
    
    ```

- 更新根目录下src/index.js逻辑, 将所有packages下面的单文件组件注册到Vue中

  ```js
  import Button from '../packages/button/index'
  const components = [
      Button
  ]
  
  
  const install = function(Vue,opt={}){
      components.forEach(component =>{
          Vue.component(component.name,component)
      })
  }
  
  export default {
      install
  }
  ```

## 2. 引入webpack打包

​	webpack是一个著名的前端代码打包工具

- 添加webpack开发依赖

  ```bash
  npm i webpack -D
  ```

- 根目录下新建build 文件夹里面新建webpack-common.js

  ```js
  const path = require('path')
  const Vueloader = require('vue-loader/lib/plugin')
  // ./webpack.config.js
  /** @type {import('webpack').Configuration} */
  module.exports = {
      mode: "production",
      // mode: "development",
      // 打包文件的入口
      entry: {
          app:['./src/index.js']
      },
      output: {
          // 输出路径
          path: path.resolve(process.cwd(), './lib'),
          publicPath:'/dist/',
          // 打包的文件名字
          filename: 'myui-common.js',
          //
          chunkFilename: '[id].js',
          // library:'ELEMENT',
          libraryExport: 'default',
          libraryTarget: 'commonjs2'
        }
  }
  ```

- 更新根目录package.json的build脚本命令

  ```json
  {
    "name": "my-ui",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "build": "webpack --config build/webpack-common.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  
  ```

- 然后可以打包试一下 会提示你让你安装 webpack-cli 输入yes进行安装

  ![1637418364965](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202111/20/222605-601510.png)

- 然后打包就报错了,因为目前解析不了.vue文件,所以需要添加vueloader

  [vue-loader介绍](https://vue-loader.vuejs.org/zh/)

  ![1637418648220](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202111/20/223049-831756.png)

  ```
  npm install -D vue-loader vue-template-compiler
  ```

- 重新配置webpack配置文件,并进行打包

  ```
  const path = require('path')
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  // ./webpack.config.js
  /** @type {import('webpack').Configuration} */
  module.exports = {
      mode: "production",
      // mode: "development",
      // 打包文件的入口
      entry: {
          app:['./src/index.js']
      },
      output: {
          // 输出路径
          path: path.resolve(process.cwd(), './lib'),
          publicPath:'/dist/',
          // 打包的文件名字
          filename: 'myui-common.js',
          //
          chunkFilename: '[id].js',
          library:'ELEMENT',
          libraryExport: 'default',
          libraryTarget: 'commonjs2'
        },
        module:{
          rules:[
              {
                  test:/\.vue$/,
                  loader:'vue-loader',
                  options: {
                      compilerOptions: {
                          preserveWhitespace: false
                      }
                  }
              }
          ]
        },
        plugins:[
          // 请确保引入这个插件！
          new VueLoaderPlugin()
        ]
  }
  
  ```

  注意这个 plugin 的引入路径要写全  require('vue-loader/lib/plugin') 不然会报莫名其妙的错误

## 3.引入到实际的项目中使用

- 把npm项目打包,生成.tgz文件,并把打包的文件在vue项目中进行安装(直接npm i ".tgz文件绝对路径就行了")

  ```bash
  npm pack
  ```

- 打包的时候要修改package.json文件mian的配置 wenpack的配置文件 library:'ELEMENT', 也暂时先注释掉,不然打出来的包默认引用会带这个名称

  ```js
  "main": "lib/myui-common.js",
  ```

  

## 4.给组件添加样式

暂时留空

