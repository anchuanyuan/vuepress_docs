---
title:10分钟上手docker
date: 2021.04.17
sidebarDepth: 4
tags:
- dokcer
  categories:
- 运维相关
---

## docker 简单了解及使用

基本内容

![image-20210415001518190](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202104/15/001519-39793.png)

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

![image-20210414222225633](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202104/14/225917-735386.png)

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

![image-20210414222409454](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202104/14/225927-670128.png)



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

![image-20210414232439744](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202104/14/232440-233377.png)

基础构建镜像是nginx  然后复制当前文件到指定的目录下面

```bash
# . 代表当前目录下的Dockerfile文件
docker build -t <指定的镜像名称> .
```

结果:生成了一个新的镜像

运行这个镜像 

![image-20210414234545449](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/images/202104/14/234546-859244.png)

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

