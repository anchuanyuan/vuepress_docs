---
title: css收集样式
date: 2022.03.36
sidebarDepth: 4
tags:

  - CSS
categories:
  - CSS
---

### boxshaodw 之多重阴影

![1648267687181](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202203/26/120807-247184.png)

![1648267696469](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202203/26/120817-177692.png)

```
.player{
    position:relative;
    width:500px;
    min-height:100px;
    background: #fbfbfb;
    border:2px solid #fff;
    border-radius:80px;
    box-shadow:-10px -10px 15px #fff,
    10px 10px 15px rgba(0,0,0,0.1),
    inset -5px -5px 15px #fff,
    inset 5px 5px 15px rgba(0,0,0,0.1);
}
```

css 工具
1、Neumorphism
地址：https://neumorphism.io/
2、带有渐变的图标
地址：https://www.iconshock.com/svg-icons/
3、Interactions
地址：https://easings.co/
4、pattern.css
地址：https://bansal.io/pattern-css
5、自定义形状分隔线
地址：https://www.shapedivider.app/

### unocss 在vuecli(webpack)中的配置 不起作用
	参考一下配置

根目录 unocss.config.js
```js
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
module.exports =  {
  presets: [
    presetAttributify(),
    presetUno()
  ]

}
```
vue.config.js

```js
module.exports = {
  //...
  configureWebpack : {
    plugins: [
      //...
      UnoCSS({})
    ]
  },

//...

  chainWebpack(config) {
    // ...
    config.when(process.env.ENV !== 'development', (config) => {
      config.module.rule('vue').uses.delete('cache-loader')
      config.merge({
        cache: false,
      })
    })
		//  ...
  }
}

```
