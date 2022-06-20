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

