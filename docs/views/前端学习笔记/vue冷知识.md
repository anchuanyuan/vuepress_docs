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

## 如何更好地封装组件？几个小技巧助你成为组件封装达人

### 先说问题:

假设你二次封装了一个组件 el-input

然后你想把 父组件的clearabel 属性传递给el-iput的组件的clearabel 来控制他是否能清除数据

但是如果封装的组件有大量的属性怎么办?

挨个写一遍吗?

```html
<my-input :clearable="true">


//MyInput.vue
    <template>
         <el-input v-mode="val" :clearable="clearable">
   		</el-input>
    </template>
    <script>
    export deafault {
        data() {
            return: {
                val:1
            }
        },
        props:{
            clearable:{
                type: Boolean,
                default: false    
            }
        }    
    }
    </script>
 
```

### $attrs简化封装过程

![1648270334458](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202203/26/125215-790918.png)

简化

```
<my-input :clearable="true">


//MyInput.vue
    <template>
         <el-input
         v-mode="val" 
         v-bind="$attrs">
   		</el-input>
    </template>
    <script>
    export deafault {
        data() {
            return: {
                val:1
            }
        },
     
    }
    </script>
```

### $listenters / $slot同理


### 在vue项目中，想使用sass,需要注意webpack版本

webpack4及以上安装sass，以下命令即可
```bash
#npm
npm i -D sass-loader@^10 sass
#yarn
yarn add sass-loader@^10 sass --dev

```









