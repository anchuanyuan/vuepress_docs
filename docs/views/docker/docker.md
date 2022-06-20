---
title: docker 常用命令
date: 2022.01.17
sidebarDepth: 4
tags:
  - dokcer
categories:
  - 运维相关
---


#  docker 常用命令

## docker从容器里面拷文件到宿主机或从宿主机拷文件到docker容器里面
###  从容器里面拷文件到宿主机
 docker cp 容器名：要拷贝的文件在容器里面的路径       要拷贝到宿主机的相应路径 
```bash
 docker cp testtomcat：/usr/local/tomcat/webapps/test/js/test.js /opt
```

###  宿主机拷文件到docker容器
  docker cp 要拷贝的文件路径 容器名：要拷贝到容器里面对应的路径
```bash
 docker cp /opt/test.js testtomcat：/usr/local/tomcat/webapps/test/js
```

镜像操作

```
docker search images_name       # 查看仓库的镜像资料
docker pull images_name         # 下载镜像
docker images                   # 显示本地镜像
docker rmi images_name/image_id # 删除本地镜像

```

容器命令

```
docker ps        #查看当前运行的容器
docker ps -a     #查看存在的所有容器
docker stop      #停止容器
docker start     #运行容器
docker restart   #重启容器
docker rm container_id/container_name #删除容器
docker logs [options] container_id/container_name     #查看容器日志，出错或者调试可用
docker exec -it container_id/container_name [/bin/bash 或者 sh]  #进入容器分配一个终端/bin/bash，不存在就用sh
exit #在容器内部 
docker commit container_id/container_name # 将容器
```

卷操作

```
#查看本地volume
docker volume ls
#删除指定volume
docker volume rm volume_id/volume_name
#删除所有的volume
docker volume prune

```

network

```
#查看docker中存在的网络
docker network ls

#查看网络的详细信息
docker network inspect

#自定义网络（默认是bridge类型）
docker network create front-net

#将容器web1 和 web2 加入网络，这样容器web1 和 web2 用这个来两个名字就能互相ping同，会自动进行DNS解析
docker network connect front-net web1
docker network connect front-net web2

#断开连接
docker network disconnect front-net web1
docker network disconnect front-net web2

```

