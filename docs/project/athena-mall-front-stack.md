---
lang: zh-CN
sidebarDepth: 2
---

# Athena-Mall-Front技术栈

## 一、athena-mall-front组件架构

<img :src="$withBase('/project/athena-mall/vue-stack.png')" alt="stack">

<img :src="$withBase('/project/athena-mall/vue-mall-components.png')" alt="components">

## 二、vue常用标签属性和指令

是带有v-前缀的特殊属性。指令属性的值预期是单一 JavaScript表达式。指令的职责就是当其表达式的值改变时相应地将某些行为应用到DOM上

### 2.1 数据绑定

数据绑定最常见的形式就是使用:{{data}}
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <h1>Message:{{name}}</h1>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    name: 'rous'
                }
            });
        </script>
    </body>
</html>
```

### 2.2 v-once

通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <h1>Message:{{name}}</h1>
            <br/>
            <h1 v-once>只会渲染一次，之后修改该data值还是不变{{name}}</h1>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    name: 'rous'
                }
            });
        </script>
    </body>
</html>
```

### 2.3 v-text指令

更新元素的 textContent（该标签的全部上下文）。如果要更新部分的 textContent ，需要使用 {{name}} 插值。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <h1>Message:{{name}}</h1>
            <br/>
            <h1 v-once>只会渲染一次，之后修改该data值还是不变{{name}}</h1>
            <h1 v-text="name">这段文字被覆盖</h1>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    name: 'rous'
                }
            });
        </script>
    </body>
</html>
```

### 2.4 v-html指令

渲染html节点，如果是使用{{name}}、v-text、v-once只会被解释为纯文本,注意：v-html数据绑定会被忽略
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <span>Message:{{htmlStr}}</span>
            <br/>
            <span v-once>只会渲染一次，之后修改该data值还是不变{{htmlStr}}</span>
            <br/>
            <span v-text="htmlStr">这段文字被覆盖</span>
            <div v-html="htmlStr"></div>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    name: 'rous',
                    htmlStr: '<h1>我是节点<h1/>'
                }
            });
        </script>
    </body>
</html>
```

### 2.5 v-model 指令

限制在input、select、textarea、components中使用，当绑定输入标签后，输入的值后原来定义的值也会改变

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <input v-model="name" />
            <p v-once>{{name}}</p>
            <h1 v-text="name"></h1>
            <h1>{{name}}</h1>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    name: 'rous'
                }
            });
        </script>
    </body>
</html>
```

### 2.6 v-bind 绑定指令
给标签绑定属性值,误区：标签的属性不能使用{{}}，来传达值

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
<div id="app1">
    <div v-bind:id="id"></div>
</div>
<script type="text/javascript" src="js/vue.js" ></script>
<script type="text/javascript">
    let vue = new Vue({
        el: '#app1',
        data: {
            id: 'div'
        }
    });
</script>
</body>
</html>
```

### 2.7 v-if 判断显示
当然还有v-else，v-else-if
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <p v-if="isOK">你可以看见我了</p>
            <p v-if="right">你能看见我吗？</p>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    isOK: false,
                    right: true,
                }
            });
        </script>
    </body>
</html>
```

### 2.8 v-show 是否显示

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <p v-show="isShow">你真的可以看见我了</p>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    isShow: true
                }
            });
        </script>
    </body>
</html>
```

### 2.9 v-for：循环
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <p v-for="(value, i) in list">值：{{value}}，索引：{{i}}</p>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    list: [1,2,3,4,5,6]
                }
            });
        </script>
    </body>
</html>
```

### 2.10 v-on 绑定事件
v-on指令是绑定事件，v-on:click 可以简写成 @click
```text
.stop - 调用 event.stopPropagation()。
.prevent - 调用 event.preventDefault()。
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
```
```html
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>
```

### 2.11 v-pre 跳过编译
跳过这个元素和它的子元素的编译过程。一些静态的内容不需要编辑加这个指令可以加快编辑

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <div id="app1">
            <p v-pre>{{list}}</p>
            <p>{{list}}</p>
           </div>
        <script type="text/javascript" src="js/vue.js" ></script>
        <script type="text/javascript">
            let vue = new Vue({
                el: '#app1',
                data: {
                    list: [1,2,3,4,5,6]
                }
            });
        </script>
    </body>
</html>
```

## 三、vue的生命周期函数

生命周期： Vue是一个构造函数，当执行执行这个函数时，相当于初始化vue实例；
在创建实例过程中，需要设置数据监听，编译模板，将实例挂载到DOM上，数据更新能够让DOM也更新，
在这个初始化，又会不同阶段默认调用一些函数执行，这些函数就是生命周期的钩子函数；

<img :src="$withBase('/project/athena-mall/vue-life.png')" alt="life">

### 3.1 beforeCreate 函数

这个阶段 vue 实例刚刚在内存中创建，此时 data 和 methods 这些都没初始化好。

### 3.2 created 函数

这个阶段 vue 实例在内存中已经创建好了，data 和 methods 也能够获取到了，但是模板还没编译。

### 3.3 beforeMount 函数

这个阶段完成了模板的编译，但是还没挂载到页面上。要挂载的对象都编译好了，但是页面的 DOM 树还没挂上去，这个阶段页面还没能显示出来。

### 3.4 mounted 函数

这个阶段，模板编译好了，也挂载到页面中了，页面也可以显示了。

### 3.5 beforeUpdate 函数

转态更新之前执行此函数，此时 data 中数据的状态值已经更新为最新的，但是页面上显示的数据还是最原始的，
还没有重新开始渲染 DOM 树。

### 3.6 updated 函数

这个阶段是转态更新完成后执行此函数，此时 data 中数据的状态值是最新的，
而且页面上显示的数据也是最新的，DOM 节点已经被重新渲染了。

### 3.7 beforeDestroy 函数

beforeDestroy 阶段处于 vue 实例被销毁之前，当然，这个阶段 vue 实例还能用。

### 3.8 destroyed 函数

这个阶段在 vue 实例销毁后调用，此时所有实例指示的所有东西都会解除绑定，事件监听器也都移除，子实例也被销毁。

### 3.9 activited 函数

keep-alive 专属，组件被激活时调用

### 3.10 deactivated 函数

keep-alive 专属，组件被销毁时调用

### 3.11 errorcaptured 函数

捕捉子组件错误时调用

### 3.12 父子组件钩子函数

- 挂载：父亲created> 子created > 子mounted> 父亲mounted>
- 更新：父亲beforeUpdate > 子beforeUpdated > 子updated > 父亲updated
- 销毁：父亲beforeDestroy> 子beforeDestroy > 子destroyed> 父destroyed

## 四、vuex的数据仓库

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，
并以相应的规则保证状态以一种可预测的方式发生变化。切记，并不是全部项目都需要Vuex，如果项目很小，完全不需要Vuex，
如果项目很大，组件很多、数据很多，数据维护很费劲，

这个状态自管理应用包含以下几个部分：
* 状态，驱动应用的数据源；
* 视图，以声明方式将状态映射到视图；
* 操作，响应在视图上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：

<img :src="$withBase('/project/athena-mall/vuex-simple.png')" alt="simple">

但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
* 多个视图依赖于同一状态。
* 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。
以上的这些模式非常脆弱，通常会导致无法维护的代码。
因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？
在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，
任何组件都能获取状态或者触发行为！

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，
我们的代码将会变得更结构化且易维护。

这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux 和 The Elm Architecture。
与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，
以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

<img :src="$withBase('/project/athena-mall/vuex.png')" alt="vuex">

```js
// 配置devtools显示vuex组件
Vue.config.devtools = true
```

```js
// shopcart的仓库
import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";
//state:仓库存储数据的地方
const state = {
    cartList:[],
};
//mutations:修改state的唯一手段
const mutations = {
    CARTLIST(state,cartList){
        state.cartList=cartList;
    },
};
//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取购物车列表的数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("CARTLIST", result.data)
        }
    },
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
```

## 五、vue-router的导航

<img :src="$withBase('/project/athena-mall/vue-router.png')" alt="vue-router">

```js
export default [
    {
        name: "center",
        path: "/center",
        // 设置路由懒加载
        component: ()=>import("@/pages/Center/CenterPage.vue"),
        meta: {show: true},
        // 二级路由
        children: [
            {
                path: "myorder",
                component: ()=>import("@/pages/Center/MyOrder/MyOrder.vue"),
            },
            {
                path: "grouporder",
                component: ()=>import("@/pages/Center/GroupOrder/GroupOrder.vue"),
            },
            {
                path: "/center",
                redirect:"/center/myorder",
            },
        ],
    },
    {
        name: "paysuccess",
        path: "/paysuccess",
        component: ()=>import("@/pages/PaySuccess/index.vue"),
        meta: {show: true},
    },
    {
        name: "pay",
        path: "/pay",
        component: ()=>import("@/pages/Pay/PayPage.vue"),
        meta: {show: true},
        // 设置路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须是从购物车而来
            if (from.path=="/trade"){
                next();
            }else {
                // 其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        name: "trade",
        path: "/trade",
        component: ()=>import("@/pages/Trade/TradePage.vue"),
        meta: {show: true},
        // 设置路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须是从购物车而来
            if (from.path=="/shopcart"){
                next();
            }else {
                // 其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        name: "shopcart",
        path: "/shopcart",
        component: ()=>import("@/pages/ShopCart/ShopCart.vue"),
        meta: {show: true},
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: ()=>import("@/pages/AddCartSuccess/AddCartSuccess.vue"),
        meta: {show: true},
    },
    {
        name: "detail",
        path: "/detail/:skuid",
        component: ()=>import("@/pages/Detail/DetailPage.vue"),
        meta: {show: true},
    },
    {
        name: "home",
        path: "/home",
        component: ()=>import("@/pages/Home/HomaPage.vue"),
        meta: {show: true},
    },
    {
        name: "search",
        path: "/search",
        component: ()=>import("@/pages/Search/SearchPage.vue"),
        meta: {show: true},
    },
    {
        name: "login",
        path: "/login",
        component: ()=>import("@/pages/Login/LoginPage.vue"),
    },
    {
        name: "register",
        path: "/register",
        component: ()=>import("@/pages/Register/RegisterPage.vue"),
    },
    // 重定向，在项目启动的时候定向到home下面
    {
        path: "/",
        redirect: "/home",
    },
]
```

### 5.1 vue-router的类型
- **声明式导航**:router-link（务必要有to属性），可以实现路由的跳转  router-view来指定的显示的位置
- **编程式导航**:利用的是组件实例的$router.push|replace方法，可以实现路由的跳转。[(可以书写一些自己业务)


**编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误?**

路由跳转有两种形式:**声明式导航、编程式导航**

声明式导航没有这类问题的，因为vue-router底层已经处理好了，为什么编程式导航进行路由跳转的时候，就有这种警告错误那?"vue-router3.5.3":最新的vue-router引入promise

通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。但是这方法是不治本
```js
this.$router .push({name :"search",params: {keyword:this.keyword} ,query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});T
```
重写push和replace的方法能够彻底解决多次执行会抛出NavigationDuplicated的警告错误
```js
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;

VueRouter.prototype.push=function (location,reslove,reject){
    if (reslove&&reject){
        originPush.call(this,location,reslove,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace=function (location,reslove,reject){
    if (reslove&&reject){
        originReplace.call(this,location,reslove,reject)
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}
```

**call与apply区别?**
- 相同点，都可以调用函数一次，都可以篡改函数的上下文一次。
- 不同点: call与apply传递参数: call传递参数用逗号隔开，apply方法执行，传递数组。

## 六、vue-router路由守卫

### 6.1 全局前置路由守卫
全局前置路由守卫.—初始化的时候被调用、每次路由切换之前被调用
```js
router.beforeEach(to,from,next)
```

### 6.2 全局后置路由守卫
全局后置路由守卫.—初始化的时候被调用、每次路由切换之后被调用
```js
router.afterEach(to,from)
```

### 6.3 独享路由守卫
组件的独享路由
```js
beforeEnter(to,from,next)
```

### 6.4 组件内路由守卫
**通过路由规则,进入该组件时被调用**
```js
beforeRouterEnter(to,from,next)
```
**通过路由规则,离开该组件时被调用**
```js
beforeRouterLeave(to,from,next)
```

### 6.5 vue-mall的路由设置
```js
// 全局守卫:前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // 表示全部放行
    // next();
    //用户登录了,才会有token,未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name= store.state.user.userInfo.name;
    // 用户登录才会有token
    if (token){
        // 用户如果还去login
        if (to.path=='/login'){
            // 直接给他跳转到home 首页
            next("/home")
        }else {
            // 登陆了去的不是login而是其他页面
            if (name){
                // 如果用户已经有了，表示已经登录，那么应该是都可以放行。
                next();
            }else {
                // 如果是没有用户信息，表示没有登录，那么在有的页面就不能登录了
                // 获取用户信息在首页展示
                try {
                    await  store.dispatch("getUserInfo");
                    // 放行访问页面
                    next()
                }catch (error){
                    // 打印错误
                    alert(error.message);
                    // 信息失效了，清楚原来的token
                    await store.dispatch("userLogOut")
                    // 用户需要重新登录
                    next("/login")
                }
            }
        }
    }else {
        // 未登录:不能去交易相关、不能去支付相关pay|paysuccess，不能去个人中心
        let topath=to.path;
        if (topath.indexOf('/trade')!=-1 ||topath.indexOf('/pay')!=-1|| topath.indexOf('/center')!=-1 ){
            // 把未登录的时候向去而没有去成的信息,存储于地址栏中
            next('/login?redirect='+topath);
        }else {
            // 其他的应该放行
            next()
        }
    }
})
```

### 6.6 路由懒加载

**为什么要使用路由懒加载？**

1. 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，
   然后当路由被访问的时候才加载对应组件，这样会更加高效，是一种优化手段；
2. 一般来说，对所有的路由都使用动态导入是个好主意；
3. 给component选项配置一个返回Promise组件的函数就可以定义懒加载路由。通常结合webpack提供的动态导入方法import使用：
   {path:'/users/:id',component:()=>import('./views/UserDetails')}
4. 结合注释()=>import(/*webpackChunkName:"group-user" */ './UserDetails.vue')可以做webpack代码分块；
   vite中结合rollupOptions定义分块；
5. 这里注意其实懒加载的写法是告诉打包器我要异步加载路由，但不是异步组件，路由中不能写异步组件，组件中使用异步组件是没问题的；
6. component（和components）配置如果接收一个返回 Promise 组件的函数，Vue Router只会在第一次进入页面时才会获取这个函数，然后使用缓存数据；

**路由懒加载的作用**

- 将路由对应的组件打包成一个个的js代码块
- 只有在这个路由被访问时，才加载对应组件
- 本质就是按需加载，这样会更加高效，是一种优化手段；


### 6.7 全局组件注册

main.js中设置全局组件注册
```js
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import CarouselPage from "@/components/Carousel/CarouselPage.vue";
import PaginationPage from "@/components/Pagination/PaginationPage.vue";
// 全局组件注册
Vue.component(TypeNav.name,TypeNav)
Vue.component(CarouselPage.name,CarouselPage)
Vue.component(PaginationPage.name,PaginationPage)
```

在组件中直接使用
```vue
<TypeNav></TypeNav>
```

## 七、vue的项目配置

### 7.1 vue.config.js

```js
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 上线配置路径访问路径
    publicPath: process.env.NODE_ENV === 'production'? '/athena-mall/': '/',
    transpileDependencies: true,
    // 关闭ESLint的校验工具的关闭 上线前进行开启检查
    lintOnSave: false,
    devServer: {
        port: 80,
        open: true,
        // 配置跨域的代理设置
        proxy: {
            '/api': {
                target: "http://sph-h5-api.atguigu.cn",
                ws:true,
                changeOrigin:true,
            },
        },
    },
    // 如果你不需要生产环境的 source map，可以将其设置为false以加速生产环境构建。
    productionSourceMap: false,
})
```

### 7.2 main.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import CarouselPage from "@/components/Carousel/CarouselPage.vue";
import PaginationPage from "@/components/Pagination/PaginationPage.vue";
// 引入mock 服务
import '@/mock/mockService'
// 引入swiper的样式文件
import 'swiper/css/swiper.css'
// 引入element-ui的问题
import {Button,MessageBox} from "element-ui";
// 引入插件服务
import "@/plugins/validate"
import "@/plugins/vuelazyload"
// 全局组件注册
Vue.component(TypeNav.name,TypeNav)
Vue.component(CarouselPage.name,CarouselPage)
Vue.component(PaginationPage.name,PaginationPage)
Vue.component(Button.name,Button)
//ElementUI注册组件的时候,还有一种写法，挂在原型上
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
Vue.config.productionTip = false
// 统一接口api文件夹里面的全部请求函数
import * as API from "@/api"

new Vue({
    render: h => h(App),
    // 配置全局事件总线
    beforeCreate() {
        Vue.prototype.$bus=this;
        Vue.prototype.$API=API;
    },
    router,
    store,
}).$mount('#app')
```

## 八、mock服务与原理

<img :src="$withBase('/project/athena-mall/mockjs.png')" alt="mockjs">

1. 自定义Mock对象，XHR属性用来拦截的原生**window.XMLHttpRequest**，_mocked属性用来存储拦截的请求
2. 由于拦截了原生XHR，所以在http请求的时候，会走Mock.XHR逻辑
3. Mock.XHR，**即MockXMLHttpRequest，同样封装了跟原生XHR相同的open(), send(),abort()相同的方法**
4. open()中，在Mock._mocked中查找是否有匹配的请求，有的话开始拦截，标记拦截请求match；没有的话采用原生 XHR 发送请求。
5. send()中，根据拦截标志位match，判断是否采用原生XHR.send();abort()中也同理。

```js
// mock.js
var XHR
if (typeof window !== 'undefined') XHR = require('./mock/xhr')

var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    XHR: XHR,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    _mocked: {}
}

// 避免循环依赖
if (XHR) XHR.Mock = Mock

Mock.mock = function(rurl, rtype, template) {
    // 拦截 XHR：将自定义的XHR赋值给原生的window.XMLHttpRequest
    if (XHR) window.XMLHttpRequest = XHR
    // 将每一次的mock请求存到_mocked对象中
    Mock._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    }
    return Mock
}

module.exports = Mock
```

```js
// xhr.js
function MockXMLHttpRequest() {
    // 初始化 custom 对象，用于存储自定义属性
    this.custom = {
        events: {},
        requestHeaders: {},
        responseHeaders: {}
    }
}

// 标记当前对象为 MockXMLHttpRequest
MockXMLHttpRequest.prototype.mock = true

// 是否拦截 Ajax 请求
MockXMLHttpRequest.prototype.match = false

// 初始化 Request 相关的属性和方法
Util.extend(MockXMLHttpRequest.prototype, {
    // Sets the request method, request URL, and synchronous flag.
    open: function (method, url, async, username, password) {
        // 查找与请求参数匹配的数据模板
        var item = find(this.custom.options)
        // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
        if (!item) {
            // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
            var xhr = createNativeXMLHttpRequest()
            this.custom.xhr = xhr
        }
        // 找到了匹配的数据模板，开始拦截 XHR 请求
        // 标记拦截请求
        this.match = true
        this.readyState = MockXMLHttpRequest.OPENED
    },
    send: function send(data) {
        var that = this
        this.custom.options.body = data

        // 原生 XHR
        if (!this.match) {
            this.custom.xhr.send(data)
            return
        }

        // 拦截 XHR
        if (this.custom.async) setTimeout(done, this.custom.timeout) // 异步延迟执行done
        else done() // 同步直接执行done

        function done() {
            that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))
            that.readyState = MockXMLHttpRequest.LOADING
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))

            that.status = 200
            that.statusText = HTTP_STATUS_CODES[200]

            // fix #92 #93 by @qddegtya
            that.response = that.responseText = JSON.stringify(
                convert(that.custom.template, that.custom.options),
                null, 4
            )

            that.readyState = MockXMLHttpRequest.DONE
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))
            that.dispatchEvent(new Event('load' /*, false, false, that*/));
            that.dispatchEvent(new Event('loadend' /*, false, false, that*/));
        }
    },
    abort: function abort() {
        // 原生 XHR
        if (!this.match) {
            this.custom.xhr.abort()
            return
        }

        // 拦截 XHR
        this.readyState = MockXMLHttpRequest.UNSENT
        this.dispatchEvent(new Event('abort', false, false, this))
        this.dispatchEvent(new Event('error', false, false, this))
    },
}
```

## 九、axios请求与封装

```js
// 对于axios的二次封装
import axios from "axios";
import nprogress from "nprogress"
import store from "@/store";
// 引入样式
import "nprogress/nprogress.css"
// 利用axios 对象create 创建一个axios的实例
// request就是axios 只是增加相关的配置
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情.
requests.interceptors.request.use((config) => {
    // 请求头添加一个字段(userTempId):和后台老师商量好了
    if (store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 携带token带给服务器
    if (store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start();
    return config;
})
// 响应的拦截器
requests.interceptors.response.use((response) => {
    nprogress.done();
    // 成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return response.data
}, (error) => {
    //响应失败的回调函数
    console.log(error)
    return Promise.reject(new Error("failed"));
})
export default requests
```

## 十、页面的防抖与节流原理

**卡顿现象**

事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿)

**函数的防抖与节流**

- 节流:在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
- 防抖:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发只会执行一次

```js
// 正常情况（用户慢慢的操作）:鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
// 非正常情况（用户操作很快)∶本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发
// 就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
import throttle from "loadsh/throttle";
changeIndex: throttle(function (index) {
    this.currentIndex = index
}, 50)
```

**三级联动:如果使用声明式导航router-link，可以实现路由的跳转与传递参数。但是需要注意，出现卡顿现象。**

创建组件实例的时候，一瞬间创建1000+很消耗内存的，因此出现了卡顿现象。
最好的解决方案:**编程式导航+事件委派** 但是存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
点击a标签的时候I才会进行路由跳转【怎么能确定点击的一定是a标签】
```js
let element = event.target
// 获取到当前出发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点[一定是a标签]
let {categoryname, category1id, category2id, category3id} = element.dataset;
```

## 十一、query和params参数传递

路由参数传递：
1. 字符串形式传递
```js
this.$router.push(" /search/" + this.keyword+" ?k="+this.keyword.toupperCase());
```

2. 模板字符串传递
```js
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
```

3. 对象参数传递

```vue
goSearch(){
    this.$router.push({
        name: "search",
        query: {
            ...this.$route.query,
            keyword: this.keyword || undefined,
        },
    });
},
```

**路由传递参数（对象写法）path是否可以结合params参数一起使用?**

路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

**如何指定params参数可传可不传?**

比如:配置路由的时候，占位了(params参数），但是路由跳转的时候就不传递。路径会出现问题.
错误的路径
```html
http://localhost:8080/#/?k=QWE
```
正确的路径
```html
right path: http://localhost:8080/#/search?k=QWE
```
可以使用
```html
{
    name: "search",
    path: "/search:keyword?",// 添加?号
    component: ()=>import("@/pages/Search/SearchPage.vue"),
    meta: {show: true},
},
```

**params参数可以传递也可以不传递，但是如果传递是空串，如何解决?**
使用undefined解决:params参数可以传递、不传递（空的字符串）

**query和params参数合并**

```js
 // 判断:如果路由跳转的时候,带有params参数，捎带脚传递过去
if (this.$route.params){
    location.params=this.$route.params;
    // 合并参数
    location.query = query;
    // 路由跳转
    this.$router.push(location)
}
```

## 十二、proxy的跨域原理与设置

```js
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 上线配置路径访问路径
    publicPath: process.env.NODE_ENV === 'production'? '/athena-mall/': '/',
    transpileDependencies: true,
    // 关闭ESLint的校验工具的关闭 上线前进行开启检查
    lintOnSave: false,
    devServer: {
        port: 80,
        open: true,
        // 配置跨域的代理设置
        proxy: {
            // 如果路由中有api 就进使用代理服务器调用发送api
            '/api': {
                target: "http://sph-h5-api.atguigu.cn",
                ws:true,
                changeOrigin:true,
            },
            // 对路径进行重写，并使用新的代理
            '/dev': {
                target: "http://10.34.64.19",
                pathRewrite: {'^/dev': ''},
                ws:true,
                changeOrigin:true,
            },
        },
    },
    // 如果你不需要生产环境的 source map，可以将其设置为false以加速生产环境构建。
    productionSourceMap: false,
})
```

## 十三、less与css的区别

Less（Leaner Style Sheets 的缩写） 是一门向后兼容的CSS扩展语言。这里呈现的是 Less 的官方文档（中文版），
包含了Less语言以及利用JavaScript开发的用于将Less样式转换成CSS样式的Less.js 工具。
因为Less和CSS非常像，因此很容易学习。而且Less仅对CSS语言增加了少许方便的扩展，这就是 Less 如此易学的原因之一。

## 十四、组件通信六种方式

Vue是数据驱动视图更新的框架, 所以对于Vue来说组件间的数据传递通信非常重要，那么组件之间如何进行数据通信的呢？
在回答这问题之前我们要先了解组件之间都存在什么关系？

<img :src="$withBase('/project/athena-mall/vue-community.png')" alt="community">

在组件树中可以看到：
- AB、AC、AD、CE、DF、BG是父子组件
- BCD 是兄弟组件
- AE、AG、AF是祖孙组件

所以针对存在的3中组件关系我们也总结出了4类通信的方法：
- 父子组件通信: props / $emit、$parent / $children、 provide / inject 、ref 、$attrs / $listeners;
- 兄弟组件通信: eventBus 、 Vuex
- 跨级通信: eventBus、Vuex、provide / inject 、$attrs / $listeners
- 访问根实例: $root

### 14.1 props/emit

1. 父组件向子组件传值 prop

prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。

```vue
// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList"></com-article>
  </div>
</template>

<script>
import comArticle from "./test/article.vue";
export default {
  name: "HelloWorld",
  components: { comArticle },
  data() {
    return {
      articleList: ["红楼梦", "西游记", "三国演义"]
    };
  }
};
</script>
```
```vue
// 子组件 article.vue
<template>
  <div>
    <span v-for="(item, index) in articles" :key="index">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: ["articles"]
};
</script>
```

总结: prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 prop 只读，不可被修改，所有修改都会失效并警告。
注意：prop的类型校验,prop的命名

2. 子组件向父组件传值 emit

Vue 实例提供了一个自定义事件的系统。父级组件可以像处理 native DOM 事件一样通过 v-on 监听子组件实例的任意事件;
子组件可以通过调用内建的 $emit 方法并传入事件名称来触发一个事件，同时也可以传递第二个参数来给父组件传递数据。

```vue
// 父组件中
<template>
  <div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>
 
<script>
import comArticle from "./test/article.vue";
export default {
  name: "HelloWorld",
  components: { comArticle },
  data() {
    return {
      currentIndex: -1,
      articleList: ["红楼梦", "西游记", "三国演义"]
    };
  },
  methods: {
    onEmitIndex(idx) {
      this.currentIndex = idx;
    }
  }
};
</script>
```

```vue
// 在子组件中
<template>
  <div>
    <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
  </div>
</template>
 
<script>
export default {
  props: ["articles"],
  methods: {
    emitIndex(index) {
      this.$emit("onEmitIndex", index);   // 如果传递多个参数可以传递一个json
    }
  }
};
</script>
```

### 14.2 children/parent
$parent property 可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，
以替代将数据以 prop 的方式传入子组件的方式。

vm.$children当前实例的直接子组件。需要注意$children并不保让顺序，也个定呵应式的。如发现自己正在尝试使用$children来进行数据绑定，
考虑使用一个数组配合v-for来生成子组件，并且使用Array作为真正的来源。

```vue
// 父组件中
<template>
  <div class="hello_world">
    <div>{{msg}}</div>
    <com-a></com-a>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>
 
<script>
import ComA from "./test/comA.vue";
export default {
  name: "HelloWorld",
  components: { ComA },
  data() {
    return {
      msg: "Welcome"
    };
  },

  methods: {
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = "this is new value";
    }
  }
};
</script>
```

```vue
// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为: {{parentVal}}</p>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      messageA: "this is old"
    };
  },
  computed: {
    parentVal() {
      return this.$parent.msg;
    }
  }
};
</script>
```

注意：
- $children 是一个数组，是直接儿子的集合，关于具体是第几个儿子，那么儿子里面有个 _uid 属性，可以知道他是第几个元素，是元素的唯一标识符，根据这个属性，我们可以进行其他的操作
- 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
- 当前实例的直接子组件。需要注意 children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。

### 14.3 provide/inject 依赖注入

provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过inject来注入变量。
由于$parent property 无法很好的扩展到更深层级的嵌套组件上。使得provide 和 inject 得到了用武之地。

假设有三个组件: A.vue、B.vue、C.vue 其中 C是B的子组件，B是A的子组件

```vue
<template>
  <div>
    <comB></comB>
    {{ isShowRouter }}
  </div>
</template>
 
<script>
import comB from './b.vue'
export default {
  name: 'A',
  // provide 选项允许我们指定我们想要提供给后代组件的数据/方法。
  provide() {
    return {
      for: '这是组件',
      reload: this.reload
    }
  },
  components: {
    comB
  },
  data() {
    return{
      isShowRouter:true,
    }
  },
  methods: {
    reload(){
      this.isShowRouter = false
      this.$nextTick(()=>{
        this.isShowRouter = true
      })
    }
  }
}
</script>
```

```vue
// B.vue
 
<template>
  <div>
    {{ demo }}
    <comC></comC>
  </div>
</template>
 
<script>
import comC from './c.vue'
export default {
  name: 'B',
  inject: ['for','reload'],
  components: {
    comC
  },
  data() {
    return {
      demo: this.for
    }
  } 
}
</script>
```

```vue
// C.vue
<template>
  <div>{{ demo }}</div>
</template>

<script>
export default {
  name: 'C',
  inject: ['for'],
  data() {
    return {
      demo: this.for
    };
  }
};
</script>
```
provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

### 14.4 ref/refs

访问子组件实例或子元素
- 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
- 如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据。

我们看一个ref 来访问组件的例子:
```vue
// 子组件 A.vue
export default {
  data() {
    return {
      name: "Vue.js"
    };
  },
  methods: {
    sayHello() {
      console.log("hello");
    }
  }
};
```

```vue
// 父组件 app.vue
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
export default {
  mounted() {
    const comA = this.$refs.comA;
    console.log(comA.name); // Vue.js
    comA.sayHello(); // hello
  }
};
</script>
```

$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。

### 14.5 eventBus

eventBus 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，
所以组件都可以通知其他组件。缺点就是当项目较大,就容易造成难以维护的灾难。

初始化 首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它。

```vue
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

发送事件 假设你有两个组件: additionNum 和 showNum, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:

```vue
<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
  </div>
</template>
 
<script>
import showNumCom from "./showNum.vue";
import additionNumCom from "./additionNum.vue";
export default {
  components: { showNumCom, additionNumCom }
};
</script>
```

```vue
// addtionNum.vue 中发送事件
<template>
  <div>
    <button @click="additionHandle">+加法器</button>
  </div>
</template>
 
<script>
import { EventBus } from "./event-bus.js";
console.log(EventBus);
export default {
  data() {
    return {
      num: 1
    };
  },

  methods: {
    additionHandle() {
      EventBus.$emit("addition", {
        num: this.num++
      });
    }
  }
};
</script>
```

接收事件

```vue
// showNum.vue 中接收事件
 
<template>
 <div>计算和: {{count}}</div>
</template>
 
<script>
import { EventBus } from './event-bus.js'
export default {
 data() {
  return {
   count: 0
  }
 },
 mounted() {
  EventBus.$on('addition', param => {
   this.count = this.count + param.num;
  })
 }
}
</script>
```

移除事件监听者

```vue
import { eventBus } from'event-bus.js'
EventBus.$off('addition', {})
```

如果使用不善，EventBus会是一种灾难，到底是什么样的“灾难”了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，
与之相关的EventBus会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，
也是一个非常大的隐患。这时候我们就需要好好处理EventBus在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus事件监听。

### 14.6 Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.
Vuex 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上。
- state：用于数据的存储，是store中的唯一数据源
- getters：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
- mutations：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
- actions：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
- modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

### 14.7 localStorage / sessionStorage

- 这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。
- 通过window.localStorage.getItem(key)获取数据
- 通过window.localStorage.setItem(key,value)存储数据
- 注意用JSON.parse() / JSON.stringify() 做数据格式转换
- localStorage / sessionStorage可以结合vuex, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.

### 14.8 attrs与listeners

$listeners可以让你在孙子组件改变父组件的值:

```vue
<template>
  <div>
    <childcom :name="name" :age="age" :sex="sex" @testChangeName="changeName"></childcom>
  </div>
</template>
<script>
export default {
  'name':'test',
  props:[],
  data(){
    return {
      'name':'张三',
      'age':'30',
      'sex':'男'
    }
  },
  components:{
    'childcom':{
      props:['name'],
      template:`<div>
                <div>我是子组件   {{name}}</div>
                <grandcom v-bind="$attrs" v-on="$listeners"></grandcom>
            </div>`,

      components: {
        'grandcom':{
          template:`<div>我是孙子组件-------<button @click="grandChangeName">改变名字</button></div>`,
          methods:{
            grandChangeName(){
              this.$emit('testChangeName','kkkkkk')
            }
          }
        }
      }
    }
  },
  methods:{
    changeName(val){
      this.name = val
    }
  }
}
</script>
```

隔代传递数据的方法：
- 使用props绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
- 使用eventBus,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
- 使用Vuex来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.

在vue2.4中，引入了attrs与listeners， 新增了inheritAttrs 选项。 在版本2.4以前，默认情况下,
父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)，将会“回退”且作为普通的HTML特性应用在子组件的根元素上。
接下来看一个跨级通信的例子:
```vue
// app.vue
// index.vue

<template>
  <div>
    <child-com1 :name="name" :age="age" :gender="gender" :height="height" title="程序员成长指北"></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      name: "zhang",
      age: "18",
      gender: "女",
      height: "158"
    };
  }
};
</script>
```

```vue
// childCom1.vue
<template class="border">
  <div>
    <p>name: {{ name}}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2> 
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    name: String // name作为props属性绑定
  },
  created() {
    console.log(this.$attrs);
    // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
  }
};
</script>
```

```vue
// childCom2.vue
<template>
  <div class="border">
    <p>age: {{ age}}</p>
    <p>childCom2: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    age: String
  },
  created() {
    console.log(this.$attrs);
    // { "gender": "女", "height": "158", "title": "程序员成长指北" }
  }
};
</script>
```

### 14.9 $root

在每个 new Vue 实例的子组件中，其根实例可以通过 $root property 进行访问。例如，在这个根实例中：

```vue
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```
所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。
```vue
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

## 十五、require的用法

require 是 node 中的一个方法，他的作用是 “用于引入模块、 JSON、或本地文件”。 也就是说如果我们使用 require 来引入一个图片文件的话，
那么 require 返回的就是用于引入的图片（npm 运行之后图片的编译路径）。 而如果使用字符串的话，那么则是一个string 类型的固定字符串路径。
我们知道，src 中引入的图片应该为图片的本身路径（相对路径或者绝对路径），而vue项目通过webpack的 devServer运行之后，默认的 vue-cli 配置下，
图片会被打包成 name.hash 的图片名，在这种情况下，如果我们使用固定的 字符串路径则无法找到该图片，所以需要使用require方法来返回 图片的编译路径。
简单的说，使用require定义之后，你就可以动态使用了，不用require你就只能写死的。不用的话， :src="’…/img/image.jpg’" 会被解析为字符串
require 方法介绍： http://nodejs.cn/api/modules.html#modules_require_id

## 十六、数据校验validate

veeValidate 是专用于 Vue.js 的验证库。它有很多开箱即用的验证规则，也支持自定义验证规则。
它基于模板，所以它和 HTML5 的验证 API 比较类似，而且我们也比较熟悉。
我们可以验证 HTML5 input 输入框，以及我们自定义的 Vue 组件。
特点：
* 基于模板的验证
* 提供了许多开箱即用的验证规则
* 一流的本地化支持
* 可以验证 HTML5 input 输入框和自定义 Vue 组件
* 自定义规则和错误消息

```shell
npm install vee-validate --save
```
```js
<script src="https://unpkg.com/vee-validate"></script>
```

* alpha: 只包含英文字符
* alpha_dash: 可以包含英文、数字、下划线、破折号
* alpha_num: 可以包含英文和数字
* alpha_spaces: 可以包含英文和数字
* between:{min},{max}: 在min和max之间的数字
* confirmed:{target}: 必须和target一样
* digits:{length}: 长度为length的数字
* dimensions:{width},{height}: 符合宽高规定的图片
* email: 符合邮箱规则
* excluded: 排除，不包括
* ext:[extensions]: 后缀名
* image: 图片
* integer: 整型
* is: 必须是
* is_not: 不是
* length: 规定输入内容长度
* max:{length}: 规定输入内容的最大长度为length
* min:{length}: 规定输入内容的最小长度为length
* max_value:{val}: 规定输入最大数值为val的
* min_value:{val}: 规定输入最小数值为val的
* mimes:[list]: 文件类型
* numeric: 只允许数字
* oneOf: 其中之一

```js
// vee-validate插件 表单的验证区域
import Vue from 'vue'
import zh_CN from "vee-validate/dist/locale/zh_CN"
import VeeValidate from "vee-validate";
// 注册插件
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同`
    },
    attributes:{
        phone:"手机号",
        code:"验证码",
        password:"密码",
        password1:"确认密码",
        agree:"协议",
    }
});

// 自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate:value => {
        return value
    },
    getMessage:field => field+"同意协议后才能注册"
})
```

## 十七、vue-cli的使用与配置

新创建的 vue 项目没有这个文件，需要自己在根目录创建 vue.config.js

```js
module.exports = {
    publicPath: 'vue', //  可以配置二级目录，比如：`http://localhost:8080/vue`
    outputDir: 'output', //  这其实改变了 webpack 配置中 output 下的`path`项，修改了文件的输出路径
    productionSourceMap:true,//  该配置会修改 webpack 中`devtool`项的值为`source-map`，打包的文件中会包含 js 对应的.map 文件
}
```

chainWebapck：更细粒度的控制 webpack 的内部配置，其集成的是webpack-chain这一插件，该插件可以让我们能够使用链式操作来修改配置

```js
const merge = require('webpack-merge')
module.exports = {
    // config 参数为已经解析好的 webpack配置
    chainWebpack: config => {
    config.module
        .rule('image')
        .use('url-loader')
        .tap(options =>
            merge(options,{
                limit: 5120
            })
        )
    }
}
```
以上操作我们可以成功修改 webpack 中 module 项里配置 rules 规则为图片下的 url-loader 值，将其 limit 限制改为 5M

devServer：vue.config.js 还提供了 devServer 项用于配置 webpack-dev-server 的行动，使得我们可以对本地服务器进行相应配置，
我们在命令中运行的yarn serve对应的命令vue-cli-service server其实便是基于 webpack-dev-server 开启的一个本地服务器，
其常用配置参数如下：

```js
//vue.config.js
module.exports ={
    devServer: {
    open: true, // 是否自动打开浏览器页面
        host: '0.0.0.0',//指定使用一个host。默认是localhost
        port: 8080, //端口地址
        https: false, //使用https提供服务
        proxy: null, // string | Object 代理设置
        // 提供秒服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
        // `app` 是一个express实例
        }
    }
}
```

## 博文参考
- [less](https://less.bootcss.com/)
- [vuex](https://vuex.vuejs.org/zh/)
- [vue-router](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
- [mock的插件](https://github.com/nuysoft/Mock/wiki/Getting-Started)