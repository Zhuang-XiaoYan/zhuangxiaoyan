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
                nav: getNavMenu(),
                sidebar: {
                    '/resume/': getResumeSidebar(),
                    '/blog/': getGuideSidebar('博客目录'),
                    '/project/': getProjectList('实战项目'),
                    '/ai/': getProjectList('AI项目'),
                }
            },
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        // [
        //     'qrcode',
        //     {
        //         labelText: {
        //             "/": "个人二维码",
        //         },
        //         size: 'small',
        //         channel: true
        //     }
        // ]
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
            ariaLabel: '博客',
            items: getBlogList(),
        },
        {
            text: '实战项目',
            ariaLabel: '项目',
            items: getProject(),
        },
        {
            text: 'AI项目',
            ariaLabel: 'AI',
            items: getProject(),
        },
        {
            text: '个人账号',
            items: [
                {text: '庄小焱-博客', link: 'https://zhuang-xiaoyan.github.io/zhuangxiaoyan/'},
                {text: '庄小焱-雀语', link: 'https://www.yuque.com/zhuangxiaoyan'},
                {text: '庄小焱-Github', link: 'https://github.com/Zhuang-XiaoYan'},
                {text: '庄小焱-Gitee', link: 'https://gitee.com/xjl2462612540'},
                {text: '庄小焱-CSDN', link: 'https://blog.csdn.net/weixin_41605937'},
            ]
        }
    ]
}

// 获取简历菜单
function getResumeSidebar() {
    return [
        {
            collapsable: false,
            children: [
                '',
            ]
        }
    ]
}

// 获取侧边栏菜单
function getGuideSidebar(groupA) {
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

// 获取Athena实战项目
function getProjectList(groupA) {
    return [
        {
            text: 'Athena-Mall系统',
            link: '/project/athena/mall.html'
        },
        {
            text: 'Athena-Admin系统',
            link: '/project/athena/admin.html'
        },
    ]
}

function getBlogList() {
    return [
        {
            items: getLeetcodeList(),
        },
        {

            items: getDBList(),
        },
        {

            items: getOSList(),
        },
        {

            items: getNetworkList(),
        },
        {

            items: getLanguageList(),
        },
        {

            items: getJucList(),
        },
        {

            items: getKafkaList(),
        },
        {

            items: getMybatisList(),
        },
        {

            items: getNginxList(),
        },
        {

            items: getRabbitMqList(),
        },
        {

            items: getRedisList(),
        },
        {

            items: getRpcList(),
        },
        {

            items: getSpringList(),
        },
        {

            items: getVueList(),
        },
        {

            items: getDevopsList(),
        },
        {

            items: getDockerList(),
        },
        {

            items: getKubesphereList(),
        },
        {

            items: getDesignList(),
        },
    ]
}

function getProject() {
    return [
        {
            text: 'Athena项目',
            items: getAthenaList(),
        },
        {
            text: 'Hera项目',
            items: getHeraList(),
        },
    ]
}

function getAthenaList(groupA) {
    return [
        {
            text: 'Athena-Mall系统',
            link: '/project/athena/mall.html'
        },
        {
            text: 'Athena-Admin系统',
            link: '/project/athena/admin.html'
        },
    ]
}


function getHeraList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getLeetcodeList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getDBList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getOSList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getNetworkList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getLanguageList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getJucList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getKafkaList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getMybatisList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getNginxList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getRabbitMqList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getRedisList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getRpcList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getSpringList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getVueList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getDevopsList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getDockerList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getKubesphereList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

function getDesignList(groupA) {
    return [
        {
            text: 'Hera系统',
            link: '/project/hera/bigdata.html'
        },
    ]
}

