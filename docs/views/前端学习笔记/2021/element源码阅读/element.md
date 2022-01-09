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

  ```js
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

- packages/theme-chalk/src 新建button.scss

  ```scss
  .el-button {
      background-color: #36c442;
  }
  ```

   按照官方的实现方式 是使用了gulp来进行了样式的处理

  ```
   "build:theme": "node build/bin/gen-cssfile && gulp build --gulpfile packages/theme-chalk/gulpfile.js && cp-cli packages/theme-chalk/lib lib/theme-chalk"
  ```

- 安装这些依赖

  ```
  yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass -D
  ```

- packages/theme-chalk/src 新建gulpfile.js

  ```js
  const { series, src, dest } = require('gulp');
  const sass = require('gulp-dart-sass');
  const autoprefixer = require('gulp-autoprefixer');
  const cssmin = require('gulp-cssmin');
  
  function compile() {
    return src('./src/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest('./lib'));
  }
  function copyfont() {
    return src('./src/fonts/**')
      .pipe(cssmin())
      .pipe(dest('./lib/fonts'));
  }
  
  exports.build = series(compile, copyfont);
  ```

- 新建index.scss

  ```scss
  @import "./button.scss";
  ```

- package添加css打包命令

  ```bash
  gulp build --gulpfile packages/theme-chalk/gulpfile.js
  ```

- 执行以后生成了同名的测css文件在 theme-chalk/lib目录下面, 现在把它拷贝到最外层lib下面

  - 安装cp-cli包

    ```bash
    yarn add cp-cli -D
    # 报错:找不到  tslib  yarn add tslib -D 可以解决
    ```

  - 修改构建脚本

    ```bash
    gulp build --gulpfile packages/theme-chalk/gulpfile.js &&  cp-cli packages/theme-chalk/lib lib/theme-chalk
    ```

- button.scss 详细使用

  ```scss
  @charset "UTF-8";
  @import "common/var";
  @import "mixins/button";
  @import "mixins/mixins";
  @import "mixins/utils";
  
  @include b(button) {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: $--button-default-background-color;
    border: $--border-base;
    border-color: $--button-default-border-color;
    color: $--button-default-font-color;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: $--button-font-weight;
    @include utils-user-select(none);
    & + & {
      margin-left: 10px;
    }
  
    @include button-size($--button-padding-vertical, $--button-padding-horizontal, $--button-font-size, $--button-border-radius);
  
    &:hover,
    &:focus {
      color: $--color-primary;
      border-color: $--color-primary-light-7;
      background-color: $--color-primary-light-9;
    }
  
    &:active {
      color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
      border-color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
      outline: none;
    }
  
    &::-moz-focus-inner {
      border: 0;
    }
  
    & [class*="el-icon-"] {
      & + span {
        margin-left: 5px;
      }
    }
  
    @include when(plain) {
      &:hover,
      &:focus {
        background: $--color-white;
        border-color: $--color-primary;
        color: $--color-primary;
      }
  
      &:active {
        background: $--color-white;
        border-color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
        color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
        outline: none;
      }
    }
  
    @include when(active) {
      color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
      border-color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
    }
  
    @include when(disabled) {
      &,
      &:hover,
      &:focus {
        color: $--button-disabled-font-color;
        cursor: not-allowed;
        background-image: none;
        background-color: $--button-disabled-background-color;
        border-color: $--button-disabled-border-color;
      }
  
      &.el-button--text {
        background-color: transparent;
      }
  
      &.is-plain {
        &,
        &:hover,
        &:focus {
          background-color: $--color-white;
          border-color: $--button-disabled-border-color;
          color: $--button-disabled-font-color;
        }
      }
    }
  
    @include when(loading) {
      position: relative;
      pointer-events: none;
  
      &:before {
        pointer-events: none;
        content: '';
        position: absolute;
        left: -1px;
        top: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: inherit;
        background-color: rgba(255,255,255,.35);
      }
    }
    @include when(round) {
      border-radius: 20px;
      padding: 12px 23px;
    }
    @include when(circle) {
      border-radius: 50%;
      padding: $--button-padding-vertical;
    }
    @include m(primary) {
      @include button-variant($--button-primary-font-color, $--button-primary-background-color, $--button-primary-border-color);
    }
    @include m(success) {
      @include button-variant($--button-success-font-color, $--button-success-background-color, $--button-success-border-color);
    }
    @include m(warning) {
      @include button-variant($--button-warning-font-color, $--button-warning-background-color, $--button-warning-border-color);
    }
    @include m(danger) {
      @include button-variant($--button-danger-font-color, $--button-danger-background-color, $--button-danger-border-color);
    }
    @include m(info) {
      @include button-variant($--button-info-font-color, $--button-info-background-color, $--button-info-border-color);
    }
    @include m(medium) {
      @include button-size($--button-medium-padding-vertical, $--button-medium-padding-horizontal, $--button-medium-font-size, $--button-medium-border-radius);
      @include when(circle) {
        padding: $--button-medium-padding-vertical;
      }
    }
    @include m(small) {
      @include button-size($--button-small-padding-vertical, $--button-small-padding-horizontal, $--button-small-font-size, $--button-small-border-radius);
      @include when(circle) {
        padding: $--button-small-padding-vertical;
      }
    }
    @include m(mini) {
      @include button-size($--button-mini-padding-vertical, $--button-mini-padding-horizontal, $--button-mini-font-size, $--button-mini-border-radius);
      @include when(circle) {
        padding: $--button-mini-padding-vertical;
      }
    }
    @include m(text) {
      border-color: transparent;
      color: $--color-primary;
      background: transparent;
      padding-left: 0;
      padding-right: 0;
  
      &:hover,
      &:focus {
        color: mix($--color-white, $--color-primary, $--button-hover-tint-percent);
        border-color: transparent;
        background-color: transparent;
      }
      &:active {
        color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
        border-color: transparent;
        background-color: transparent;
      }
  
      &.is-disabled,
      &.is-disabled:hover,
      &.is-disabled:focus {
        border-color: transparent;
      }
    }
  }
  
  @include b(button-group) {
    @include utils-clearfix;
    display: inline-block;
    vertical-align: middle;
  
    & > .el-button {
      float: left;
      position: relative;
      & + .el-button {
        margin-left: 0;
      }
      &.is-disabled {
        z-index: 1;
      }
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:first-child:last-child {
        border-top-right-radius: $--button-border-radius;
        border-bottom-right-radius: $--button-border-radius;
        border-top-left-radius: $--button-border-radius;
        border-bottom-left-radius: $--button-border-radius;
  
        &.is-round {
          border-radius: 20px;
        }
  
        &.is-circle {
          border-radius: 50%;
        }
      }
      &:not(:first-child):not(:last-child) {
        border-radius: 0;
      }
      &:not(:last-child) {
        margin-right: -1px;
      }
  
      &:not(.is-disabled) {
        &:hover,
        &:focus,
        &:active {
          z-index: 1;
        }
      }
  
      @include when(active) {
        z-index: 1;
      }
    }
    
    & > .el-dropdown {
      & > .el-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-color: rgba($--color-white, 0.5);
      }
    }
  
    @each $type in (primary, success, warning, danger, info) {
      .el-button--#{$type} {
        &:first-child {
          border-right-color: rgba($--color-white, 0.5);
        }
        &:last-child {
          border-left-color: rgba($--color-white, 0.5);
        }
        &:not(:first-child):not(:last-child) {
          border-left-color: rgba($--color-white, 0.5);
          border-right-color: rgba($--color-white, 0.5);
        }
      }
    }
  }
  ```

  - 有个b函数,按照element 进行补全

    theme-chalk/src/minxs => mixinx.scss config.scss utils.scss function.scss _button.scss

