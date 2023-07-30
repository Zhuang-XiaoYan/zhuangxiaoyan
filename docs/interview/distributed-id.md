---
lang: zh-CN
sidebarDepth: 2
---

# 分布式ID生成设计方案

## 一、分布式ID背景

在复杂分布式系统中，往往需要对大量的数据和消息进行唯一标识。如在美团点评的金融、支付、餐饮、酒店、猫眼电影等产品的系统中，数据日渐增长，
对数据分库分表后需要有一个唯一ID来标识一条数据或消息，数据库的自增ID显然不能满足需求；特别一点的如订单、骑手、优惠券也都需要有唯一ID做标识。
此时一个能够生成全局唯一ID的系统是非常必要的。因此需要设计具有一下特点额ID：

* 全局唯一性：不能出现重复的ID号，既然是唯一标识，这是最基本的要求。
* 趋势递增：在MySQL InnoDB引擎中使用的是聚集索引，由于多数RDBMS使用B-tree的数据结构来存储索引数据，在主键的选择上面我们应该尽量使用有序的主键保证写入性能。
* 单调递增：保证下一个ID一定大于上一个ID，例如事务版本号、IM增量消息、排序等特殊需求。
* 信息安全：如果ID是连续的，恶意用户的扒取工作就非常容易做了，直接按照顺序下载指定URL即可；如果是订单号就更危险了，竞对可以直接知道我们一天的单量。所以在一些应用场景下，会需要ID无规则、不规则。

上述1，2，3对应三类不同的场景，3，4需求还是互斥的，无法使用同一个方案满足。同时除了对ID号码自身的要求，业务还对ID号生成系统的可用性要求极高，
想象一下，如果ID生成系统瘫痪，整个美团点评支付、优惠券发券、骑手派单等关键动作都无法执行，这就会带来一场灾难。由此总结下一个ID生成系统应该做到如下几点：

* 平均延迟和TP999延迟都要尽可能低；
* 可用性5个9；
* 高QPS。

## 二、数据库自增ID

以MySQL举例，利用给字段设置**auto_increment_increment**和**auto_increment_offset**来保证ID自增，每次业务使用下列SQL读写MySQL得到ID号。

```sql
CREATE DATABASE `SEQ_ID`;
CREATE TABLE SEQID.SEQUENCE_ID (
id bigint(20) unsigned NOT NULL auto_increment,
value char(10) NOT NULL default '',
PRIMARY KEY (id),
) ENGINE=MyISAM;

insert into SEQUENCE_ID(value)  VALUES ('values');
```

<img :src="$withBase('/interview/distributed-id-001.png')" alt="001">

数据库自增ID的优点：
- 非常简单，利用现有数据库系统的功能实现，成本小，有DBA专业维护。
- ID号单调自增，可以实现一些对ID有特殊要求的业务。

数据库自增ID的缺点：
- 强依赖DB，当DB异常时整个系统不可用，属于致命问题。配置主从复制可以尽可能的增加可用性，但是数据一致性在特殊情况下难以保证。主从切换时的不一致可能导致重复发号。
- ID发号性能瓶颈限制在单台MySQL的读写性能。

## 三、数据库自增ID优化

对于MySQL性能问题，可用如下方案解决：在分布式系统中我们可以多部署几台机器，每台机器设置不同的初始值，且步长和机器数相等。
比如有两台机器。设置步长step为2，TicketServer1的初始值为1（1，3，5，7，9，11…）、TicketServer2的初始值为2（2，4，6，8，10…）。
这是Flickr团队在2010年撰文介绍的一种主键生成策略。如下所示，为了实现上述方案分别设置两台机器对应的参数，TicketServer1从1开始发号，
TicketServer2从2开始发号，两台机器每次发号之后都递增2。

```sql
TicketServer1:
auto-increment-increment = 2
auto-increment-offset = 1

TicketServer2:
auto-increment-increment = 2
auto-increment-offset = 2
```

假设我们要部署N台机器，步长需设置为N，每台的初始值依次为0,1,2…N-1那么整个架构就变成了如下图所示：

<img :src="$withBase('/interview/distributed-id-002.png')" alt="002">

* 系统水平扩展比较困难，比如定义好了步长和机器台数之后，如果要添加机器该怎么做？假设现在只有一台机器发号是1,2,3,4,5（步长是1），
这个时候需要扩容机器一台。可以这样做：把第二台机器的初始值设置得比第一台超过很多，比如14（假设在扩容时间之内第一台不可能发到14），
同时设置步长为2，那么这台机器下发的号码都是14以后的偶数。然后摘掉第一台，把ID值保留为奇数，比如7，然后修改第一台的步长为2。
让它符合我们定义的号段标准，对于这个例子来说就是让第一台以后只能产生奇数。扩容方案看起来复杂吗？貌似还好，
现在想象一下如果我们线上有100台机器，这个时候要扩容该怎么做？简直是噩梦。所以系统水平扩展方案复杂难以实现。

* ID没有了单调递增的特性，只能趋势递增，这个缺点对于一般业务需求不是很重要，可以容忍。

* 据库压力还是很大，每次获取ID都得读写一次数据库，只能靠堆机器来提高性能。

## 四、UUID算法ID生成

UUID算法的定义：标准型式包含32个16进制数字，以连字号分为五段，形式为8-4-4-4-12的36个字符，
通常使用UUID的格式为：时间戳（当前日期+时间)+时钟序列+机器识别号(MAC、其它)。到目前为止业界一共有5种方式生成UUID算法：

1. 时间：（注意有非时钟回拨的问题）
2. DCE算法
3. MD5算法
4. 随机数算法
5. SHA1算法

UUID算法优点：
- 性能非常高：本地生成，没有网络消耗。

UUID算法缺点：
- 不易于存储：UUID太长，16字节128位，通常以36长度的字符串表示，很多场景不适用。
- 信息不安全：基于MAC地址生成UUID的算法可能会造成MAC地址泄露，这个漏洞曾被用于寻找梅丽莎病毒的制作者位置。

ID作为主键时在特定的环境会存在一些问题，比如做DB主键的场景下，UUID就非常不适用：MySQL官方有明确的建议主键要尽量越短越好，
36个字符长度的UUID不符合要求。对MySQL索引不利:如果作为数据库主键，在InnoDB引擎下，UUID的无序性可能会引起数据位置频繁变动，严重影响性能。

## 五、Snowflake雪花算法ID生成

这种方案大致来说是一种以划分命名空间（UUID也算，由于比较常见，所以单独分析）来生成ID的一种算法，
Mongdb objectID算作是和snowflake类似方法，通过“时间+机器码+pid+inc”共12个字节，通过4+3+2+3的方式最终标识成一个24长度的十六进制字符。
这种方案把64-bit分别划分成多段，分开来标示机器、时间等，比如在snowflake中的64-bit分别表示如下图所示：

<img :src="$withBase('/interview/distributed-id-003.png')" alt="003">

* 41-bit的时间可以表示（1L<<41）/(1000L*3600*24*365)=69年的时间，
* 10-bit机器可以分别表示1024台机器。如果我们对IDC划分有需求，还可以将10-bit分5-bit给IDC，分5-bit给工作机器。这样就可以表示32个IDC，每个IDC下可以有32台机器，可以根据自身需求定义。
* 12个自增序列号可以表示2^12个ID，理论上snowflake方案的QPS约为409.6w/s，这种分配方式可以保证在任何一个IDC的任何一台机器在任意毫秒内生成的ID都是不同的。

Snowflake优点：
- 毫秒数在高位，自增序列在低位，整个ID都是趋势递增的。
- 不依赖数据库等第三方系统，以服务的方式部署，稳定性更高，生成ID的性能也是非常高的。
- 可以根据自身业务特性分配bit位，非常灵活。

Snowflake缺点：
- 强依赖机器时钟，如果机器上时钟回拨，会导致发号重复或者服务会处于不可用状态。

```java
/**
 * twitter的snowflake算法 -- java实现
 * 
 * @author xjl
 * @date 2020/12/18
 */
public class SnowFlake {
 
    /**
     * 起始的时间戳 这个是一定要需要设置的
     */
    private final static long START_STMP = 1480166465631L;
 
    /**
     * 每一部分占用的位数
     */
    private final static long SEQUENCE_BIT = 12; //序列号占用的位数
    private final static long MACHINE_BIT = 5;   //机器标识占用的位数
    private final static long DATACENTER_BIT = 5;//数据中心占用的位数
 
    /**
     * 每一部分的最大值
     */
    private final static long MAX_DATACENTER_NUM = -1L ^ (-1L << DATACENTER_BIT);//31
    private final static long MAX_MACHINE_NUM = -1L ^ (-1L << MACHINE_BIT);//31
    private final static long MAX_SEQUENCE = -1L ^ (-1L << SEQUENCE_BIT);//4095
 
    /**
     * 每一部分向左的位移
     */
    private final static long MACHINE_LEFT = SEQUENCE_BIT;
    private final static long DATACENTER_LEFT = SEQUENCE_BIT + MACHINE_BIT;
    private final static long TIMESTMP_LEFT = DATACENTER_LEFT + DATACENTER_BIT;
 
    private long datacenterId;  //数据中心
    private long machineId;     //机器标识
    private long sequence = 0L; //序列号
    private long lastStmp = -1L;//上一次时间戳
 
    public SnowFlake(long datacenterId, long machineId) {
        if (datacenterId > MAX_DATACENTER_NUM || datacenterId < 0) {
            throw new IllegalArgumentException("datacenterId can't be greater than MAX_DATACENTER_NUM or less than 0");
        }
        if (machineId > MAX_MACHINE_NUM || machineId < 0) {
            throw new IllegalArgumentException("machineId can't be greater than MAX_MACHINE_NUM or less than 0");
        }
        this.datacenterId = datacenterId;
        this.machineId = machineId;
    }
 
    /**
     * 产生下一个ID
     *
     * @return
     */
    public synchronized long nextId() {
        //利用的时间的不同来保证唯一性
        long currStmp = getNewstmp();
        if (currStmp < lastStmp) {
            throw new RuntimeException("Clock moved backwards.  Refusing to generate id");
        }
 
        if (currStmp == lastStmp) {
            //相同毫秒内，序列号自增
            sequence = (sequence + 1) & MAX_SEQUENCE;
            //同一毫秒的序列数已经达到最大
            if (sequence == 0L) {
                currStmp = getNextMill();
            }
        } else {
            //不同毫秒内，序列号置为0
            sequence = 0L;
        }
 
        lastStmp = currStmp;
 
        return (currStmp - START_STMP) << TIMESTMP_LEFT //时间戳部分
                | datacenterId << DATACENTER_LEFT       //数据中心部分
                | machineId << MACHINE_LEFT             //机器标识部分
                | sequence;                             //序列号部分
    }
 
    private long getNextMill() {
        long mill = getNewstmp();
        while (mill <= lastStmp) {
            mill = getNewstmp();
        }
        return mill;
    }
 
    private long getNewstmp() {
        return System.currentTimeMillis();
    }
 
    public static void main(String[] args) {
        SnowFlake snowFlake = new SnowFlake(2, 3);
 
        for (int i = 0; i < (1 << 12); i++) {
            System.out.println(snowFlake.nextId());
        }
 
    }
}
```

### 5.1 生成超过的最大(4096个)？

Snowflake一毫秒的能够产生的最大的个数是4096个。如果是的超过的4096那就等到下一秒的来生成的。Snowflake算法1s生成的ID是300W+的ID。

### 5.2 时钟回拨问题的解决方案

**防止时钟回拨**
因为机器的原因会发生时间回拨，我们的雪花算法是强依赖我们的时间的，如果时间发生回拨，有可能会生成重复的ID，在我们上面的nextId中我们用当前时间和上一次的时间进行判断，
如果当前时间小于上一次的时间那么肯定是发生了回拨，普通的算法会直接抛出异常,这里我们可以对其进行优化,一般分为两个情况:
1. 如果时间回拨时间较短，比如配置5ms以内，那么可以直接等待一定的时间，让机器的时间追上来。
2. 如果时间的回拨时间较长，我们不能接受这么长的阻塞等待，那么又有两个策略:
   1. 直接拒绝，抛出异常，打日志，通知RD时钟回滚。
   2. 利用扩展位，上面我们讨论过不同业务场景位数可能用不到那么多，那么我们可以把扩展位数利用起来了， 比如当这个时间回拨比较长的时候，我们可以不需要等待，直接在扩展位加1。
   3. 位的扩展位允许我们有3次大的时钟回拨，一般来说就够了，如果其超过三次我们还是选择抛出异常，打日志。

```java
package com.zhaungxiaoyan.distributedid.Snowflake;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.LockSupport;
 
/**
 * 分布式全局ID雪花算法解决方案
 * 防止时钟回拨
 * 因为机器的原因会发生时间回拨，我们的雪花算法是强依赖我们的时间的，如果时间发生回拨，有可能会生成重复的ID，在我们上面的nextId中我们用当前时间和上一次的时间进行判断，
 * 如果当前时间小于上一次的时间那么肯定是发生了回拨，普通的算法会直接抛出异常,这里我们可以对其进行优化,一般分为两个情况:
 * 1如果时间回拨时间较短，比如配置5ms以内，那么可以直接等待一定的时间，让机器的时间追上来。
 * 2如果时间的回拨时间较长，我们不能接受这么长的阻塞等待，那么又有两个策略:
 * 1直接拒绝，抛出异常，打日志，通知RD时钟回滚。
 * 2利用扩展位，上面我们讨论过不同业务场景位数可能用不到那么多，那么我们可以把扩展位数利用起来了，
 * 比如当这个时间回拨比较长的时候，我们可以不需要等待，直接在扩展位加1。
 * 2位的扩展位允许我们有3次大的时钟回拨，一般来说就够了，如果其超过三次我们还是选择抛出异常，打日志。
 * 通过上面的几种策略可以比较的防护我们的时钟回拨，防止出现回拨之后大量的异常出现。下面是修改之后的代码，这里修改了时钟回拨的逻辑:
 */
public class SnowflakeUtilUpdate {
    private static final Logger log = LoggerFactory.getLogger(SnowflakeUtilUpdate.class);
    /**
     * EPOCH是服务器第一次上线时间点, 设置后不允许修改
     * 2018/9/29日，从此时开始计算，可以用到2089年
     */
    private static long EPOCH = 1538211907857L;
 
    /**
     * 每台workerId服务器有3个备份workerId, 备份workerId数量越多, 可靠性越高, 但是可部署的sequence ID服务越少
     */
    private static final long BACKUP_COUNT = 3;
 
    /**
     * worker id 的bit数，最多支持8192个节点
     */
    private static final long workerIdBits = 5L;
    /**
     * 数据中心标识位数
     */
    private static final long dataCenterIdBits = 5L;
    /**
     * 序列号，支持单节点最高每毫秒的最大ID数4096
     * 毫秒内自增位
     */
    private static final long sequenceBits = 12L;
 
    /**
     * 机器ID偏左移12位
     */
    private static final long workerIdShift = sequenceBits;
 
    /**
     * 数据中心ID左移17位(12+5)
     */
    private static final long dataCenterIdShift = sequenceBits + workerIdBits;
 
    /**
     * 时间毫秒左移22位(5+5+12)
     */
    private static final long timestampLeftShift = sequenceBits + workerIdBits + dataCenterIdBits;
    /**
     * sequence掩码，确保sequnce不会超出上限
     * 最大的序列号，4096
     * -1 的补码（二进制全1）右移12位, 然后取反
     * 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
     */
    private static final long sequenceMask = -1L ^ (-1L << sequenceBits);
 
    //private final static long sequenceMask = ~(-1L << sequenceBits);
    /**
     * 实际的最大workerId的值 结果是31，8091
     * workerId原则上上限为1024, 但是需要为每台sequence服务预留BACKUP_AMOUNT个workerId,
     * (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
     */
    //private static final long maxWorkerId = (1L << workerIdBits) / (BACKUP_COUNT + 1);
 
    //原来代码 -1 的补码（二进制全1）右移13位, 然后取反
    private static final long maxWorkerId = -1L ^ (-1L << workerIdBits);
    //private final static long maxWorkerId = ~(-1L << workerIdBits);
 
    /**
     * 支持的最大数据标识id，结果是31
     */
    private static final long maxDataCenterId = -1L ^ (-1L << dataCenterIdBits);
    /**
     * long workerIdBits = 5L;
     * -1L 的二进制: 1111111111111111111111111111111111111111111111111111111111111111
     * -1L<<workerIdBits = -32 ,二进制: 1111111111111111111111111111111111111111111111111111111111100000
     * workerMask= -1L ^ -32 = 31, 二进制: 11111
     */
    private static long workerMask = -1L ^ (-1L << workerIdBits);
    //进程编码
    private long processId = 1L;
    private static long processMask = -1L ^ (-1L << dataCenterIdBits);
 
    /**
     * 工作机器ID(0~31)
     * snowflake算法给workerId预留了10位，即workId的取值范围为[0, 1023]，
     * 事实上实际生产环境不大可能需要部署1024个分布式ID服务，
     * 所以：将workerId取值范围缩小为[0, 511]，[512, 1023]
     * 这个范围的workerId当做备用workerId。workId为0的备用workerId是512，
     * workId为1的备用workerId是513，以此类推
     */
    private static long workerId;
 
    /**
     * 数据中心ID(0~31)
     */
    private long dataCenterId;
 
    /**
     * 当前毫秒生成的序列
     */
    private long sequence = 0L;
 
    /**
     * 上次生成ID的时间戳
     */
    private long lastTimestamp = -1L;
 
    private long extension = 0L;
    private long maxExtension = 0L;
 
    /**
     * 保留workerId和lastTimestamp, 以及备用workerId和其对应的lastTimestamp
     */
    private static Map<Long, Long> workerIdLastTimeMap = new ConcurrentHashMap<>();
 
    /**
     * 最大容忍时间, 单位毫秒, 即如果时钟只是回拨了该变量指定的时间, 那么等待相应的时间即可;
     * 考虑到sequence服务的高性能, 这个值不易过大
     */
    private static final long MAX_BACKWARD_MS = 3;
    private static SnowflakeUtilUpdate idWorker;
 
    static {
        idWorker = new SnowflakeUtilUpdate();
    }
 
    static {
        Calendar calendar = Calendar.getInstance();
        calendar.set(2018, Calendar.NOVEMBER, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        // EPOCH是服务器第一次上线时间点, 设置后不允许修改
        EPOCH = calendar.getTimeInMillis();
    }
 
    //成员类，IdGenUtils的实例对象的保存域
    private static class SnowflakeIdGenHolder {
        private static final SnowflakeUtilUpdate instance = new SnowflakeUtilUpdate();
    }
 
    //外部调用获取IdGenUtils的实例对象，确保不可变
    public static SnowflakeUtilUpdate getInstance() {
        return SnowflakeIdGenHolder.instance;
    }
 
    /**
     * 静态工具类
     *
     * @return
     */
    public static Long generateId() {
        long id = idWorker.nextId();
        return id;
    }
 
    //初始化构造，无参构造有参函数，默认节点都是0
    public SnowflakeUtilUpdate() {
        //this(0L, 0L);
        this.dataCenterId = getDataCenterId(maxDataCenterId);
        //获取机器编码
        this.workerId = getWorkerId(dataCenterId, maxWorkerId);
    }
 
    /**
     * 构造函数
     *
     * @param workerId     工作ID (0~31)
     * @param dataCenterId 数据中心ID (0~31)
     */
    public SnowflakeUtilUpdate(long workerId, long dataCenterId) {
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        if (dataCenterId > maxDataCenterId || dataCenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", maxDataCenterId));
        }
        this.workerId = workerId;
        this.dataCenterId = dataCenterId;
    }
 
    /**
     * 获取带自定义前缀的全局唯一编码
     */
    public String getStrCodingByPrefix(String prefix) {
        Long ele = this.nextId();
        return prefix + ele.toString();
    }
 
    /**
     * 获得下一个ID (该方法是线程安全的)
     * 在单节点上获得下一个ID，使用Synchronized控制并发，而非CAS的方式，
     * 是因为CAS不适合并发量非常高的场景。
     * <p>
     * 考虑时钟回拨
     * 缺陷: 如果连续两次时钟回拨, 可能还是会有问题, 但是这种概率极低极低
     *
     * @return
     */
    public synchronized long nextId() {
        long currentTimestamp = timeGen();
        // 当发生时钟回拨时
        if (currentTimestamp < lastTimestamp) {
            // 如果时钟回拨在可接受范围内, 等待即可
            long offset = lastTimestamp - currentTimestamp;
            if (offset <= MAX_BACKWARD_MS) {
                try {
                    //睡（lastTimestamp - currentTimestamp）ms让其追上
                    LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(offset));
                    //时间偏差大小小于5ms，则等待两倍时间
                    //wait(offset << 1);
                    //Thread.sleep(waitTimestamp);
                    currentTimestamp = timeGen();
                    //如果时间还小于当前时间，那么利用扩展字段加1
                    //或者是采用抛异常并上报
                    if (currentTimestamp < lastTimestamp) {
                        //扩展字段
                        //extension += 1;
                        //if (extension > maxExtension) {
                        //服务器时钟被调整了,ID生成器停止服务.
                        throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - currentTimestamp));
                        //}
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                //扩展字段
                /*extension += 1;
                if (extension > maxExtension) {
                    //服务器时钟被调整了,ID生成器停止服务.
                    throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - currentTimestamp));
                }*/
                tryGenerateKeyOnBackup(currentTimestamp);
            }
        }
        //对时钟回拨简单处理
       /* if (currentTimestamp < lastTimestamp) {
            //服务器时钟被调整了,ID生成器停止服务.
            throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - currentTimestamp));
        }*/
 
        // 如果和最后一次请求处于同一毫秒, 那么sequence+1
        if (lastTimestamp == currentTimestamp) {
            // 如果当前生成id的时间还是上次的时间，那么对sequence序列号进行+1
            sequence = (sequence + 1) & sequenceMask;
            if (sequence == 0) {
                //自旋等待到下一毫秒
                currentTimestamp = waitUntilNextTime(lastTimestamp);
            }
            //判断是否溢出,也就是每毫秒内超过4095，当为4096时，与sequenceMask相与，sequence就等于0
            /*if (sequence == sequenceMask) {
                // 当前毫秒生成的序列数已经大于最大值，那么阻塞到下一个毫秒再获取新的时间戳
                currentTimestamp = this.waitUntilNextTime(lastTimestamp);
            }*/
 
        } else {
            // 如果是一个更近的时间戳, 那么sequence归零
            sequence = 0L;
        }
        // 更新上次生成id的时间戳
        lastTimestamp = currentTimestamp;
 
        // 更新map中保存的workerId对应的lastTimestamp
        //workerIdLastTimeMap.put(this.workerId, lastTimestamp);
 
        //  if (log.isDebugEnabled()) {
        //      log.debug("{}-{}-{}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date(lastTimestamp)), workerId, sequence);
        //  }
 
        // 进行移位操作生成int64的唯一ID
        //时间戳右移动23位
        long timestamp = (currentTimestamp - EPOCH) << timestampLeftShift;
 
        //workerId 右移动10位
        long workerId = this.workerId << workerIdShift;
 
        //dataCenterId 右移动(sequenceBits + workerIdBits = 17位)
        long dataCenterId = this.dataCenterId << dataCenterIdShift;
        return timestamp | dataCenterId | workerId | sequence;
    }
 
    /**
     * 尝试在workerId的备份workerId上生成
     * 核心优化代码在方法tryGenerateKeyOnBackup()中，BACKUP_COUNT即备份workerId数越多，
     * sequence服务避免时钟回拨影响的能力越强，但是可部署的sequence服务越少，
     * 设置BACKUP_COUNT为3，最多可以部署1024/(3+1)即256个sequence服务，完全够用，
     * 抗时钟回拨影响的能力也得到非常大的保障。
     *
     * @param currentMillis 当前时间
     */
    private long tryGenerateKeyOnBackup(long currentMillis) {
        // 遍历所有workerId(包括备用workerId, 查看哪些workerId可用)
        for (Map.Entry<Long, Long> entry : workerIdLastTimeMap.entrySet()) {
            this.workerId = entry.getKey();
            // 取得备用workerId的lastTime
            Long tempLastTime = entry.getValue();
            lastTimestamp = tempLastTime == null ? 0L : tempLastTime;
 
            // 如果找到了合适的workerId
            if (lastTimestamp <= currentMillis) {
                return lastTimestamp;
            }
        }
 
        // 如果所有workerId以及备用workerId都处于时钟回拨, 那么抛出异常
        throw new IllegalStateException("Clock is moving backwards, current time is "
                + currentMillis + " milliseconds, workerId map = " + workerIdLastTimeMap);
    }
 
    /**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * @param lastTimestamp 上次生成ID的时间截
     * @return 当前时间戳
     */
    protected long waitUntilNextTime(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }
 
    protected long timeGen() {
        return System.currentTimeMillis();
    }
 
    /**
     * 获取WorkerId
     *
     * @param dataCenterId
     * @param maxWorkerId
     * @return
     */
    protected static long getWorkerId(long dataCenterId, long maxWorkerId) {
        StringBuffer mpid = new StringBuffer();
        mpid.append(dataCenterId);
        String name = ManagementFactory.getRuntimeMXBean().getName();
        if (!name.isEmpty()) {
            // GET jvmPid
            mpid.append(name.split("@")[0]);
        }
        // MAC + PID 的 hashcode 获取16个低位
        return (mpid.toString().hashCode() & 0xffff) % (maxWorkerId + 1);
    }
 
    /**
     * 获取机器编码 用来做数据ID
     * 数据标识id部分 通常不建议采用下面的MAC地址方式，
     * 因为用户通过破解很容易拿到MAC进行破坏
     */
    protected static long getDataCenterId(long tempMaxDataCenterId) {
        if (tempMaxDataCenterId < 0L || tempMaxDataCenterId > maxDataCenterId) {
            tempMaxDataCenterId = maxDataCenterId;
        }
        long id = 0L;
        try {
            InetAddress ip = InetAddress.getLocalHost();
            NetworkInterface network = NetworkInterface.getByInetAddress(ip);
            if (network == null) {
                id = 1L;
            } else {
                byte[] mac = network.getHardwareAddress();
                id = ((0x000000FF & (long) mac[mac.length - 1])
                        | (0x0000FF00 & (((long) mac[mac.length - 2]) << 8))) >> 6;
                id = id % (tempMaxDataCenterId + 1);
            }
        } catch (Exception e) {
            System.out.println(" getDatacenterId: " + e.getMessage());
        }
        return id;
    }
}
```

## 六、Leaf-segment算法ID生成

### 6.1 数据库ID的优化方案

- 原方案每次获取ID都得读写一次数据库，造成数据库压力大。改为利用proxy server批量获取，
每次获取一个segment(step决定大小)号段的值。用完之后再去数据库获取新的号段，可以大大的减轻数据库的压力。

- 各个业务不同的发号需求用biz_tag字段来区分，每个biz-tag的ID获取相互隔离，
互不影响。如果以后有性能需求需要对数据库扩容，不需要上述描述的复杂的扩容操作，只需要对biz_tag分库分表就行。

```sql
+-------------+--------------+------+-----+-------------------+-----------------------------+
| Field       | Type         | Null | Key | Default           | Extra                       |
+-------------+--------------+------+-----+-------------------+-----------------------------+
| biz_tag     | varchar(128) | NO   | PRI |                   |                             |
| max_id      | bigint(20)   | NO   |     | 1                 |                             |
| step        | int(11)      | NO   |     | NULL              |                             |
| desc        | varchar(256) | YES  |     | NULL              |                             |
| update_time | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------+
```

重要字段说明：
- biz_tag用来区分业务，
- max_id表示该biz_tag目前所被分配的ID号段的最大值，
- step表示每次分配的号段长度。原来获取ID每次都需要写数据库，现在只需要把step设置得足够大，比如1000。
那么只有当1000个号被消耗完了之后才会去重新读写一次数据库。读写数据库的频率从1减小到了1/step。

<img :src="$withBase('/interview/Leaf-segment.png')" alt="segment">

test_tag在第一台Leaf机器上是1~1000的号段，当这个号段用完时，会去加载另一个长度为step=1000的号段，假设另外两台号段都没有更新，
这个时候第一台机器新加载的号段就应该是3001~4000。同时数据库对应的biz_tag这条数据的max_id会从3000被更新成4000，更新号段的SQL语句如下：

```sql
Begin
UPDATE table SET max_id=max_id+step WHERE biz_tag=xxx
SELECT tag, max_id, step FROM table WHERE biz_tag=xxx
Commit
```
Leaf-segment算法优点：
- Leaf服务可以很方便的线性扩展，性能完全能够支撑大多数业务场景。
- ID号码是趋势递增的8byte的64位数字，满足上述数据库存储的主键要求。
- 容灾性高：Leaf服务内部有号段缓存，即使DB宕机，短时间内Leaf仍能正常对外提供服务。
- 可以自定义max_id的大小，非常方便业务从原有的ID方式上迁移过来。

Leaf-segment算法缺点：
- ID号码不够随机，能够泄露发号数量的信息，不太安全。
- TP999数据波动大，当号段使用完之后还是会hang在更新数据库的I/O上，tg999数据会出现偶尔的尖刺。
- DB宕机会造成整个系统不可用。

### 6.2 双buffer优化方案

对于第二个缺点，Leaf-segment做了一些优化，简单的说就是：Leaf取号段的时机是在号段消耗完的时候进行的，
也就意味着号段临界点的ID下发时间取决于下一次从DB取回号段的时间，并且在这期间进来的请求也会因为DB号段没有取回来，
导致线程阻塞。如果请求DB的网络和DB的性能稳定，这种情况对系统的影响是不大的，但是假如取DB的时候网络发生抖动，
或者DB发生慢查询就会导致整个系统的响应时间变慢。

为此，我们希望DB取号段的过程能够做到无阻塞，不需要在DB取号段的时候阻塞请求线程，即当号段消费到某个点时就异步的把下一个号段加载到内存中。
而不需要等到号段用尽的时候才去更新号段。这样做就可以很大程度上的降低系统的TP999指标。详细实现如下图所示：

<img :src="$withBase('/interview/leaf-buufer.png')" alt="buufer">

采用双buffer的方式，Leaf服务内部有两个号段缓存区segment。当前号段已下发10%时，如果下一个号段未更新，
则另启一个更新线程去更新下一个号段。当前号段全部下发完后，如果下个号段准备好了则切换到下个号段为当前segment接着下发，循环往复。

- 每个biz-tag都有消费速度监控，通常推荐segment长度设置为服务高峰期发号QPS的600倍（10分钟），这样即使DB宕机，Leaf仍能持续发号10-20分钟不受影响。
- 每次请求来临时都会判断下个号段的状态，从而更新此号段，所以偶尔的网络抖动不会影响下个号段的更新。

### 6.3 高可用容灾方案

对于第三点“DB可用性”问题，我们目前采用一主两从的方式，同时分机房部署，Master和Slave之间采用半同步方式同步数据。
同时使用公司Atlas数据库中间件(已开源，改名为DBProxy)做主从切换。当然这种方案在一些情况会退化成异步模式，
甚至在非常极端情况下仍然会造成数据不一致的情况，但是出现的概率非常小。如果你的系统要保证100%的数据强一致，
可以选择使用“类Paxos算法”实现的强一致MySQL方案。

<img :src="$withBase('/interview/leaf-paxos.png')" alt="paxos">

同时Leaf服务分IDC部署，内部的服务化框架是“MTthrift RPC”。服务调用的时候，根据负载均衡算法会优先调用同机房的Leaf服务。
在该IDC内Leaf服务不可用的时候才会选择其他机房的Leaf服务。同时服务治理平台OCTO还提供了针对服务的过载保护、一键截流、动态流量分配等对服务的保护措施。

### 6.4 Leaf-snowflake方案

Leaf-segment方案可以生成趋势递增的ID，同时ID号是可计算的，不适用于订单ID生成场景，比如竞对在两天中午12点分别下单，
通过订单id号相减就能大致计算出公司一天的订单量，这个是不能忍受的。面对这一问题，我们可以采用Leaf-snowflake方案。
Leaf-snowflake方案完全沿用snowflake方案的bit位设计，即是“1+41+10+12”的方式组装ID号。对于workerID的分配，
当服务集群数量较小的情况下，完全可以手动配置。Leaf服务规模较大，动手配置成本太高。所以使用Zookeeper持久顺序节点的特性自动对snowflake节点配置wokerID。
Leaf-snowflake是按照下面几个步骤启动的：

<img :src="$withBase('/interview/Leaf-segment.png')" alt="Leaf-segment">


弱依赖ZooKeeper：除了每次会去ZK拿数据以外，也会在本机文件系统上缓存一个workerID文件。当ZooKeeper出现问题，
恰好机器出现问题需要重启时，能保证服务能够正常启动。这样做到了对三方组件的弱依赖。一定程度上提高了SLA。

解决时钟问题：因为这种方案依赖时间，如果机器的时钟发生了回拨，那么就会有可能生成重复的ID号，需要解决时钟回退的问题。

<img :src="$withBase('/interview/leaf-zookeeper.png')" alt="Leaf-zookeeper">

参见上图整个启动流程图，服务启动时首先检查自己是否写过ZooKeeper leaf_forever节点：

* 若写过，则用自身系统时间与leaf_forever/${self}节点记录时间做比较，若小于leaf_forever/${self}时间则认为机器时间发生了大步长回拨，服务启动失败并报警。
* 若未写过，证明是新服务节点，直接创建持久节点leaf_forever/${self}并写入自身系统时间，接下来综合对比其余Leaf节点的系统时间来判断自身系统时间是否准确，具体做法是取leaf_temporary下的所有临时节点(所有运行中的Leaf-snowflake节点)的服务IP：Port，然后通过RPC请求得到所有节点的系统时间，计算sum(time)/nodeSize。
* 若abs( 系统时间-sum(time)/nodeSize ) < 阈值，认为当前系统时间准确，正常启动服务，同时写临时节点leaf_temporary/${self} 维持租约。
* 否则认为本机系统时间发生大步长偏移，启动失败并报警。
* 每隔一段时间(3s)上报自身系统时间写入leaf_forever/${self}。

由于强依赖时钟，对时间的要求比较敏感，在机器工作时NTP同步也会造成秒级别的回退，建议可以直接关闭NTP同步。
要么在时钟回拨的时候直接不提供服务直接返回ERROR_CODE，等时钟追上即可。或者做一层重试，然后上报报警系统，
更或者是发现有时钟回拨之后自动摘除本身节点并报警，在美团在2017年闰秒出现那一次出现过部分机器回拨，
由于Leaf-snowflake的策略保证，成功避免了对业务造成的影响。

```java
//发生了回拨，此刻时间小于上次发号时间
 if (timestamp < lastTimestamp) {
   long offset = lastTimestamp - timestamp;
   if (offset <= 5) {
       try {
           //时间偏差大小小于5ms，则等待两倍时间
           wait(offset << 1);//wait
           timestamp = timeGen();
           if (timestamp < lastTimestamp) {
              //还是小于，抛异常并上报
               throwClockBackwardsEx(timestamp);
             }    
       } catch (InterruptedException e) {  
          throw  e;
       }
   } else {
       //throw
       throwClockBackwardsEx(timestamp);
   }
}  
```

## 七、Redis生产策略ID

**Redis的ID生成策略原理**
- 利用Redis的单线程执行的原理，使用的原子类保证了全局唯一的递增变量。
- 利用了redis的高并发性能的原理来实现的

Redis生产策略ID优点:
- 不依赖于数据库，灵活方便，且性能优于数据库。
- 数字ID天然排序，对分页或者需要排序的结果很有帮助。

Redis生产策略ID缺点:
- 如果系统中没有Redis，还需要引入新的组件，增加系统复杂度。
- 需要编码和配置的工作量比较大

