---
  title: springboot框架-01
  date: 2021.10.10
  sidebarDepth: 4
  tags:   
  	- JavaSE
  categories:   
  	- java
---

## springboot 框架发展史01

### 2.1.Spring1.x时代

在Spring1.x时代，都是通过xml文件配置bean,随着项目的不断扩大，需要将xml配置分放到不同的配置
文件中，需要须繁的在java类和xml配置文件中切换。

### 2.2.Spring2.x时代

随着JDK1.5带来的注解支持，Spring2.x可以使用注解对Bean进行申明和注入，大大的减少了xml配置文
同时也大大简化了项目的开发

那么，问题来了，究竟是应该使用xml还是注解呢？
最佳实践：
1.应用的基本配置用xml,比如：数据源、资源文件等；
2.业务开发用注解，比如：Service中注入bean等；

### 2.3.Spring3.x到Spring4.x再到Spring5.x

从Spring3.x开始提供了Java配置方式，使用Java配置方式可以更好的理解你配置的Bean,现在我们就处
于这个时代，并且Spring4.x、Spring5.x和Spring Boot都推荐使用java配置的方式。

## 3.Spring 5.X应用零配置开发

Spring框架从5.x版本推荐使用注解形式来对java应用程序进行开发与配置，并且可以完全替代原始的XML
注解形式的开发，在使用注解形式进行项目开发与环境配置时，Spring框架提供了针对环境配置与业务bean开
发相关注解。

### 3.1.注解

#### 3.1.1.声明Bean注解

```properties
@component:组件没有明确规定其角色，作用在类级别上声明当前类为一个业务组件，被spring Ioc容器维护

@service:在业务逻辑层（service层）类级别进行声明

@Repository:在数据访问层（dao层）类级别声明

@controller:在展现层（MVC)使用标注当前类为一个控制器
```



#### 3.1.2.注入Bean注解

```properties
@Autowired:Spring官方提供注解

@Inject:JSR-330提供注解（标准制定方）

@Resource:JSR-250提供注解
```


以上三种注解在Set方法或属性上声明，一般情况下通用一般开发中更习惯声明在属性上，代码简洁清晰。
基于5.x注解配置方式简化了xml配置，应用程序开发与xml环境配置均通过相应注解来实现。

#### 3.1.3.Spring5.x中配置与获取Bean注解

```properties
@configuration:作用与类上，将当前类声明为一个配置类，相当于一个xm1配置文件

@componentscan:自动扫描指定包下标注有oRepository,aservice,acontroller

@component:注解的类并由Ioc容器进行实例化和维护

@Bean:作用于方法上，相当于xm1文件中<bean>声明当前方法返回值为一个bean

@value:获取properties文件指定keyvalue值
```

### 3.2.实例1-IOC中Bean的实例化与获取工

#### 3.2.1.创建Spring普通工程

在pom.xml中添加坐标相关配置

```xml
<dependencies>
    <dependency >
       <!-- spring的依赖坐标 -->
        <groupId>org.springframework</groupId>
		<artifactId>spring-context</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
</dependencies>
    <p]ugins>
        <!--指定Maven编译的JDK版本和编码-->
        <groupId>org.apache.maven.plugin</groupId>
		<artifactId>maven-compiler-plugin</artifactId>
        <version>2.3.2</version>
        <configuration>
            <!--源代码使用的JDK版本-->
        	<source>1.8</source>
            <!--需要生成的目标class文件的编译版本-->
            <target>1.8</target>
            <!--字符集编码-->
            <encoding>utf-8</encoding>
        </configuration>
        </plugin>
    </plugins>
</build>
```

#### 3.2.2.创建Bean对象

UserDao.java

```java
@Repository
public class UserDao {
    public void test() {
        system.out.printIn("UserDao.test...");
    }
}


```

UserService.java

```java
@service
public class Userservice {
    @Resource
    private UserDao userDao;
    public void testO{
        System.out.println("userservice.test...");
        userDao.tes();
    }
}
```

#### 3.2.3.创建locConfig配置类

```java
//将当前类声明为一个配置类
Bconfiguration
//设置扫描包范围
@ComponentScan("com.xxxx.springboot")
public class Iocconfig{
```

#### 3.2.4.创建启动类执行测试

```java
public class Starter {
    public static void main(string[] args){
    //基于Java的配置类加载spring的应用上下文
    AnnotationconfigApplicationcontext ac=new AnnotationconfigApplicationcontext(Iocconfig.class);
    //获取指定的Bean对象
    UserService userservice=ac.getBean(UserService.class);
    //调用Bean对象的方法
    userservice.test();
}

```

此时启动Spring IOC容器，通过实例化AnnotationConfigApplicationContext类，接收配置参数类
locConfig,并获取UserService Bean实现方法调用，此时应用环境不存在xml配置文件，简化了应用的xml配
置。

### 3.3.实例2-@Bean注解使用

使用@Bean注解声明在方法（注意：方法名一般为bean对象名称）级别用于返回实例化的Bean对象。

#### 3.3.1.创建Bean对象

AccountDao.java

```java
//注意：此时类级别并未添加@Repository注解
public class AccountDao{
    public void test(){
        system.out.print1n("AccountDao.test...");
    }
}
```

#### 3.3.2.修改locConfig配置类

添加返回AccountDao Bean对象方法

```java
@configuration
@ComponentScan("com.xxxx.springboot")
public class Iocconfig02 {
    //@Bean注解：通常用于整合第三方的Bean对象，比如：数据源、第三方组件等（只需要实例化一次的Bean对象）
	@Bean//将方法的返回值交给IOC维护
    public AccountDao accountDao(){
        return new AccountDao();
    }
}
```



### 3.4.实例3-读取外部配置文件

在开发Java web应用时，配置文件是比较常见的，比如xml,properties,yml等文件，在Spring应用中对
于配置文件的读取同样提供支持。对于配置文件读取，我们可以通过@PropertySource注解声明到类级别来指定
读取相关配置。
Spring EI表达式语言，支持在Xml和注解中使用表达式，类似于JSP中EL表达式，Spring框架借助该表达
式实现资源注入，主要通过@Value注解来使用表达式，通过@Value注解，可以实现普通字符串，表达式运算结
果，Bean属性文件内容，属性文件等参数注入。具体使用如下：

#### 3.4.1.准备配置文件

src/main/resources目录下添加user.properties、jdbc.properties文件

###### user.properties

```properties
user.userName=admin
user.password=admin
```

###### jdbc.properties

```properties
jdbc.driver=com.mysq1.jdbc.Driver
jdbc.ur1=jdbc:mysq1://127.0.0.1:3306/hr?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=root
```

#### 3.4.2.@PropertySource加载配置文件

通过@PropertySource加载properties配置文件

```java
@confiauration
@Componentscan("com.xxxx")
@propertysource(value=["classpath:jdbc.properties","classpath:user.properties"})
public class Iocconfig{
    @value("jdbc.driver}")
    private string driver;
    
  	@value("${jdbc.url}")
    private string url;
    
    @value("${jdbc.username}")
    private String userName;
    
    @value("${jdbc.password}")
    private String password;
    
    //控制台打印属性值信息
    public void showConfigInfo(){
        System.out.println ( "driver : " + driver + " , url : " + url ) ;
        system.out.println("userName:"+userName+",password:"+password);
    }
}
```

#### 3.4.3.其他Bean对象获取properties文件内容

```java
@service
public class Userservice{
    @Resource
    private UserDao userDao;
    
    @value("${user.userName}")
    private String userName;
    
    @value("${user.password}"
    private string password;
           
    public void test(){
          system.out.println("Userservice.test...");
          userDao.test();
          system.out.println("userName:"+userName+",password:"+password);
    }
}
```



### 3.5.组合注解与元注解

Spring从2.x版本开始引入注解支持（目的是jdk1.5中推出注解功能）,通过引入注解来消除大量xml配置，
Spring引入注解主要用来注入bean以及aop切面相关配置，但由于注解大量使用，就会造成大量重复注解代码
出现，代码出现了重复，Spring为了消除重复注解，在元注解上引入了组合注解，其实可以理解为对代码的重
构，相当于注解的注解，拥有元注解的原始功能，比如在定义配置类时用到的@Configuration注解就是组合注
解，拥有@Component注解功能，即配置类本身也是一个被IOC维护的单例Bean。

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
AComponent
public @interface Configuration {
```



#### 3.5.1.自定义组合注解

定义MyCompScan注解，拥有@ComponentScan扫描器注解功能

```java
/**
*组合注解MyCompscan定义
拥有元注解aconfiguration+acomponentscan两者功能
覆盖 value属性
*/
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@configuration
```

## 4.Spring MVC零配置创建与部署

基于Spring Mvc5.X使用Maven搭建SpringMvcWeb项目，通过Spring提供的注解与相关配置来对项目
进行创建与部署。

### 4.1.创建Spring MVC Web工程

创建Maven的web项目

### 4.2.pom.xml添加坐标相关配置

```xml
<!--spring web-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
<!--spring mvc-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
< - - web servlet -- >
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
</dependency>
<build>
    <finalName>springmvc</finalName>
    <plugins>
        <plugin>
        <!--指定Maven编译的JDK版本工编码-->
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>2.3.2</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>utf-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 4.3.添加源代码

```java
@controller
public class Hellocontroller {
    
    @RequestMapping("/index")
    public string index(){
        return"index";
    }
}

```

### 4.4.添加视图

在WEB-INF/views目录下创建index.jsp(这里以jsp为模板）

```html
<htm]>
    <body>
        <h2>
            hello mvc
        </h2>
    </body>
</html>
```

### 4.5.SpringMVC配置类添加

Spring Mvc配置信息MvcConfig文件添加，作为Mvc框架环境，原来是通过xml来进行配置（视图解析
器、Json转换器、文件上传解析器等）,这里基于注解通过继承WebMvcConfigurerAdapter类并重写相关方法来
进行配置（注意通过@EnableWebMvc注解来启动MVC环境）。

```java
/**
MVC基本配置
*/
//配置类
@configuration
//在aconfiguration注解的配置类中添加，用于为该应用添加SpringMVC的功能
@EnablewebMvc
//扫描包范围
@ComponentScan("com.xxxx.springboot")
public class Mvcconfig{
    /**
    *配置JSP视图解析器
    * @return
    */
    @Bean//将方法返回的结果交给IOC容器维护
    public InternairResourceViewResolver viewResolver(){
        //获取视图解析器
        InternalResourceViewResolver viewResolver=new InternalResourceViewResolver();
        //设置前缀
        viewResolver.setprefix("/WEB-INF/views/");
        //设置后缀
        viewResolver.setsuffix(".jsp");
        //返回解析器对象（交给IOC容器进行维护）
        return viewResolver;
    }
}
```

4.5.SpringMVC配置类添加
Spring Mvc配置信息MvcConfig文件添加，作为Mvc框架环境，原来是通过xml来进行配置（视图解析
器、Json转换器、文件上传解析器等）,这里基于注解通过继承WebMvcConfigurerAdapter类并重写相关方法来
进行配置（注意通过@EnableWebMvc注解来启动MVC环境）。

MvcConfig类定义好了，那么问题来了，怎么加载MvcConfig类呢，原来在构建Mvc应用时是通过容器启动
应用时加载web.xml文件实现配置文件加载，现在的环境web.xml文件不存在，此时基于注解方式构建的Mvc
应用，定义Weblnitializer实现WebApplicationlnitializer接口（该接口用来配置Servlet3.0+配置的接口，用于
替代web.xml配置）,当servlet容器启动Mvc应用时会通过SpringServletContainerlnitializer接口进行加载，从
而加载Mvc应用信息配置。实现该接口onStartup方法，加载应用信息配置。

### 4.6.入口文件代码添加

```java
/**
*实现WebApplicationinitializer接口的类都可以在web应用程序启动时被加载
*/
public class webInitializer implements webApplicationInitializer {
    @override
    public void onstartup(Servletcontext servletcontext)throws servletexception{
        //基于Java的配置类加载spring的应用上下文
        AnnotationconfigwebApplicationcontext ctx=new
        AnnotationConfigwebApplicationcontext();
        //注册MVC配置信息
        ctx.register(Mvcconfig.class);
        //设置 Servletcontext 上下文信息
        ctx.setservletcontext(servletcontext);
        //配置转发器 Dispatcher
        ServletRegistration.Dynamic servlet =
        servletcontext.addservlet("dispatcher",new Dispatcherservlet(ctx));
        //设置映射路径
        servlet.addMapping("/");
        //启动时即实例化 Bean
        servlet.setLoadonstartup(1);
    }
}

```

### 4.7.部署与测试

通过Tomcat启动项目并访问

![1633852237420](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/155038-914081.png)

此时地址访问成功。
当项目访问成功后，那么问题来了，如果项目中存在静态资源文件，Handler放行处理该如何配置，定义的
拦截器怎么应用，此时关注WebMvcConfigurationSupport父类方法，重写相关方法即可。

```java
//静态资源handler不进行处理直接响应到客户端
@override
public void configureDefaultservletHandling(DefaultservletHandlerconfigurer configurer)
{
    configurer.enable();
}
//配置拦截器
@Bean
public LoginInterceptor loginInterceptor(){
    return new LoginInterceptor();
}
//添加拦截器到mvc环境
@override
public void addInterceptors(InterceptorRegistry registry){
    registry.addInterceptor(loginInterceptor();
}
```

代码编写(==>p8)



## 5.springboot概念与特点

### 5.1.框架概念

随着动态语言流行（Ruby、Scala、Node]s等）,Java开发变得相对笨重，配置繁琐，开发效率低下，部署流程
复杂，以及第三方集成难度也相对较大，针对该环境，Spring Boot被开发出来，其使用“习惯大于配置目标”，借助
Spring Boot能够让项目快速运行起来，同时借助Spring Boot可以快速创建web应用并独立进行部署（jar包 war
包方式，内嵌servlet容器）,同时借助Spring Boot在开发应用时可以不用或很少去进行相关xml环境配置，简
化了开发，大大提高项目开发效率。
Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化 Spring应用的初始搭建以及开发过
程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，让
Spring Boot在蓬勃发展的快速应用开发领域（rapid application development)成为领导者。

### 5.2.框架特点

创建独立Spring应用程序、嵌入式Tomcat、Jetty容器、无需部署WAR包、简化Maven及Gradle配置、
尽可能自动化配置Spring、直接植入产品环境下的实用功能，比如度量指标、健康检查及扩展配置、无需代码生
成及XML配置等，同时SpringBoot不仅对web应用程序做了简化，还提供一系列的依赖包来把其它一些工作做
成开箱即用。

### 5.3.Spring Boot快速入门

#### 5.3.1.环境准备：ldea、Maven、Jdk 1.8+、Spring Boot 2.x

#### 5.3.2.创建项目

通过Maven创建一个普通的java项目

#### 5.3.3.添加依赖坐标

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

Spring Boot的项目必须要将parent设置为Spring Boot的parent,该parent包含了大量默认的配置，简
化程序的开发。

#### 5.3.4.导入Spring Boot的web坐标与相关插件

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

#### 5.3.5.添加源代码

```java
@Controller
public class Hellocontroller {
    @RequestMapping("hello")
    @ResponseBody
    public string hello(){
        return "Hello SpringBoot";
    }
}
```

#### 5.3.6.创建启动程序

在HelloController.java所在包下，创建StarterApplication.java
@SpringBootApplication

```java
public class Starter {
    public static void main(string[] args){
        Springapplication.run(Starter.class);
    }
}
```

## 6.Spring Boot 核心配置

### 6.1.设置 Banner 图标

在搭建Spring Boot项目环境时，程序启动后会在控制台打印醒目的SpringBoot图标，图标描述了Spring
Boot版本信息，这是Spring Boot项目与Spring项目启动区别较大的地方，Spring Boot通过默认Banner在程
序启动时显示应用启动图标，当然图标我们也可以进行自定义。

#### 6.1.1.Banner图标自定义

Spring Boot项目启动时默认加载src/main/resources目录下的banner.txt图标文件，如果该目录文件未提
供，则使用Spring Boot默认。在main目录下新建resources资源目录，并在该目录下新建banner.txt文本文
件，可以设置自定义图标。
打开网址：http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something

在线生成图标对应文本并将文本内容copy到banner.txt中

#### 6.1.2.Banner 图标关闭

如果启动时不想要看到启动图标，这里也可以通过代码进行关闭操作，修改StarterApplication设置
BannerMode值为Banner.Mode.OFF,启动Spring Boot应用关闭图标输出功能即可

```java
@springBootApplication
public class StarterApplication {
    public static void main(string[] args){
        SpringApplication springApplication = new springApplication(StarterApplication
        .class);
        //设置banner图标关闭
        springApplication.setBannerMode(Banner.Mode.OFF);
        springApplication.run();
    }
}
```

### 6.2.Spring Boot 配置文件

Spring Boot默认会读取全局配置文件，配置文件名固定为：application.properties或application.yml,放
置在src/main/resources资源目录下，使用配置文件来修改SpringBoot自动配置的默认值。
在resources资源目录下添加 application.properties文件，配置信息如下：

```properties
##项目启动端口号配置
server.port=8989
##项目访问上下文路径
server.servlet.context-path=/mvc
##数据源配置
spring.datasource.driver-class-name=com.mysq1.cj.jdbc.Driver
spring.datasource.url=jdbc:mysq1://127.0.0.1:3306/hr?
useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=root

```

```yaml
##或者application.yml文件
##端口号上下文路径
port:8989
servlet:
context-path:/mvc
##数据源配置
```

### 6.3.Starter 坐标 & 自动化配置 T

#### 6.3.1.Starter坐标配置

Spring Boot 引入了全新的Starter坐标体系，简化企业项目开发大部分场景的 Starter pom,应用程序引入指
定场景的Start pom相关配置就可以消除，通过Spring Boot就可以得到自动配置的Bean。

##### 6.3.1.1.Web starter

使用Spring MVC来构建RESTfulWeb应用，并使用Tomcat作为默认内嵌容器

```xml
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

##### 6.3.1.2.Freemarker Starter Thymeleaf starter

集成视图技术，引入Freemarker Starter,Thymeleaf Starter

```xml
<dependency>
	 <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
<dependency>
 	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

##### 6.3.1.3.JavaMail邮件发送Starter

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

##### 6.3.1.4.引入AOP环境

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

#### 6.3.2.自动化配置

##### 6.3.2.1.SpringBoot Starter坐标版本查看

前面介绍了SpringBoot Starter相关坐标，引入Starter坐标来简化应用环境的配置。这里以环境搭建
spring-boot-starter-web坐标来简单分析SpringBoot自动化配置过程。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

这里引入的web环境坐标不像传统的maven坐标那样包含坐标的版本号，项目中引入的starter系列坐标对
应的版本库统一由父工程坐标统一控制即项目中引入的parent标签。

```xml
<parent>
    <artifactId>spring-boot-starter-parent</artifactId>
    <!--父类项目统一对项目依赖版本统一控制！-->
    <version>2.2.2.RELEASE</version>
</parent>
```


这里spring-boot-starter-parent继承spring-boot-dependencies项目，在spring-boot-dependencies项
目中定义了spring-boot-starter-web坐标的版本！(spring-boot-dependencies项目中定义了当前SpringBoot
版本下各个starter坐标版本以及依赖的其他坐标版本）

##### 6.3.2.2.Spring Boot自动化配置

Spring Boot的项目一般都会有*Application的入口类，入口类中提供main方法，这是一个标准的Java应
用程序的入口方法。@SpringBootApplication注解是Spring Boot的核心注解，它其实是一个组合注解：
![1630824158147](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202109/05/144238-759995.png)
可以看出该注解也是一个组合注解，组合了@Configuration注解，对于Spring Boot应用，
@SpringBootConfiguration注解属于Boot项目的配置注解也是属于一个组合注解，Spring Boot项目中推荐使用
@SpringBootConfiguration注解，因为其组合了@Configuration注解。

### 6.4.Profile配置

Profile是Spring用来针对不同环境对不同配置提供支持的全局Profile配置使用application-{profile}.yml,
比如 application-dev.yml,application-test.yml。
通过在application.yml中设置spring.profiles.active=test|dev|prod来动态切换不同环境，具体配置如下：
·application-dev.yml开发环境配置文件

```yaml
server:
  port:8989
```

·application-test.yml测试环境配置文件

```
server:
	port:9999
```

·application.yml主配置文件

```
##环境选择配置
spring:
    profiles
        active:dev
```

### 6.5.日志配置

在开发企业项目时，日志的输出对于系统bug定位无疑是一种比较有效的方式，也是项目后续进入生产环境
后快速发现错误解决错误的一种有效手段，所以日志的使用对于项目也是比较重要的一块功能。
Spring Boot默认使用LogBack日志系统，如果不需要更改为其他日志系统如Log4j2等，则无需多余的配
置，LogBack默认将日志打印到控制台上。如果要使用LogBack,原则上是需要添加dependency依赖的。

```xml
<dependency>
 	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
</dependency>
```

![1630825178717](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202109/05/145939-28219.png)

因为新建的Spring Boot项目一般都会引用spring-boot-starter或者spring-boot-starter-web,而
这两个起步依赖中都已经包含了对于spring-boot-starter-logging的依赖，所以，无需额外添加依赖。

#### 6.5.1.项目中日志信息输出

Starter启动类中添加Log日志类，控制台打印日志信息。

```java
package com.xxxx;
import org.slf4j.Logger;
import org.s1f4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.springBootApplication;
aspringBootApplication
public class Starter {
    private static Logger logger = LoggerFactory . getLogger ( starter . class ) ;
    public static void main(string[] args){
        logger.info("SpringBoot应用开始启动...");
        springApplieation.run(starter.class);
    }
}
```

![1630825343447](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202109/05/150223-149230.png)

6.5.2.日志输出格式配置
修改application.yml文件添日志输出格式信息配置，可以修改application.yml文件来控制控制台日志输出
格式，同时可以设置日志信息输出到外部文件。

```xml
logging:
    pattern:
        console:"%d{yyyy-MM-dd HH:mm:ss}[%thread]%-51evel%logger-%msg%n"
        level:debug
    file
        path:"."
        name:"springboot.log"
```

## 7.Freemarker & Thymeleaf 视图技术集成

### 7.1.Freemarker视图集成

SpringBoot内部支持Freemarker视图技术的集成，并提供了自动化配置类
FreeMarkerAutoConfiguration,借助自动化配置可以很方便的集成Freemarker基础到SpringBoot环境中。这
里借助入门项目引入Freemarker环境配置。
·Starter坐标引入

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

添加Freemarker配置信息
Freemarker默认默认视图路径文resources/templates目录（由自动化配置类FreemarkerProperties决
定）,该目录可以进行在application.yml中进行修改。

![1630825713428](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202109/05/150833-995304.png)

修改application.yml添加freemarker基本配置如下：

```yaml
spring:
    freemarker:
        suffix:.ft1
        content-type:text/html
        charset:UTF-8
        template-loader-path:classpath:/views/
```

编写IndexController控制器转发视图

```java
package com.xxxx.controller;
import org.springframework.stereotype.controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class Indexcontroller {
    @RequestMapping("index")
    public string index(){
        return"index";
    }
}
```


![1630825857806](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202109/05/151058-625416.png)

代码编写 =>(p17)

### 7.2.Thymeleaf 视图集成

SpringBoot支持多种视图技术集成，并且SpringBoot官网推荐使用Thymeleaf作为前端视图页面，这里实
现Thymeleaf视图集成，借助入门项目引入Thymeleaf环境配置。

- starter坐标引入

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-thymeleaf</artifactId>
  </dependency>
  ```

- 添加Thymeleaf配置信息
  Thymeleaf默认默认视图路径文resources/templates目录（由自动化配置类Thymeleaf Properties 类
  定）,该目录可以进行在application.yml中进行修改。



- 环境选择配置

```yaml
spring :
    thymeleaf:
        prefix:classpath:/html/
        ## 关闭thymeleaf页面缓存
        cache:false
```


- 编写IndexController控制器转发视图

```java
@controller
public class Indexcontroller {
    
    @RequestMapping("index")
    public string index(Model model){
    //设置请求域的值
    model.addAttribute ( " msg " , " Hello SpringBoot " ) ;
    return"index";
}
```

- html目录下添加index.html视图

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="UTF-8">
        <title>Thymeleaf视图</title>
    </head>
    <body>
        <!--获取请求域的值-->
        <h2 th:text="${msg}"></h2>
    </body>
</html>
```

## 8.SpringBoot静态资源访问

从入门项目中可以看到：对于Spring Mvc请求拦截规则为'/,Spring Boot默认静态资源路径如下：

![1633854424125](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/162704-644981.png)

即：我们可以在resources资源目录下存放web应用静态资源文件。

### 8.1.默认静态资源路径

在resources目录下创建static或者public目录，存放images、js、css等静态资源文件

![1633854540772](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/162901-271362.png)

![1633854714018](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/163155-488621.png)

### 8.2.自定义静态资源路径

在spring.resources.static-locations后面追加一个配置classpath:/os/

```yml
spring:
#修改默认的静态寻址资源目录多个路径之间用逗号隔开
	resources :
		static-locations: classpath:/public/,classpath:/static/,classpath:/os/
```



## 9.SpringBoot应用打包与部署

当项目开发完毕进行部署上线时，需要对项目进行打包操作，入门中构建的项目属于普通应用，由于
SpringBoot内嵌Tomcat容器，所有打包后的jar包默认可以自行运行。

### 9.1.Jar包部署

#### 9.1.1.配置打包命令

idea下配置clean compile package-Dmaven.test.skip=true执行打包命令，target目录得到待部署
的项目文件。

![1633854962597](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/163602-281225.png)

![1633854989073](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1633854989073.png)

#### 9..1.2. 部署并访问

打开本地dos窗口，执行java-jar命令部署已打好的jar包文件。
命令如下：java-jar jar包所在目录

![1633855076348](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/163757-142620.png)

### 9.2.war 包部署

War包形式部署Web项目在生产环境中是比较常见的部署方式，也是目前大多数web应用部署的方案，这
里对于Spring Boot Web项目进行打包部署步骤如下

#### 9.2.1.pom.xml修改

- 应用类型修改
  由于入门项目构建的项目默认为jar应用，所以这里打war需要作如下修改

![1633855375534](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/164255-607110.png)

- 忽略内嵌Tomcat
  构建SpringBoot应用时，引入的spring-boot-starter-web默认引入Tomcat容器，这里忽略掉内容Tomcat

```xml
<dependency>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope)I
    </dependency>
<build>
    <!--配置生成的war文件名-->
    <finalName>springboot</finalName>
    <plugins>
        <p]ugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

#### 9.2.2  Starter修改

![1633855918315](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/165158-52700.png)

#### 9.2.3  Starter修改

![1633855945722](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/165226-462230.png)

#### 9.2.4  部署并访问

![1633856052367](https://raw.githubusercontent.com/anchuanyuan/TuChuangForITX/main/image/202110/10/165413-347619.png)

## 10.总结

介绍了Spring框架的发展史，然后引入SpringBoot框架，使用SpringBoot框架的最终目标是简化原生的Spring应用开发带来的繁琐配置，SpringBoot引入的全新的Starter坐标，简化了原有坐标的引入方式，借助SpringBoot的自动化配置让开发者面更加专注业务本身的开发，而不是花费大量的时间来解决配置的问题，同时SpringBoot还提供了便捷的环境切换操作，做到不同环境方便快捷的切换，在开发web项目中遇到的视图整合与静态文件的访问操作，更多要归功于SpringBoot本身Starter坐标与自动化配置功能最后给大家讲了SpringBoot打包与部署问题，相比较原有的Maven项目打包与部署更加简单。
