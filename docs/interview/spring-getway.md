---
lang: zh-CN
sidebarDepth: 2
---

# 网关选型与设计

API Gateway（APIGW / API 网关），顾名思义，是系统对外的唯一入口。API网关封装了系统内部架构，为每个客户端提供定制的API。 
近几年来移动应用与企业间互联需求的兴起。从以前单一的Web应用，扩展到多种使用场景，且每种使用场景对后台服务的要求都不尽相同。 
这不仅增加了后台服务的响应量，还增加了后台服务的复杂性。随着微服务架构概念的提出，API网关成为了微服务架构的一个标配组件。

微服务的应用可能部署在不同机房，不同地区，不同域名下。此时客户端（浏览器/手机/软件工具）想 要请求对应的服务，都需要知道机器的具体IP或者域名URL，
当微服务实例众多时，这是非常难以记忆的，对 于客户端来说也太复杂难以维护。此时就有了网关，客户端相关的请求直接发送到网关，
由网关根据请求标识 解析判断出具体的微服务地址，再把请求转发到微服务实例。这其中的记忆功能就全部交由网关来操作了。

## 一、Nginx和SpringGateway区别

### 1.1 Nginx是流量网关。

流量网关通常只专注于全局的Api管理策略，比如全局流量监控、日志记录、全局限流、黑白名单控制、
接入请求到业务系统的负载均衡等，有点类似防火墙。Kong 就是典型的流量网关。

Nginx的常用功能：
- 正向代理
- 反向代理
- 负载均衡
- 动静分离

### 1.2 Gateway是业务网关。

业务网关针对具体的业务需要提供特定的流控策略、缓存策略、鉴权认证策略等等。
业务网关一般部署在流量网关之后、业务系统之前，比流量网关更靠近业务系统。
通常API网关指的是业务网关。 有时候我们也会模糊流量网关和业务网关，让一个网关承担所有的工作,所以这两者之间并没有严格的界线。

## 二、SpringCloudGateway工作原理

Spring Cloud Gateway 的核心处理流程如下图，Gateway的客户端回向Spring Cloud Gateway发起请求，
请求首先会被HttpWebHandlerAdapter进行提取组装成网关的上下文，然后网关的上下文会传递到DispatcherHandler。
DispatcherHandler是所有请求的分发处理器，DispatcherHandler主要负责分发请求对应的处理器，
比如将请求分发到对应RoutePredicateHandlerMapping(路由断言处理器映射器）。路由断言处理映射器主要用于路由的查找，
以及找到路由后返回对应的FilteringWebHandler。FilteringWebHandler主要负责组装Filter链表并调用Filter执行一系列Filter处理，
然后把请求转到后端对应的代理服务处理，处理完毕后，将Response返回到Gateway客户端。

在Filter链中，通过虚线分割Filter的原因是，过滤器可以在转发请求之前处理或者接收到被代理服务的返回结果之后处理。
所有的Pre类型的Filter执行完毕之后，才会转发请求到被代理的服务处理。被代理的服务把所有请求完毕之后，才会执行Post类型的过滤器。

<img :src="$withBase('/interview/springgetway.png')" alt="springgetway">

## 三、拦截器和过滤器区别

**过滤器Filter基于Servlet实现**，过滤器的主要应用场景是对字符编码、跨域等问题进行过滤。Servlet的工作原理是**拦截配置好的客户端请求**，
然后对Request和Response进行处理。Filter过滤器随着web应用的启动而启动，只初始化一次。

Filter的使用比较简单，继承Filter 接口，实现对应的init、doFilter以及destroy方法即可。

**拦截器是SpringMVC中实现的一种基于Java反射**(动态代理)机制的方法增强工具，
拦截器的实现是继承HandlerInterceptor接口，并实现接口的preHandle、postHandle和afterCompletion方法。

1. preHandle：请求方法前置拦截，该方法会在Controller处理之前进行调用，Spring中可以有多个Interceptor，这些拦截器会按照设定的Order顺序调用，当有一个拦截器在preHandle中返回false的时候，请求就会终止。
2. postHandle：preHandle返回结果为true时，在Controller方法执行之后，视图渲染之前被调用
3. afterCompletion：在preHandle返回ture，并且整个请求结束之后，执行该方法。

相同点：
1. 拦截器与过滤器都是体现了AOP的思想，对方法实现增强，都可以拦截请求方法。
2. 拦截器和过滤器都可以通过Order注解设定执行顺序

不同点：
1. 过滤器属于Servlet级别，拦截器属于Spring级别 Filter是在javax.servlet包中定义的，要依赖于网络容器，因此只能在web项目中使用。
2. Interceptor是SpringMVC中实现的，归根揭底拦截器是一个Spring组件，由Spring容器进行管理。

<img :src="$withBase('/interview/filter-Interceprtor.png')" alt="Interceprtor">

1. 首先当一个请求进入Servlet之前，过滤器的doFilter方法进行过滤，
2. 进入Servlet容器之后，执行Controller方法之前，拦截器的preHandle方法进行拦截，
3. 执行Controller方法之后，视图渲染之前，拦截器的postHandle方法进行拦截，
4. 请求结束之后，执行拦截器的postHandle方法。

3、过滤器基于函数回调方式实现，拦截器基于Java反射机制实现

## 博文参考
-[spring-getway docs](https://springdoc.cn/spring-cloud-gateway/#gatewayfilter-%E5%B7%A5%E5%8E%82)
-[Spring-getway](http://c.biancheng.net/springcloud/gateway.html)