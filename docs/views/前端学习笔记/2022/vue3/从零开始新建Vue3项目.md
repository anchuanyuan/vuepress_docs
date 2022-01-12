# 从零开始新建Vue3项目(vite)

## 1.vite 创建项目

[vite文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

```bash
yarn create vite my-vue-app --template vue
```

## 2. 引入路由(v4版本)

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

