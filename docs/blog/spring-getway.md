---
lang: zh-CN
sidebarDepth: 2
---

# Spring-getway网关

API Gateway（APIGW / API 网关），顾名思义，是系统对外的唯一入口。API网关封装了系统内部架构，为每个客户端提供定制的API。
近几年来移动应用与企业间互联需求的兴起。从以前单一的Web应用，扩展到多种使用场景，且每种使用场景对后台服务的要求都不尽相同。
这不仅增加了后台服务的响应量，还增加了后台服务的复杂性。随着微服务架构概念的提出，API网关成为了微服务架构的一个标配组件。

微服务的应用可能部署在不同机房，不同地区，不同域名下。此时客户端（浏览器/手机/软件工具）想 要请求对应的服务，都需要知道机器的具体IP或者域名URL，
当微服务实例众多时，这是非常难以记忆的，对 于客户端来说也太复杂难以维护。此时就有了网关，客户端相关的请求直接发送到网关，
由网关根据请求标识 解析判断出具体的微服务地址，再把请求转发到微服务实例。这其中的记忆功能就全部交由网关来操作了。

- 路由（Route）：路由是网关最基础的部分，路由信息由 ID、目标 URI、一组断言和一组过滤器组成。如果断言 路由为真，则说明请求的 URI 和配置匹配。
- 断言（Predicate）：Java8 中的断言函数。Spring Cloud Gateway 中的断言函数输入类型是 Spring 5.0 框架中的ServerWebExchange。Spring Cloud Gateway 中的断言函数允许开发者去定义匹配来自于 Http Request 中的任 何信息，比如请求头和参数等。
- 过滤器（Filter）：一个标准的 Spring Web Filter。Spring Cloud Gateway 中的 Filter 分为两种类型，分别是 Gateway Filter 和 Global Filter。过滤器将会对请求和响应进行处理。

Spring-getway网关用于路由转发、异常处理、限流、降级、接口、鉴权等等。

## 一、使用网关

```html
<!-- spring cloud gateway 依赖 -->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```
resources/application.yml配置文件

```yaml
server:
  port: 8080

spring: 
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        # 系统模块
        - id: athena-mall
          uri: http://localhost:8080/
          predicates:
            - Path=/api/**
          filters:
            - StripPrefix=1
```

## 二、路由规则

<img :src="$withBase('/interview/springgetway-predict.png')" alt="springgetway-predict">

Spring Cloud Gateway创建Route对象时， 使用RoutePredicateFactory创建Predicate对象，Predicate对象可以赋值给Route。

- Spring Cloud Gateway包含许多内置的Route Predicate Factories。
- 所有这些断言都匹配 HTTP 请求的不同属性。
- 多个Route Predicate Factories可以通过逻辑与（and）结合起来一起使用。

路由断言工厂RoutePredicateFactory包含的主要实现类如图所示，包括**Datetime、请求的远端地址、路由权重、请求头、Host 地址、请求方法、请求路径和请求参数**等类型的路由断言。

### 2.1 Datetime
匹配日期时间之后发生的请求
```yaml
spring: 
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - After=2021-02-23T14:20:00.000+08:00[Asia/Shanghai]
```

### 2.2 cookie
匹配指定名称且其值与正则表达式匹配的cookie
测试 curl http://localhost:8080/system/config/1 --cookie "loginname=athena-mall"
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - Cookie=loginname, athena-mall
```

### 2.3 Header
匹配具有指定名称的请求头，\d+值匹配正则表达式
```yaml
spring: 
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - After=2021-02-23T14:20:00.000+08:00[Asia/Shanghai]
```

### 2.4 Host
匹配主机名的列表
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - Header=X-Request-Id, \d+
```

### 2.5 Method
匹配请求methods的参数，它是一个或多个参数
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - Host=**.somehost.org,**.anotherhost.org
```

### 2.6 Path
匹配请求路径
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - Path=/system/**
```

### 2.7 Query
匹配查询参数
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - Query=username, abc.
```

### 2.8 RemoteAddr
匹配IP地址和子网掩码
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system
          uri: http://localhost:9201/
          predicates:
            - RemoteAddr=192.168.10.1/0
```

### 2.9 Weight
匹配权重
```yaml
spring:
  application:
    name: athena-mall-gateway
  cloud:
    gateway:
      routes:
        - id: athena-mall-system-a
          uri: http://localhost:9201/
          predicates:
            - Weight=group1, 8
        - id: athena-mall-system-b
          uri: http://localhost:9201/
          predicates:
            - Weight=group1, 2
```

## 三、路由配置

在spring cloud gateway中配置uri有三种方式，包括

### 3.1 websocket配置方式
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: athena-mall-api
          uri: ws://localhost:9090/
          predicates:
            - Path=/api/**
```

### 3.2 http地址配置方式
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: athena-mall-api
          uri: http://localhost:9090/
          predicates:
            - Path=/api/**
```

### 3.3 注册中心配置方式
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: athena-mall-api
          uri: lb://athena-mall-api
          predicates:
            - Path=/api/**
```

## 四、限流配置

限流就是限制流量。通过限流，我们可以很好地控制系统的 QPS，从而达到保护系统的目的。常见的限流算法有：计数器算法，漏桶（Leaky Bucket）算法，令牌桶（Token Bucket）算法。

Spring Cloud Gateway官方提供了RequestRateLimiterGatewayFilterFactory过滤器工厂，使用Redis 和Lua脚本实现了令牌桶的方式。

```html
<!-- spring data redis reactive 依赖 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>
```

限流规则，根据URI限流

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:
  cloud:
    gateway:
      routes:
        # 系统模块
        - id: athena-mall-system
          uri: lb://athena-mall-system
          predicates:
            - Path=/system/**
          filters:
            - StripPrefix=1
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 1 # 令牌桶每秒填充速率
                redis-rate-limiter.burstCapacity: 2 # 令牌桶总容量
                key-resolver: "#{@pathKeyResolver}" # 使用 SpEL 表达式按名称引用 bean
```

## 五、熔断降级

```html
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```
配置需要熔断降级服务

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:
  cloud:
    gateway:
      routes:
        # 系统模块
        - id: athena-mall-system
          uri: lb://athena-mall-system
          predicates:
            - Path=/system/**
          filters:
            - StripPrefix=1
            # 降级配置
            - name: Hystrix
              args:
                name: default
                # 降级接口的地址
                fallbackUri: 'forward:/fallback'
```
:::提示
上面配置包含了一个Hystrix过滤器，该过滤器会应用Hystrix熔断与降级，会将请求包装成名为fallback的路由指令RouteHystrixCommand，
RouteHystrixCommand继承于HystrixObservableCommand，其内包含了Hystrix的断路、资源隔离、降级等诸多断路器核心功能，
当网关转发的请求出现问题时，网关能对其进行快速失败，执行特定的失败逻辑，保护网关安全。

配置中有一个可选参数fallbackUri，当前只支持forward模式的URI。如果服务被降级，请求会被转发到该URI对应的控制器。
控制器可以是自定义的fallback接口；也可以使自定义的Handler，需要实现接口org.springframework.web.reactive.function.server.HandlerFunction<T extends ServerResponse>。
:::

## 六、跨域配置

项目采用的是前后端分离，如果页面直接调用后端的域名或IP，故存在跨域问题。

**什么是跨域问题？** 
跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript施加的安全限制。

**什么是同源？**

所谓同源是指，域名，协议，端口均相同
http://www.athena-mall.vip --> http://admin.athena-mall.vip 跨域
http://www.athena-mall.vip --> http://www.athena-mall.vip 非跨域
http://www.athena-mall.vip --> http://www.athena-mall.vip:8080 跨域
http://www.athena-mall.vip --> https://www.athena-mall.vip 跨域

**使用 CORS（跨资源共享）解决跨域问题**

CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。
CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10
整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，
代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

**跨域调用示例**

```js
// 登录方法
export function login(username, password, code, uuid) {
  return request({
    // 会出现跨域（通过IP或域名直接访问网关接口）
    url: 'http://192.168.31.138:8080/auth/login',
	// 不会出现跨域（开发环境默认通过proxy代理的方式，同理部署到生产也需要配置nginx代理）
	url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password, code, uuid }
  })
}
```

配置方式：可以在nacos配置中心athena-mall-gateway-dev.yml文件中加入以下配置解决跨域问题

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOriginPatterns: "*"
            allowed-methods: "*"
            allowed-headers: "*"
            allow-credentials: true
            exposedHeaders: "Content-Disposition,Content-Type,Cache-Control"
```

代码方式：新增CorsConfig.java跨域代码配置
```java
package com.athena-mall.gateway.config;

  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.http.HttpHeaders;
  import org.springframework.http.HttpMethod;
  import org.springframework.http.HttpStatus;
  import org.springframework.http.server.reactive.ServerHttpRequest;
  import org.springframework.http.server.reactive.ServerHttpResponse;
  import org.springframework.web.cors.reactive.CorsUtils;
  import org.springframework.web.server.ServerWebExchange;
  import org.springframework.web.server.WebFilter;
  import org.springframework.web.server.WebFilterChain;
  import reactor.core.publisher.Mono;

  /**
  * 跨域配置
  *
  * @author athena-mall
  */
  @Configuration
  public class CorsConfig
  {
    /**
    * 这里为支持的请求头，如果有自定义的header字段请自己添加
    */
    private static final String ALLOWED_HEADERS = "X-Requested-With, Content-Type, Authorization, credential, X-XSRF-TOKEN, token, Admin-Token, App-Token";
    private static final String ALLOWED_METHODS = "GET,POST,PUT,DELETE,OPTIONS,HEAD";
    private static final String ALLOWED_ORIGIN = "*";
    private static final String ALLOWED_EXPOSE = "*";
    private static final String MAX_AGE = "18000L";

    @Bean
    public WebFilter corsFilter()
    {
      return (ServerWebExchange ctx, WebFilterChain chain) -> {
      ServerHttpRequest request = ctx.getRequest();
      if (CorsUtils.isCorsRequest(request))
      {
        ServerHttpResponse response = ctx.getResponse();
        HttpHeaders headers = response.getHeaders();
        headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS);
        headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
        headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        headers.add("Access-Control-Expose-Headers", ALLOWED_EXPOSE);
        headers.add("Access-Control-Max-Age", MAX_AGE);
        headers.add("Access-Control-Allow-Credentials", "true");
        if (request.getMethod() == HttpMethod.OPTIONS)
        {
          response.setStatusCode(HttpStatus.OK);
          return Mono.empty();
        }
      }
      return chain.filter(ctx);
    };
  }
}
```

:::提示
如果可以通过部署手段（例如nginx配置代理等）解决跨域，则可以不需要添加跨域支持。
:::

## 七、黑名单配置
顾名思义，就是不能访问的地址。实现自定义过滤器BlackListUrlFilter，需要配置黑名单地址列表blacklistUrl，当然有其他需求也可以实现自定义规则的过滤器。
```yaml
spring:
  cloud:
    gateway:
      routes:
        # 系统模块
        - id: athena-mall-system
          uri: lb://athena-mall-system
          predicates:
            - Path=/system/**
          filters:
            - StripPrefix=1
            - name: BlackListUrlFilter
              args:
                blacklistUrl:
                - /user/list
```

## 八、白名单配置

顾名思义，就是允许访问的地址。且无需登录就能访问。在ignore中设置whites，表示允许匿名访问。

```yaml
# 不校验白名单
ignore:
  whites:
    - /auth/logout
    - /auth/login
    - /*/v2/api-docs
    - /csrf
```

## 九、全局过滤器

全局过滤器作用于所有的路由，不需要单独配置，我们可以用它来实现很多统一化处理的业务需求，比如权限认证，IP访问限制等等。目前网关统一鉴权AuthFilter.java就是采用的全局过滤器。
单独定义只需要实现GlobalFilter, Ordered这两个接口就可以了。

```java
package com.athen.amall.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * 全局过滤器
 * 
 * @author zhuangxiaoyan
 */
@Component
public class AuthFilter implements GlobalFilter, Ordered
{
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain)
    {
        String token = exchange.getRequest().getQueryParams().getFirst("token");
        if (null == token)
        {
            ServerHttpResponse response = exchange.getResponse();
            response.getHeaders().add("Content-Type", "application/json; charset=utf-8");
            String message = "{\"message\":\"请求token信息不能为空\"}";
            DataBuffer buffer = response.bufferFactory().wrap(message.getBytes());
            return response.writeWith(Mono.just(buffer));
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder()
    {
        return 0;
    }
}
```




