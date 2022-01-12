---
title: 从零开始新建Vue3项目(vite)
date: 2022-01-12
sidebarDepth: 4
tags:
  - Vue3
categories:
  - Vue3
---

# 从零开始新建Vue3项目(vite)

[vue3介绍]()

## 1.vite 创建项目

[vite文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

```bash
yarn create vite my-vue-app --template vue
```

## 2. 引入vue-router路由(v4版本)

[vue-router文档](https://next.router.vuejs.org/zh/guide/#javascript)

```bash
npm install vue-router@4 
# yarn add vue-router@4
```

- 创建 scr/router/index.js  并在 main.js 中引入  app.use(router)

  ```js
  import { createRouter, createWebHistory } from "vue-router"
  // import Test from '../components/Test.vue'
  import NotFound from "../components/NotFound.vue"
  
  const routes = [
    { path: "/test", component: () => import("../components/Test.vue") },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })
  export default router
  
  ```

- 在App.vue 添加 `<router-view>` 标签 就可以使用路由了
-  要在 `setup` 函数中访问路由，请调用 `useRouter` 或 `useRoute` 函数。我们将在 [Composition API](https://next.router.vuejs.org/zh/guide/advanced/composition-api.html#在-setup-中访问路由和当前路由) 中了解更多信息。 

## 3.引入 normalize.css

使浏览器呈现所有 HTML 元素更加一致，并且符合现代 web 标准 

```bash
yarn add normalize.css
```

mian.js 中引入  import "normalize.css"

## 4. 引入unplugin-vue-components'实现组件自动导入

[自动导入组件介绍](https://github.com/antfu/unplugin-vue-components)

- 添加依赖

```
yarn add unplugin-vue-components -D
```

- 在vite.config.js 中进行配置

```js
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
     dirs: ['src/components'],
     include: [/\.vue$/, /\.vue\?vue/],
  	 exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        /*....*/
    }),
  ],
})
```

- 也能对UI组件进行导入 例如:

```js
// vite.config.js
import ViteComponents, {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'

// your plugin installation
Components({
  resolvers: [
    AntDesignVueResolver(),
    ElementPlusResolver(),
    VantResolver(),
  ]
})
```

## 5.引入组件库 element-plus(vue3)

[element-plus](https://element-plus.gitee.io/zh-CN/)

- 添加依赖

  ```bash
  yarn add element-plus
  ```

- 在mian.js中引入

  ```js
  import ElementPlus from "element-plus"
  import zhCn from "element-plus/es/locale/lang/zh-cn"
  
  app.use(ElementPlus, { locale: zhCn })
  ```

## 6.引入vite-plugin-svg-icons 用于生成 svg 雪碧图

[svg雪碧图](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

- 添加依赖

  ```
  yarn add vite-plugin-svg-icons -D
  ```

- vite.config.js进行配置

  ```js
  import viteSvgIcons from 'vite-plugin-svg-icons';
  import path from 'path';
  
  export default () => {
    return {
      plugins: [
        viteSvgIcons({
          // 指定需要缓存的图标文件夹
          iconDirs: [path.resolve(process.cwd(), 'src/icons')],
          // 指定symbolId格式
          symbolId: 'icon-[dir]-[name]',
        }),
      ],
    };
  };
  ```

- 在 src/main.ts 内引入注册脚本

  ```js
  import 'virtual:svg-icons-register';
  ```

- 添加一个组件

​	 /src/components/SvgIcon.vue 

```vue
<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#333',
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      return { symbolId };
    },
  });
</script>
```

- src/icons/ 文件夹下面新建各种.svg图标文件 在组件中引入即可

  ```vue
  <template>
    <div>
      <SvgIcon name="icon1"></SvgIcon>
      <SvgIcon name="icon2"></SvgIcon>
      <SvgIcon name="icon3"></SvgIcon>
      <SvgIcon name="dir-icon1"></SvgIcon>
    </div>
  </template>
  ```

## 7.引入tailwindcss 



- 引入依赖

  ```bash
  yarn add tailwindcss@latest postcss@latest autoprefixer@latest -D
  ```

- 新建 postcss.config.js

  ```js
  // postcss.config.js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
  ```

-  创建配置文件 

  ```
  npx tailwindcss init
  ```

  ```
    // tailwind.config.js
    module.exports = {
     purge: [
       './src/**/*.html',
       './src/**/*.js',
     ],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {},
      plugins: [],
    }
  ```

- 新建 styles/index.css

  ```
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

## 8.引入 prettier 对代码进行格式化 lint-statged 对提交的文件格式化



- 安装依赖

  ```
  yarn add prettier -D
  ```

- 配置文件 .prettierrc.js

  ```js
  module.exports = {
      semi: false, // 行位是否使用分号，默认为true
      printWidth: 200, // 最大打印宽度，超出将换行
      singleQuote: false, // 默认单引号 ，false 默认使用双引号
      bracketSpacing: true,
      jsxBracketSameLine: true,
      htmlWhitespaceSensitivity: "ignore", // 问题1中的设置
    };
  ```

- 提交暂存文件的时候 对 文件进行格式化

  ```bash
  npx mrm@2 lint-staged
  ```

- 对lint-statged的配置进行修改

  ```json
   "lint-staged": {
      "*.{js,css,md,vue}": "prettier --write"
    }
  ```

  

