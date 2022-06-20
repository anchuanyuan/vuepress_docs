---
  title: springboot框架-02
  date: 2021.10.11
  sidebarDepth: 4
  tags:   
  	- JavaSE 
  categories:   
  	- java
---

## 1.学习目标

![1633856334880](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/165855-145360.png)

## 2.Mybatis整合&数据访问

使用SpringBoot开发企业项目时，持久层数据访问是前端页面数据展示的基础，SpringBoot支持市面上常
见的关系库产品（Oracle、Mysql、SqlServer、DB2等）对应的相关持久层框架，当然除了对于关系库访问的支持，也支持当下众多的非关系库（Redis、Solr、MongoDB等）数据访问操作，这里主要介SpringBoot集成Mybatis并实现持久层数据基本增删改查操作。

### 2.1.SpringBoot整合Mybatis

#### 2.1.1.环境整合配置

- Idea下创建Maven普通工程springboot_mybatis

![1633856629483](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/170349-640835.png)

- pom.xml 添加核心依赖

```xml

```

- application.yml 整合配置

```yml

```

#### 2.1.2. 源代码添加

- javaBean 对象定义



- Dao层接口方法定义

  com.xxx.springboot.dao 包下创建UserMapper.java 接口声明调查方法

  ```
  package com.xxx.springboot.dao
  
  import com.xxx.springboot.po.User
  
  pulic interface UserMapper {
  	// 根据用户名查询用户记录
  	User queryUserByUserName (String userName)
  }
  ```

- SQL映射文件添加

resource/mappers 目录下添加UserMapper.xml 配置, 查询statement

```xml
<?xml version="1.0" encoding="utf-8"?>
<DOCTYPE mapper PUBLIC "-//mybatis.org//DTDMapper3.0//EN""http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xxxx.springboot.dao.UserMapper">
    <select id="queryUserByUserName"parameterType="string"resultType="com.xxxx.springboot.po.User">
        select
        id,user_name,user_pwd
        from tb_user
        where user_name=#{userName}
    </select>
</mapper>
```

- 添加service、controller 对应代码

userService.java

```java
@service
pubic class UserService {
	@Autowired
    private UserMapper userMapper
        
    public User queryUserByUserName ( String userName) {
        return userMapper.queryUsesrByUserName(userName)
    }
    
}
```

UserController.java

```java
@RestController
public class UserController () {
	@Resource
    private UserService userSevice
    
    @GetMapping("user/{uername}")
    public User queryUserByUserName (String userName) {
        return userService.queryUserByUserName(userName)
    }
}
```

- 添加应用启动入口

```java
@SpringBootApplication
@MapperScan("com.xxx.springboot.dao")
public class Starter {
	public static void main (String[] args) {
        SpringApplication.run(Starter.class)
    }
}

```

#### 2.1.3启动测试

运行 Starter main 方法 启动应用浏览器进行查询

