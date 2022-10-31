---
title: index

date: 2022-08-31

sidebarDepth: 4

tags:
  - python
categories:
  - python
---

# python-01

## pip 更换国内源

在本机的user目录下新建一个pip目录，新建文件pip.ini，代码如下：

```text
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

```text
常用国内原地址 
阿里云 https://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
豆瓣(douban) http://pypi.douban.com/simple/
清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/
```
