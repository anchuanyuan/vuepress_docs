---
  title: Tailwind CS
  date: 2021.4.27 
  sidebarDepth: 4 1
  tags:   
  	- CSS
  categories:   
  	- 前端学习笔记
---

##  Tailwind CSS  

### 开发环境的安装和设置

1. Vanilla(纯HTML,CSS,JS项目)

- npm init 项目
- 安装开发依赖 tailwindcss postcss-cli autoprefixer 

```bash
npm I tailwindcss postcss-cli autoprefixer -d
```

- 进入文件夹 初始化tailwind.config.js和postcss.config.js

```bash
npx tailwindcss init -p
```

- 新建css文件夹,style.css文件 

```css
// 用@tailwind 这个关键词 载入Tailwind核心的三大部件 base components utilities
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 在script里面新增一个脚本

```json
"watch": "postcss css/style.css -o dist/css/style.css --wathc" 
```

运行这个脚本后会生成18万行的css代码

- 新建html文件导入css 尝试使用标签,建议下个插件这样有提示

- 压缩代码

  生成css大概有3M,但是在tailwind.config.js的purge属性可以进行设置(感觉起来类似于树摇)

  ```
  // 在这个数组里面填写需要的css样式文件
  purage:[
  "./dist/**/**.html"
  ]
  //新建生成脚本
  "build" :" NODE_ENV=product postcss -o dist/css/style.css"
  ```

2. vue

- vite 安装vue

- 安装开发依赖 tailwindcss atuoprefixer postcss(同上)

  ```bash
  npm i tailwindcss postcss-cli autoprefixer -d
  ```

  

- 进入文件夹 初始化tailwind.config.js和postcss.config.js(同上)

  ```bash
  npx tailwindcss init -p
  ```

  

- tailwind.config.js 的purge设定

  ```
  purge:[
  "./inde.html",
  "./src/**/**{vue,js,ts,jsx,tsx}"
  ]
  ```

- src 下面新增index.css 引入三大部件(同上)

- 然后main.js引入这个css

- 添加测试样式,build的时候 得益于上面purge的设定自动树摇,生成的文件大概只有3k多

  

3. react (由于我不用react 直接上地址吧)

4. [CodingStartup起码课 视频讲解](https://www.bilibili.com/video/BV1fp4y1x752?p=1&t=477)

   文章结束 感谢up的技术视频 

### 普通vue2项目添加tialwind





如果报错,尝试修改降低版本

```
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

