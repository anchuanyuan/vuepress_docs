---
title: 10分钟上手docker
date: 2021.04.17
sidebarDepth: 4
tags:
  - dokcer
categories:
  - 运维相关
---


## docker 简单了解及使用

基本内容

![1618627238188](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202104/17/104039-279438.png)

### 下载镜像

```bash
#:可以指定版本号 不指定默认就是latest 最新的
docker pull nginx
```

### 查看本地有哪些镜像

```
docker images
```

### 运行容器

```bash
# -d 后台运行  -p端口映射
docker run -d -p 90:80 nginx
```

运行后的结果

![1618627255805](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202104/17/104056-27352.png)

### 查看正在运行的容器

```bash
docker ps
```

### 对容器进行修改

```bash
docker exec -it <容器Id(前几位即可,只要能区分就行)> bash
#进入容器环境 修改默认文件内容
/usr/share/nginx/html# echo hello docker > index.html

```

![1618627267612](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202104/17/104108-122009.png)



#### 强制删除容器

```
docker  rm -f <容器id>
```

### 提交修改的镜像

```
docker commit <容器id> <提交的名称>
```

结果:把你的修改保存成新的镜像

### dockerFile 构建镜像

示例: 新建Dockerfile 文件 热熔如下

![1618627283770](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202104/17/104124-973152.png)

基础构建镜像是nginx  然后复制当前文件到指定的目录下面

```bash
# . 代表当前目录下的Dockerfile文件
docker build -t <指定的镜像名称> .
```

结果:生成了一个新的镜像

运行这个镜像 

![1618627293101](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202104/17/104133-991970.png)

### 删除docker 镜像

```bash
docker rmi <镜像名称>
```

### 查看所有容器

```
docker ps -a
```

### 通过 save保存  load加载docker 简单了解及使用

```
docker save <镜像名称> > xxx.tar(导出的文件名)

docker load < xxx.tar(要导入的镜像文件)

```

#### docker run的时候 一些常用的参数

```
--name 指定容器运行时的名字
-v 映射路径
```
