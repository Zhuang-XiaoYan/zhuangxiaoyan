module.exports = {
    lang: 'zh-CN',
    title: '庄小焱',
    description: '我是庄小焱，PMP项目管理专家、系统架构设计师(高级)、CSDN博文专家、后端开发工程师。 博主在微服务、虚拟化、系统架构、大数据、机器学习领域不断学习，同时在博客中分享自己学习知识和相关技术， 欢迎大家和我交流学习，欢迎大家关注我的博客。',
    host: "localhost",
    port: 80,
    base: '/zhuangxiaoyan/',
    themeConfig: {
        locales: {
            '/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                editLinkText: '在 GitHub 上编辑此页',
                nav: getNavMenu(),
                sidebar: {
                    '/resume/': getResumeSidebar(),
                    '/project/': getProjectList('Cloud-Platform项目','DevOps-Platform系统项目','Mall电商项目','大数据库项目'),
                    '/blog/': getBlogSidebar('数据结构与算法','数据库','计算机网络','操作系统','Java语言','Go语言','Vue全家桶','JDK源码','Spring全家桶','Mybatis框架','JUC并发编程','Nginx框架','RabbitMQ中间件','Kafka中间件','Rpc中间件','Redis中间件','Docker','KubeSphere'),
                    // '/ai/': getAIList('AI项目'),
                }
            },
        }
    },
    plugins: [
        '@vuepress/back-to-top',
    ],
}

// 获取nav菜单
function getNavMenu() {
    return [
        {
            text: '庄小焱简历',
            link: '/resume/',
            ariaLabel: '简历'
        },
        {
            text: '庄小焱博客',
            link: '/blog/',
            ariaLabel: '博客',
        },
        {
            text: '实战项目',
            link: '/project/',
            ariaLabel: '项目',
        },
        {
            text: 'AI项目',
            link: '/ai/',
            ariaLabel: 'AI项目',
        },
        {
            text: '个人账号',
            items: getMyAccount()
        }
    ]
}

// 获取简历菜单
function getResumeSidebar(groupA) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
            ]
        }
    ]
}

// 获取实战项目
function getProjectList(groupA,groupB,groupC,groupD) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'cloud-stack',
                'cloud-interview',
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'devops-cicd',
                'devops-stack',
                'devops-interview',
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'athena-mall-cloud',
                'athena-mall-cloud-stack',
                'athena-mall-cloud-deploy',
                'athena-mall-cloud-interview',
                'athena-mall-front',
                'athena-mall-front-stack',
                'athena-mall-front-deploy',
                'athena-mall-front-interview',
                'athena-mall-front-api',
                'athena-admin-front',
                'athena-admin-front-stack',
                'athena-admin-front-deploy',
                'athena-admin-front-interview',
            ]
        },
        {
            title: groupD,
            collapsable: false,
            children: [
                'hera-bigdata',
            ]
        },
    ]
}

// 获取个人账户
function getMyAccount(groupA) {
    return [
        {text: '庄小焱-博客', link: 'https://zhuang-xiaoyan.github.io/zhuangxiaoyan/'},
        {text: '庄小焱-雀语', link: 'https://www.yuque.com/zhuangxiaoyan'},
        {text: '庄小焱-Github', link: 'https://github.com/Zhuang-XiaoYan'},
        {text: '庄小焱-Gitee', link: 'https://gitee.com/xjl2462612540'},
        {text: '庄小焱-CSDN', link: 'https://blog.csdn.net/weixin_41605937'},
    ]
}

// 获取博文详细资料
function getBlogSidebar(groupA,groupB,groupC,groupD,groupE,groupF,groupG,groupH,groupI,groupJ,groupK,groupO,groupL,groupM,groupN,groupP,groupQ,groupR) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'database',
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'network',
            ]
        },
        {
            title: groupD,
            collapsable: false,
            children: [
                'os',
            ]
        },
        {
            title: groupE,
            collapsable: false,
            children: [
                'java',
            ]
        },
        {
            title: groupF,
            collapsable: false,
            children: [
                'go',
            ]
        },
        {
            title: groupG,
            collapsable: false,
            children: [
                'vue',
                'vuepress',
                'vue-cli'
            ]
        },
        {
            title: groupH,
            collapsable: false,
            children: [
                'jdk',
            ]
        },
        {
            title: groupI,
            collapsable: false,
            children: [
                'spring',
            ]
        },
        {
            title: groupJ,
            collapsable: false,
            children: [
                'mybatis',

            ]
        },
        {
            title: groupK,
            collapsable: false,
            children: [
                'juc',
            ]
        },
        {
            title: groupO,
            collapsable: false,
            children: [
                'nginx',
            ]
        },
        {
            title: groupL,
            collapsable: false,
            children: [
                'rabbitmq',
            ]
        },
        {
            title: groupM,
            collapsable: false,
            children: [
                'kafka',
            ]
        },
        {
            title: groupN,
            collapsable: false,
            children: [
                'rpc',
            ]
        },
        {
            title: groupP,
            collapsable: false,
            children: [
                'redis',
            ]
        },
        {
            title: groupQ,
            collapsable: false,
            children: [
                'docker',
            ]
        },
        {
            title: groupR,
            collapsable: false,
            children: [
                'kubesphere',
            ]
        },
    ]
}


