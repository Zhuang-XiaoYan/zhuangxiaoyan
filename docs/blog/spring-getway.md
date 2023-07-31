# Spring-getway网关

API Gateway（APIGW / API 网关），顾名思义，是系统对外的唯一入口。API网关封装了系统内部架构，为每个客户端提供定制的API。 近几年来移动应用与企业间互联需求的兴起。从以前单一的Web应用，扩展到多种使用场景，且每种使用场景对后台服务的要求都不尽相同。 这不仅增加了后台服务的响应量，还增加了后台服务的复杂性。随着微服务架构概念的提出，API网关成为了微服务架构的一个标配组件。

微服务的应用可能部署在不同机房，不同地区，不同域名下。此时客户端（浏览器/手机/软件工具）想 要请求对应的服务，都需要知道机器的具体 IP 或者域名 URL，当微服务实例众多时，这是非常难以记忆的，对 于客户端来说也太复杂难以维护。此时就有了网关，客户端相关的请求直接发送到网关，由网关根据请求标识 解析判断出具体的微服务地址，再把请求转发到微服务实例。这其中的记忆功能就全部交由网关来操作了。

## 一、核心概念

- 路由（Route）：路由是网关最基础的部分，路由信息由 ID、目标 URI、一组断言和一组过滤器组成。如果断言 路由为真，则说明请求的 URI 和配置匹配。
- 断言（Predicate）：Java8 中的断言函数。Spring Cloud Gateway 中的断言函数输入类型是 Spring 5.0 框架中 的 ServerWebExchange。Spring Cloud Gateway 中的断言函数允许开发者去定义匹配来自于 Http Request 中的任 何信息，比如请求头和参数等。
- 过滤器（Filter）：一个标准的 Spring Web Filter。Spring Cloud Gateway 中的 Filter 分为两种类型，分别是 Gateway Filter 和 Global Filter。过滤器将会对请求和响应进行处理。

## 二、路由规则

Spring Cloud Gateway创建Route对象时， 使用RoutePredicateFactory创建Predicate对象，Predicate对象可以赋值给Route。

Spring Cloud Gateway包含许多内置的Route Predicate Factories。
所有这些断言都匹配 HTTP 请求的不同属性。
多个Route Predicate Factories可以通过逻辑与（and）结合起来一起使用。
路由断言工厂RoutePredicateFactory包含的主要实现类如图所示，包括Datetime、请求的远端地址、路由权重、请求头、Host 地址、请求方法、请求路径和请求参数等类型的路由断言。

### 2.1 Datetime

匹配日期时间之后发生的请求

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - After=2021-02-23T14:20:00.000+08:00[Asia/Shanghai]

### 2.2 Cookie

匹配指定名称且其值与正则表达式匹配的cookie

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Cookie=loginname, ruoyi
### 2.3 Header

匹配具有指定名称的请求头，\d+值匹配正则表达式

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Header=X-Request-Id, \d+

### 2.4 Host

匹配主机名的列表

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Host=**.somehost.org,**.anotherhost.org

### 2.5 Method

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Method=GET,POST

### 2.6 Path

匹配请求路径

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Path=/system/**

### 2.7 Query

匹配查询参数

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - Query=username, abc.

### 2.8 RemoteAddr

匹配IP地址和子网掩码

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system
          uri: http://localhost:9201/
          predicates:
            - RemoteAddr=192.168.10.1/0

### 2.9 Weight

匹配权重

spring: 
  application:
    name: ruoyi-gateway
  cloud:
    gateway:
      routes:
        - id: ruoyi-system-a
          uri: http://localhost:9201/
          predicates:
            - Weight=group1, 8
        - id: ruoyi-system-b
          uri: http://localhost:9201/
          predicates:
            - Weight=group1, 2

## 三、路由配置

在spring cloud gateway中配置uri有三种方式，包括

### 3.1 websocket配置方式

spring:
  cloud:
    gateway:
      routes:
        - id: ruoyi-api
          uri: ws://localhost:9090/
          predicates:
            - Path=/api/**


### 3.2 http地址配置方式

spring:
  cloud:
    gateway:
      routes:
        - id: ruoyi-api
          uri: http://localhost:9090/
          predicates:
            - Path=/api/**
            
### 3.3 注册中心配置方式

spring:
  cloud:
    gateway:
      routes:
        - id: ruoyi-api
          uri: lb://ruoyi-api
          predicates:
            - Path=/api/**

## 四、限流配置

限流就是限制流量。通过限流，我们可以很好地控制系统的 QPS，从而达到保护系统的目的。常见的限流算法有：计数器算法，漏桶（Leaky Bucket）算法，令牌桶（Token Bucket）算法。

Spring Cloud Gateway官方提供了RequestRateLimiterGatewayFilterFactory过滤器工厂，使用Redis 和Lua脚本实现了令牌桶的方式。


<!-- spring data redis reactive 依赖 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>

spring:
  redis:
    host: localhost
    port: 6379
    password: 
  cloud:
    gateway:
      routes:
        # 系统模块
        - id: ruoyi-system
          uri: lb://ruoyi-system
          predicates:
            - Path=/system/**
          filters:
            - StripPrefix=1
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 1 # 令牌桶每秒填充速率
                redis-rate-limiter.burstCapacity: 2 # 令牌桶总容量
                key-resolver: "#{@pathKeyResolver}" # 使用 SpEL 表达式按名称引用 bean




