---
lang: zh-CN
sidebarDepth: 2
---

# 保证消息幂等性设计

## 一、幂等性设计背景

幂等概念来自数学，表示N次变换和1次变换的结果是相同的。这里讨论在某些场景下，客户端在调用服务没有达到预期结果时，
会进行多次调用，为避免多次重复的调用对服务资源产生副作用，服务提供者会承诺满足幂等。HTTP/1.1中对幂等性的定义是：
一次和多次请求某一个资源对于资源本身应该具有同样的副作用（网络超时等问题除外）。也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同。

* 幂等不仅仅只是一次（或多次）请求对资源没有副作用（比如查询数据库操作，没有增删改，因此没有对数据库有任何影响）。
* 幂等还包括第一次请求的时候对资源产生了副作用，但是以后的多次请求都不会再对资源产生副作用。
* 幂等关注的是以后的多次请求是否对资源产生的副作用，而不关注结果。
* 网络超时等问题，不是幂等的讨论范围。

幂等性是系统服务对外一种承诺（而不是实现），承诺只要调用接口成功，外部多次调用对系统的影响是一致的。
声明为幂等的服务会认为外部调用失败是常态，并且失败之后必然会有重试。

## 二、幂等的适用场景

业务开发中，经常会遇到重复提交的情况，无论是由于网络问题无法收到请求结果而重新发起请求，或是前端的操作抖动而造成重复提交情况。
在交易系统，支付系统这种重复提交造成的问题有尤其明显，比如：

* **前端重复提交表单**： 在填写一些表格时候，用户填写完成提交，很多时候会因网络波动没有及时对用户做出提交成功响应，致使用户认为没有成功提交，然后一直点提交按钮，这时就会发生重复提交表单请求。
* **用户恶意进行刷单**： 例如在实现用户投票这种功能时，如果用户针对一个用户进行重复提交投票，这样会导致接口接收到用户重复提交的投票信息，这样会使投票结果与事实严重不符。
* **接口超时重复提交**：很多时候 HTTP 客户端工具都默认开启超时重试的机制，尤其是第三方调用接口时候，为了防止网络波动超时等造成的请求失败，都会添加重试机制，导致一个请求提交多次。
* **消息进行重复消费**： 当使用 MQ 消息中间件时候，如果发生消息中间件出现错误未及时提交消费信息，导致发生重复消费。

很显然，声明幂等的服务认为，外部调用者会存在多次调用的情况，为了防止外部多次调用对系统数据状态的发生多次改变，将服务设计成幂等。

### 2.1 保证幂等性的场景

以SQL为例，有下面三种场景，只有第三种场景需要开发人员使用其他策略保证幂等性：

1. SELECT col1 FROM tab1 WHER col2=2，无论执行多少次都不会改变状态，是天然的幂等。
2. UPDATE tab1 SET col1=1 WHERE col2=2，无论执行成功多少次状态都是一致的，因此也是幂等操作。
3. **UPDATE tab1 SET col1=col1+1 WHERE col2=2，每次执行的结果都会发生变化，这种不是幂等的。**

### 2.2 幂等与防止重复的区别

1. 重复提交的情况，和服务幂等的初衷是不同的。重复提交是在第一次请求已经成功的情况下，人为的进行多次操作，导致不满足幂等要求的服务多次改变状态。
2. 幂等更多使用的情况是**第一次请求不知道结果（比如超时）或者失败的异常情况下，发起多次请求**，目的是多次确认第一次请求成功，却不会因多次请求而出现多次的状态变化。

### 2.3 设计幂等性服务

幂等使得客户端逻辑处理很简单,但是服务端逻辑会很复杂。满足幂等性服务需要包含两点逻辑:
1. 首先去查询上一次的执行状态,如果没有则认为是第一次请求。
2. 在服务改变状态的业务逻辑前保证防重复提交的逻辑。

### 2.4 保证幂等策略

幂等需要通过唯一的业务单号来保证:相同的业务单号,认为是同一业务使用唯一的业务单号确保:后面多次相同业务单号的处理逻辑和执行效果是一致的
幂等实现示例-支付:先查询订单是否支付过如果已经支付过,返回支付成功如果没有支付,则进行支付流程,修改订单的状态为已支付

### 2.5 防重复提交策略

在保证幂等的策略中,执行是分两步执行的,后面一步依赖上面一步的查询结果,这样就无法保证原子性。
无法保证原子性在高并发的情况下会存在问题:第二次请求在第一次请求的下一步订单状态没有修改为"已支付状态"
时进行为了解决这个问题 :将查询和变更状态操作加锁,并将并行操作改为串行执行。

## 三、幂等性的解决方案

### 3.1 数据库唯一主键实现幂等性

数据库唯一主键的实现主要是利用数据库中主键唯一约束的特性，一般来说唯一主键比较适用于“插入”时的幂等性，其能保证一张表中只能存在一条带该唯一主键的记录。
使用数据库唯一主键完成幂等性时需要注意的是，该主键一般来说并不是使用数据库中自增主键，而是使用[分布式ID]()充当主键，这样才能能保证在分布式环境下ID的全局唯一性。

<img :src="$withBase('/interview/database-id.png')" alt="database-id">

适用操作
* 插入操作
* 删除操作

使用限制
* 需要生成全局唯一主键 ID；

主要流程如下：
* 客户端执行创建请求，调用服务端接口。
* 服务端执行业务逻辑，生成一个分布式 ID，将该 ID 充当待插入数据的主键，然后执数据插入操作，运行对应的 SQL 语句。
* 服务端将该条数据插入数据库中，如果插入成功则表示没有重复调用接口。如果抛出主键重复异常，则表示数据库中已经存在该条记录，返回错误信息到客户端。

### 3.2 数据库乐观锁实现幂等性

数据库乐观锁方案一般只能适用于执行更新操作的过程，我们可以提前在对应的数据表中多添加一个字段，充当当前数据的版本标识。
这样每次对该数据库该表的这条数据执行更新时，都会将该版本标识作为一个条件，值为上次待更新数据中的版本标识的值。

<img :src="$withBase('/interview/database-lock.png')" alt="database-lock">

适用操作
* 更新操作

使用限制
* 需要数据库对应业务表中添加额外字段

| id | name | price | 
|:--:|:----:|:-----:|
| 1  | 	小米	 | 1000	 |
| 2  | 苹果	  | 2000  |

为了每次执行更新时防止重复更新，确定更新的一定是要更新的内容，
我们通常都会添加一个 version 字段记录当前的记录版本， 这样在更新时候将该值带上，那么只要执行更新操作就能确定一定更新的是某个对应版本下的信息。

| id | name | price | version |
|:--:|:----:|:-----:|:-------:|
| 1  | 	小米	 | 1000	 |   10    |
| 2  | 苹果	  | 2000  |   21    |

这样每次执行更新时候，都要指定要更新的版本号，如下操作就能准确更新 version=5 的信息：

```sql
UPDATE my_table SET price=price+50,version=version+1 WHERE id=1 AND version=5
```

上面 WHERE 后面跟着条件 id=1 AND version=5 被执行后，id=1 的version被更新为6，所以如果重复执行该条SQL语句将不生效，
因为 id=1 AND version=5 的数据已经不存在，这样就能保住更新的幂等，多次更新对结果不会产生影响。

### 3.3 防重Token令牌实现幂等性

**针对客户端连续点击或者调用方的超时重试等情况**，例如提交订单，此种操作就可以用Token的机制实现防止重复提交。

简单的说就是调用方在调用接口的时候先向后端请求一个全局 ID（Token），请求的时候携带这个全局 ID 一起请求（Token 最好将其放到 Headers 中）， 
后端需要对这个 Token 作为 Key，用户信息作为 Value 到 Redis 中进行键值内容校验，如果 Key 存在且 Value 匹配就执行删除命令， 
然后正常执行后面的业务逻辑。如果不存在对应的 Key 或 Value 不匹配就返回重复执行的错误信息，这样来保证幂等操作。

适用操作
* 插入操作
* 更新操作
* 删除操作

使用限制
* 需要生成全局唯一 Token 串
* 需要使用第三方组件 Redis 进行数据效验

<img :src="$withBase('/interview/redis-token.png')" alt="redis-token">

1. 服务端提供获取 Token 的接口，该 Token 可以是一个序列号，也可以是一个分布式 ID 或者 UUID 串。
2. 客户端调用接口获取 Token，这时候服务端会生成一个 Token 串。
3. 然后将该串存入 Redis 数据库中，以该 Token 作为 Redis 的键（注意设置过期时间）。
4. 将 Token 返回到客户端，客户端拿到后应存到表单隐藏域中。
5. 客户端在执行提交表单时，把 Token 存入到 Headers 中，执行业务请求带上该 Headers。
6. 服务端接收到请求后从 Headers 中拿到 Token，然后根据 Token 到 Redis 中查找该 key 是否存在。
7. 服务端根据 Redis 中是否存该 key 进行判断，如果存在就将该 key 删除，然后正常执行业务逻辑。如果不存在就抛异常，返回重复提交的错误信息。 
注意，在并发情况下，执行 Redis 查找数据与删除需要保证原子性，否则很可能在并发下无法保证幂等性。其实现方法可以使用分布式锁或者使用Lua 表达式来注销查询与删除操作。


### 3.4 下游传递唯一序列号实现幂等性

所谓请求序列号，其实就是每次向服务端请求时候附带一个短时间内唯一不重复的序列号，该序列号可以是一个有序 ID，也可以是一个订单号，一般由下游生成，在调用上游服务端接口时附加该序列号和用于认证的ID。
当上游服务器收到请求信息后拿取该 序列号和下游认证ID进行组合，形成用于操作Redis的Key，然后到 Redis 中查询是否存在对应的 Key 的键值对，根据其结果：

* 如果存在，就说明已经对该下游的该序列号的请求进行了业务处理，这时可以直接响应重复请求的错误信息。
* 如果不存在，就以该 Key 作为 Redis 的键，以下游关键信息作为存储的值（例如下游商传递的一些业务逻辑信息），将该键值对存储到 Redis 中 ，然后再正常执行对应的业务逻辑即可。

适用操作

* 插入操作
* 更新操作
* 删除操作

使用限制

* 要求第三方传递唯一序列号；
* 需要使用第三方组件 Redis 进行数据效验；


<img :src="$withBase('/interview/id-only.png')" alt="id-only">

**总结：幂等性的设计主要是为了保证有且仅有一次执行成功,最终的思想都是使用锁来实现，可以使用数据库主键锁、数据库的乐观锁、分布式锁来实现请求的唯一执行。**

## 四、幂等性的方案实现场景

幂等性是开发当中很常见也很重要的一个需求，尤其是支付、订单等与金钱挂钩的服务，保证接口幂等性尤其重要。
在实际开发中，我们需要针对不同的业务场景我们需要灵活的选择幂等性的实现方式：

1. 对于下单等存在唯一主键的，可以使用“唯一主键方案”的方式实现。
2. 对于更新订单状态等相关的更新场景操作，使用“乐观锁方案”实现更为简单。
3. 对于上下游这种，下游请求上游，上游服务可以使用“下游传递唯一序列号方案”更为合理。
4. 类似于前端重复提交、重复下单、没有唯一ID号的场景，可以通过Token与Redis配合的“防重Token方案”实现更为快捷。
