(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{696:function(v,t,_){"use strict";_.r(t);var a=_(25),r=Object(a.a)({},(function(){var v=this,t=v.$createElement,_=v._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"二、cloud-platform技术栈"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、cloud-platform技术栈"}},[v._v("#")]),v._v(" 二、Cloud-Platform技术栈")]),v._v(" "),_("p",[v._v("随着云计算技术的发展及其应用的普及和深入，云平台资源的高效利用成为越来越重要的问题，而服务器虚拟化技术是云计算实现资源有效利用的关键技术。\n云计算的云端系统， 其实质上就是一个大型的分布式系统。 虚拟化通过在一个物理平台上虚拟出更多的虚拟平台，\n而其中的每一个虚拟平台则可以作为独立的终端加入云端的分布式系统。 比起直接使用物理平台， 虚拟化在资源的有效利用、 动态调配和高可靠性方面有着巨大的优势。")]),v._v(" "),_("h2",{attrs:{id:"虚拟机技术原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机技术原理"}},[v._v("#")]),v._v(" 虚拟机技术原理")]),v._v(" "),_("p",[v._v("虚拟化是创建软件或虚拟表示形式的应用、服务器、存储和网络，以减少IT开销，同时提高效率和敏捷性。\n虚拟化是一个广义上的术语，在计算机方面通常是讲"),_("strong",[v._v("计算机元件（硬件、软件、操作）系统等运行在虚拟的基础设备上，而不是真实的设备上")]),v._v('。\n虚拟化技术作为云计算的基础，属于云计算技术的基础架构即服务层，其提供"资源的整合"和“重新逻辑”(例如，将用户发送请求，\n管理员得到请求后把用户需要的计算机资源梳理成可以马上投入使用的“计算机”，再将其提供给用户）按需分配，使得资源充分利用。')]),v._v(" "),_("h3",{attrs:{id:"为什么要进行虚拟化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#为什么要进行虚拟化"}},[v._v("#")]),v._v(" 为什么要进行虚拟化？")]),v._v(" "),_("p",[v._v("从个人角度来说 ：在以前，大多数的个人用户使用计算机的行为主要是上网，聊天，看视频，处理文档，很少有人使用视频处理、图像处理等耗费CPU或CPU资源的应用。\n（也许有人会说，谁说的，现在很多人玩电脑游戏，而且Computer game一样耗费大量CPU！ 我们知道，电脑的速度越来越快了，\n所以我们现在上网，聊天，处理文档的时候，我们浪费的资源也远比以前多了。）这样就导致大部分的时候CPU的使用率低于30%甚至只有10%。")]),v._v(" "),_("p",[v._v("从企业角度来说：目前，很多企业使用的的物理服务器一般运行单个操作系统或单个应用程序，随着服务器性能的大幅度提升，服务器的使用效率越来越低。\n根据调查，大部分企业服务器只是简单的做Web服务器、数据库服务器、或FTP服务器，这些服务器的CPU使用率长期低于20%，内存使用率不足30%，硬盘使用率低于10%。")]),v._v(" "),_("p",[v._v("综合上面的情况，计算机资源使用率低是整个IT行业正面临的一个问题，在这个基础上就出现了虚拟机和虚拟化技术。")]),v._v(" "),_("h3",{attrs:{id:"虚拟化的优势"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟化的优势"}},[v._v("#")]),v._v(" 虚拟化的优势")]),v._v(" "),_("ol",[_("li",[v._v("虚拟化是一个过程，它打破了物理硬件与操作系统及在其上运行的应用程序之间的硬性连接。")]),v._v(" "),_("li",[v._v("虚拟化应用方面很广，可以应用到计算机、操作系统、存储设备、应用或网络")]),v._v(" "),_("li",[v._v("虚拟化平台下，整合服务器的资源，使得资源的利用率大幅度提升，同时虚拟化平台本身提供了故障恢复、业务部署、迁移、转换、更新、维护等方面的便利，降低了IT费用并提高了使用效率和灵活性。")])]),v._v(" "),_("h3",{attrs:{id:"虚拟化的工作原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟化的工作原理"}},[v._v("#")]),v._v(" 虚拟化的工作原理")]),v._v(" "),_("p",[v._v("虚拟化的工作原理是直接在"),_("strong",[v._v("物理服务器硬件上或主机操作系统上插入一个精简的软件层，该软件层包含一个以动态和透明方式分配硬件资源的虚拟机监视器（虚拟化管理程序，也成为Hypervisor）。")]),v._v('\n相信很多人都学习过面向对象的编程语言，明白"封装"的原理，以Java为例，将特定的属性和方法封装到一个类中。'),_("strong",[v._v("虚拟化的工作原理也包含一个类似的“封装过程”，")]),v._v(" "),_("strong",[v._v('将硬件资源（包括CPU、内存、操作系统和网络设备）"封装"起来、因此虚拟机可与所有标准的操作系统、应用程序和设备驱动程序完全兼容，\n可与同时在一台物理服务器上安装运行多个操作系统和应用程序，每个操作系统和应用程序都可以在其需要时访问其所需的资源。')])]),v._v(" "),_("h3",{attrs:{id:"虚拟机-vm"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机-vm"}},[v._v("#")]),v._v(" 虚拟机（VM）")]),v._v(" "),_("p",[v._v('"虚拟机(VM)"即虚拟计算机系统，它是一种严密隔离的软件容器，内含操作系统和应用。每个功能完整的虚拟机都是完全独立的，\n包含自己独立（即基于软件实现的）的CPU、内存、硬盘、显卡、声卡、网卡。')]),v._v(" "),_("p",[v._v('设置完成的虚拟机对于用户来说，是与"物理"计算机，与"虚拟"计算机不同。对于运行与计算机中的操作系统来说，它们是等价的，是不会、也无从分辨物理机与虚拟机的区别的。\n简而言之，对于运行其中的操作系统和应用，虚拟机与物理机基本上没什么区别。')]),v._v(" "),_("p",[v._v('将设置好的多台虚拟机放置在一台计算机上，即可实现在一台物理服务器或"主机"上运行多个操作系统和应用。')]),v._v(" "),_("h3",{attrs:{id:"虚拟集群"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟集群"}},[v._v("#")]),v._v(" 虚拟集群")]),v._v(" "),_("p",[v._v("服务器拟化技术是指能够在一台物理服务器上运行多台虚拟服务器的技术，并且上述虚拟服务器在用户、应用软件甚至操作系统看来，几乎与物理服务器没有区别，\n用户可以在虚拟服务器上灵活地安装任何软件。除此以外，服务器虚拟化技术还应该确保上述多个虚拟服务器之间的数据隔离，资源占用可控。")]),v._v(" "),_("p",[v._v("在X86平台虚拟化技术中，新引入的虚拟化层通常称为虚拟机监控器(Virtual MachineMonitor, VMM)， 也叫做Hypervisor。\n虚拟机监控器运行的环境，也就是真实的物理平台，称之为宿主机(host machine)。而虚拟出来的平台通常称为客户机(guest machine)，\n里面运行的系统对应地也称为客户机操作系统，如下图：")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/virtual-service.png"),alt:"virtual-service"}}),v._v(" "),_("h2",{attrs:{id:"计算与内存虚拟化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#计算与内存虚拟化"}},[v._v("#")]),v._v(" 计算与内存虚拟化")]),v._v(" "),_("p",[v._v("针对CPU和内存资源虚拟化技术。计算虚拟化通过虚拟化管理程序（Hypervisor或VMM）将物理服务器的硬件资源与上层应用进行解耦，形成统一的计算资源池，\n然后可弹性分配给逻辑上隔离的虚拟机共享使用。如图基于VMM所在位置与虚拟化范围可以分三种类型。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vvm.webp"),alt:"vmm"}}),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vvm2.webp"),alt:"vmm2"}}),v._v(" "),_("p",[v._v("容器（应用级）：容器是一种更加轻量的应用级虚拟化技术，将应用的可执行文件及其所需的运行时环境与依赖库打包，实现一次构建，到处运行的目标。\n相比虚拟化，容器技术多了容器引擎层（如Docker），但上层应用无需与Guest OS绑定，可以实现秒级部署、跨平台迁移，灵活的资源分配，弹性调度管理等优势。\n容器、微服务与DevOps为云原生的三大要素，是推动企业技术中台建设与微服务化转型不可或缺的组件。")]),v._v(" "),_("p",[v._v("KVM是基于虚拟化扩展（Intel VT 或者 AMD-V）的 X86 硬件的开源的 Linux 原生的全虚拟化解决方案。KVM 中，\n虚拟机被实现为常规的 Linux 进程，由标准 Linux 调度程序进行调度；虚机的每个虚拟 CPU 被实现为一个常规的 Linux 进程。\n这使得 KMV 能够使用 Linux 内核的已有功能。")]),v._v(" "),_("p",[v._v("但是，KVM本身不执行任何硬件模拟，需要客户空间程序通过/dev/kvm 接口设置一个客户机虚拟服务器的地址空间，向它提供模拟的 I/O，\n并将它的视频显示映射回宿主的显示屏。目前这个应用程序是QEMU。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/kvm.webp"),alt:"kvm"}}),v._v(" "),_("ul",[_("li",[v._v("Guest：客户机系统，包括CPU（vCPU）、内存、驱动（Console、网卡、I/O 设备驱动等），被 KVM 置于一种受限制的 CPU 模式下运行。")]),v._v(" "),_("li",[v._v("KVM：运行在内核空间，提供CPU 和内存的虚级化，以及客户机的 I/O 拦截。Guest 的 I/O 被 KVM 拦截后，交给 QEMU 处理。")]),v._v(" "),_("li",[v._v("QEMU：修改过的为 KVM 虚机使用的 QEMU 代码，运行在用户空间，提供硬件 I/O 虚拟化，通过 IOCTL /dev/kvm 设备和 KVM 交互。")])]),v._v(" "),_("p",[v._v("KVM依赖的Intel/AMD处理器的各种虚拟化扩展：")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("处理器")]),v._v(" "),_("th",[v._v("CPU 虚拟化")]),v._v(" "),_("th",[v._v("内存虚拟化")]),v._v(" "),_("th",[v._v("PCI Pass-through")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("Intel")]),v._v(" "),_("td",[v._v("VT-x")]),v._v(" "),_("td",[v._v("VPID，EPT")]),v._v(" "),_("td",[v._v("VT-d")])]),v._v(" "),_("tr",[_("td",[v._v("AMD")]),v._v(" "),_("td",[v._v("AMD-V")]),v._v(" "),_("td",[v._v("ASID，NPT")]),v._v(" "),_("td",[v._v("IOMMU")])])])]),v._v(" "),_("p",[v._v("除了CPU虚拟化，另一个关键是内存虚拟化，通过内存虚拟化共享物理系统内存，动态分配给虚拟机。虚拟机的内存虚拟化很象现在的操作系统支持的虚拟内存方式，\n应用程序看到邻近的内存地址空间，这个地址空间无需和下面的物理机器内存直接对应，操作系统保持着虚拟页到物理页的映射。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vmemory.jpg"),alt:"vmemory"}}),v._v(" "),_("p",[v._v("现在所有的 x86 CPU都包括了一个称为内存管理的模块MMU（Memory Management Unit）和 TLB(Translation Lookaside Buffer)， 通过MMU和TLB来优化虚拟内存的性能。\nKVM中，虚机的物理内存即为 qemu-kvm 进程所占用的内存空间。KVM 使用 CPU 辅助的内存虚拟化方式。在 Intel 和 AMD 平台，其内存虚拟化的实现方式分别为：\nAMD 平台上的 NPT （Nested Page Tables） 技术Intel 平台上的 EPT （Extended Page Tables）技术\nEPT 和 NPT采用类似的原理，都是作为 CPU 中新的一层，用来将客户机的物理地址翻译为主机的物理地址。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/EPT.webp"),alt:"EPT"}}),v._v(" "),_("p",[v._v("EPT的好处是，它的两阶段记忆体转换，特点就是将 Guest Physical Address → System Physical Address，VMM不用再保留一份 SPT (Shadow Page Table)，\n以及以往还得经过 SPT 这个转换过程。除了降低各部虚拟机器在切换时所造成的效能损耗外，硬体指令集也比虚拟化软体处理来得可靠与稳定。")]),v._v(" "),_("h2",{attrs:{id:"网络虚拟化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#网络虚拟化"}},[v._v("#")]),v._v(" 网络虚拟化")]),v._v(" "),_("p",[v._v("针对网络链路资源虚拟化技术。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vnetwork.webp"),alt:"vnetwork"}}),v._v(" "),_("p",[v._v("网络虚拟化 (NV) 是指将传统上在硬件中交付的网络资源抽象化到软件中。NV 可以将多个物理网络整合为一个基于软件的虚拟网络，或者可以将一个物理网络划分为多个隔离和独立的虚拟网络。")]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vnetwork2.jpg"),alt:"vnetwork2"}}),v._v(" "),_("p",[v._v("传统网络\n在传统网络环境中，一台物理主机包含一个或多个网卡（NIC），要实现与其他物理主机之间的通信，需要通过自身的 NIC 连接到外部的网络设施，\n如交换机上。这种架构下，为了对应用进行隔离，往往是将一个应用部署在一台物理设备上，这样会存在两个问题，")]),v._v(" "),_("ol",[_("li",[v._v("是某些应用大部分情况可能处于空闲状态，")]),v._v(" "),_("li",[v._v("是当应用增多的时候，只能通过增加物理设备来解决扩展性问题。不管怎么样，这种架构都会对物理资源造成极大的浪费。")])]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vnetwork3.jpg"),alt:"vnetwork3"}}),v._v(" "),_("p",[v._v("其中虚拟机与虚拟机之间的通信，由虚拟交换机完成，虚拟网卡和虚拟交换机之间的链路也是虚拟的链路，整个主机内部构成了一个虚拟的网络，如果虚拟机之间涉及到三层的网络包转发，则又由另外一个角色——虚拟路由器来完成。")]),v._v(" "),_("h3",{attrs:{id:"虚拟交换机-ovs"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟交换机-ovs"}},[v._v("#")]),v._v(" 虚拟交换机-OVS")]),v._v(" "),_("p",[v._v("Open vSwitch 是在开源Apache2许可下获得许可的多层软件交换机。我们的目标是实现一个生产质量交换平台，\n该平台支持标准管理接口，并将转发功能开放给程序化扩展和控制。非常适合用作 VM 环境中的虚拟交换机。\n除了向虚拟网络层公开标准控制和可见性接口外，它还旨在支持跨多个物理服务器的分布。支持多种基于 Linux 的虚拟化技术，\n包括 Xen/XenServer、KVM 和 VirtualBox.")]),v._v(" "),_("ul",[_("li",[v._v("datapath是负责数据交换的内核模块，其从网口读取数据，并快速匹配Flowtable中的流表项，成功的直接转发，失败的上交vswitchd处理。它在初始化和port binding的时候注册钩子函数，把端口的报文处理接管到内核模块。")]),v._v(" "),_("li",[v._v("vswitchd是一个守护进程，是ovs的管理和控制服务，通过unix socket将配置信息保存到ovsdb，并通过netlink和内核模块交互。")]),v._v(" "),_("li",[v._v("ovsdb则是ovs的数据库，保存了ovs配置信息。")])]),v._v(" "),_("img",{attrs:{src:v.$withBase("/project/cloud/vnet.webp"),alt:"vnet"}}),v._v(" "),_("h2",{attrs:{id:"存储虚拟化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#存储虚拟化"}},[v._v("#")]),v._v(" 存储虚拟化")]),v._v(" "),_("p",[v._v("针对磁盘存储资源虚拟化技术。")]),v._v(" "),_("h2",{attrs:{id:"内网穿透-frpc"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#内网穿透-frpc"}},[v._v("#")]),v._v(" 内网穿透(FRPC)")]),v._v(" "),_("ul",[_("li",[v._v("frpc技术")])]),v._v(" "),_("h2",{attrs:{id:"硬件服务模拟"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#硬件服务模拟"}},[v._v("#")]),v._v(" 硬件服务模拟")]),v._v(" "),_("ul",[_("li",[v._v("不同的平台对应不同的硬件服务")]),v._v(" "),_("li",[v._v("工厂设计模式")]),v._v(" "),_("li",[v._v("策略设计模式")]),v._v(" "),_("li",[v._v("微服务")]),v._v(" "),_("li",[v._v("容器化")])]),v._v(" "),_("h2",{attrs:{id:"分布式锁实现资源申请"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分布式锁实现资源申请"}},[v._v("#")]),v._v(" 分布式锁实现资源申请")]),v._v(" "),_("ul",[_("li",[v._v("clone 设计模式")]),v._v(" "),_("li",[v._v("数据库锁")]),v._v(" "),_("li",[v._v("redis锁")]),v._v(" "),_("li",[v._v("zookeeper锁")]),v._v(" "),_("li",[v._v("用户资源限制")])]),v._v(" "),_("h2",{attrs:{id:"分布式事务-资源-积分-个人信息"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分布式事务-资源-积分-个人信息"}},[v._v("#")]),v._v(" 分布式事务(资源,积分,个人信息)")]),v._v(" "),_("ul",[_("li",[v._v("开发、测试、部署环境的资源申请")])]),v._v(" "),_("h2",{attrs:{id:"高可用的消息系统设计"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高可用的消息系统设计"}},[v._v("#")]),v._v(" 高可用的消息系统设计")]),v._v(" "),_("ul",[_("li",[v._v("用户免费使用7天")]),v._v(" "),_("li",[v._v("定时任务构建物理集群")]),v._v(" "),_("li",[v._v("定时任务构建虚拟集群")])]),v._v(" "),_("h2",{attrs:{id:"服务幂等性设计"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务幂等性设计"}},[v._v("#")]),v._v(" 服务幂等性设计")]),v._v(" "),_("ul",[_("li",[v._v("vue前端的幂等行设计")]),v._v(" "),_("li",[v._v("后端的幂等性设计")])]),v._v(" "),_("h2",{attrs:{id:"系统的监控"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#系统的监控"}},[v._v("#")]),v._v(" 系统的监控")]),v._v(" "),_("ul",[_("li",[v._v("基础设施监控")]),v._v(" "),_("li",[v._v("系统的监控")]),v._v(" "),_("li",[v._v("应用的监控")]),v._v(" "),_("li",[v._v("业务的监控")]),v._v(" "),_("li",[v._v("用户端监控")])]),v._v(" "),_("h2",{attrs:{id:"项目技术栈"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#项目技术栈"}},[v._v("#")]),v._v(" 项目技术栈")]),v._v(" "),_("ul",[_("li",[v._v("Springboot")]),v._v(" "),_("li",[v._v("Mybatis")]),v._v(" "),_("li",[v._v("Redis")]),v._v(" "),_("li",[v._v("Mysql")]),v._v(" "),_("li",[v._v("Vue")]),v._v(" "),_("li",[v._v("Virtualization")]),v._v(" "),_("li",[v._v("VitrualNetwork")]),v._v(" "),_("li",[v._v("Containerization")]),v._v(" "),_("li",[v._v("FRPC")]),v._v(" "),_("li",[v._v("OSS Service")]),v._v(" "),_("li",[v._v("Auth Service")])]),v._v(" "),_("h2",{attrs:{id:"博文参考"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#博文参考"}},[v._v("#")]),v._v(" 博文参考")]),v._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://www.vmware.com/cn/solutions/virtualization.html#overview",target:"_blank",rel:"noopener noreferrer"}},[v._v("Vmware虚拟化"),_("OutboundLink")],1)]),v._v(" "),_("li",[_("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/441287815",target:"_blank",rel:"noopener noreferrer"}},[v._v("深入理解虚拟化"),_("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);