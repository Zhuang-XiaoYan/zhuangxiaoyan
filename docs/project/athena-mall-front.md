---
lang: zh-CN
sidebarDepth: 2
---

# Vue-Mall-Front前端项目

## 一、vue-mall-front项目简介

vue-mall-front项目为在线电商Web App (SPA)，项目包括首页, 搜索列表, 商品详情, 购物车, 订单, 支付, 用户登陆/注册等多个子模块，
使用Vue全家桶+ES6+Webpack+Axios等前端最新最热的技术，采用模块化、组件化、工程化的模式开发。
该项目能够帮助你快速的学习vue的相关技术，同时让你熟悉和了解大型项目的开发流程与设计，同时让你学习前端项目的技术选型与功能需求分析设计。

<img :src="$withBase('/project/athena-mall/vue-mall.png')" alt="vue-mall">

## 二、vue-mall-front前序

### 2.1 vue项目简介

你需要在本地安装 node 和 git。本项目技术栈基于 ES2015+、vue、vuex、vue-router 、vue-cli 、axios 和 element-ui，
所有的请求数据都使用Mock.js进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。
同时配套一个系列的教程文章，如何从零构建一个完整的前端项目，建议大家先看完这些文章再来实践本项目。

### 2.2 Vue知识体系

1. Vue Router 是 vue 官方的路由。它能快速的帮助你构建一个单页面或者多页面的项目。
2. Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。它能解决你很多全局状态或者组件之间通信的问题。
3. Vue Loader 是为 vue 文件定制的一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。它能在开发过程中使用热重载来保持状态，为每个组件模拟出 scoped CSS 等等功能。不过大部分情况下你不需要对它直接进行配置，脚手架都帮你封装好了。
4. Vue Test Utils 是官方提供的一个单元测试工具。它能让你更方便的写单元测试。
5. Vue Dev-Tools Vue 在浏览器下的调试工具。写 vue 必备的一个浏览器插件，能大大的提高你调试的效率。
6. Vue CLI 是官方提供的一个 vue 项目脚手架，本项目也是基于它进行构建的。它帮你封装了大量的 webpack、babel 等其它配置，让你能花更少的精力在搭建环境上，从而能更专注于页面代码的编写。不过所有的脚手架都是针对大部分情况的，所以一些特殊的需求还是需要自己进行配置。建议先阅读一遍它的文档，对一些配置有一些基本的了解。

## 三、vue-mall-front项目目录

```shell
├──vue-mall(整个项目名称)
|──────node_modules(项目依赖)
|──────public(项目的根容器)
|──────src(项目源代码)
|──────────api(项目api接口源码)
|──────────assets(项目共用的静态资源文件)
|──────────components(项目公共组件)
|──────────mock(模拟后端返回的数据)
|──────────pages/views(项目非公共组件)
|──────────plugins(项目插件)
|──────────router(项目路由)
|──────────store(vuex数据仓库)
|──────────App.vue(项目页面入口文件)
|──────────main.js(项目入口文件)
|──────vue-mall-resources(项目总结文件)
|──────────images(项目功能截图)
|──────────vue-mall_API接口(项目接口文件)
|──────────vue-mall的部署与访问(项目部署与访问文件)
|──────────vue-mall面试问题(面试问题)
|──────────vue-mall项目架构设计与技术选型(项目架构设计与技术选型)
|──────babel.config.js(ES6转ES5的文件)
|──────jsconfig.json(项目的名称缩写文件)
|──────package.json(项目的依赖版本管理文件)
|──────vue.config.js(vue的配置文件)
```

## 四、vue-mall-front开发与部署

### 4.1 vue-mall开发配置

**克隆项目**
```shell
git clone https://github.com/PanJiaChen/vue-element-admin.git
```
**进入项目目录**
```shell
cd vue-element-admin
```
**安装依赖(国内用户)**
```shell
npm install --registry=https://registry.npmmirror.com
```
**本地启动**
```shell
npm run build
```
**项目构建**
```shell
npm run build
```

::: tip
建议：
强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。
若还是不行，可使用 yarn 替代 npm。Windows 用户若安装不成功，很大概率是node-sass安装失败，解决方案。
另外因为 node-sass 是依赖 python环境的，如果你之前没有安装和配置过的话，需要自行查看一下相关安装教程。
:::

### 4.2 vue-mall生产部署

**拉取镜像**
```shell
docker pull registry.cn-hangzhou.aliyuncs.com/athena-zhaungxiaoyan/athena-mall-product:
```
**运行容器**
```shell
docker run --privileged=true --restart=always -nname==vue-mall -d -p 80:80  vue-mall:1.0.0 
```

## 五、vue-mall-front项目功能
     
### 5.1 home首页

<img :src="$withBase('/project/athena-mall/home.png')" alt="home">

### 5.2 搜索页面

<img :src="$withBase('/project/athena-mall/search.png')" alt="search">

### 5.3 商品的详情页面

<img :src="$withBase('/project/athena-mall/gooddetail.png')" alt="gooddetail">

### 5.4 商品添加成功

<img :src="$withBase('/project/athena-mall/goodadd.png')" alt="goodadd">

### 5.5 购车车页面

<img :src="$withBase('/project/athena-mall/shopcart.png')" alt="shopcart">

### 5.6 用户注册页面

<img :src="$withBase('/project/athena-mall/register.png')" alt="register">

### 5.7 用户登陆页面

<img :src="$withBase('/project/athena-mall/login.png')" alt="login">

### 5.8 订单结算页面

<img :src="$withBase('/project/athena-mall/order.png')" alt="order">

### 5.9 订单提交页面

<img :src="$withBase('/project/athena-mall/submitorder.png')" alt="submitorder">

### 5.10 支付页面

<img :src="$withBase('/project/athena-mall/pay.png')" alt="pay">

### 5.11 个人中心页面

<img :src="$withBase('/project/athena-mall/center.png')" alt="center">

## 六、Contribution

本文档项目地址 vue-mall 基于 vuepress开发。有任何修改和建议都可以该项目 pr 和 issue
vue-mall还在持续迭代中，逐步沉淀和总结出更多功能和相应的实现代码，本项目也十分期待你的参与和反馈。

## 七、捐赠

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 ❤️ Donate

## 八、浏览器支持版本

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions


## 九、博文参考

[vue-element-admin-文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/##%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)










