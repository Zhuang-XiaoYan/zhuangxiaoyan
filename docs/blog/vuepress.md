# VuePress

<hr>

VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，
另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。
每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。
同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## VuePress的工作原理

事实上，一个 VuePress 网站是一个由 Vue ()、Vue Router () 和 webpack
() 驱动的单页应用。如果你以前使用过 Vue 的话，当你在开发一个自定义主题的时候，你会感受到非常熟悉的开发体验，
你甚至可以使用 Vue DevTools 去调试你的自定义主题。在构建时，我们会为应用创建一个服务端渲染（SSR）的版本，
然后通过虚拟访问每一条路径来渲染对应的HTML。这种做法的灵感来源于 Nuxt() 的 nuxt generate 命令，
以及其他的一些项目，比如 Gatsby ()。

## VuePress内部链接

::: tip
```html
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```
:::

## VuePress自定义容器

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

## VuePressGitHub表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## VuePress表情引用

你可以在这个[列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)找到所有可用的表情。

## VuePress静态资源

所有的 Markdown 文件都会被 webpack 编译成 Vue 组件，因此你可以，并且应该更倾向于使用相对路径（Relative URLs）来引用所有的静态资源：

```html
![An image](./image.png)
```

同样地，这在 *.vue 文件的模板中一样可以工作，图片将会被 url-loader 和 file-loader 处理，在运行生成静态文件的构建任务时，文件会被复制到正确的位置。

除此之外，你也使用 ~ 前缀来明确地指出这是一个 webpack 的模块请求，这将允许你通过 webpack 别名来引用文件或者 npm 的依赖：

```html
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

## VuePress文件夹设置别名

Webpack 的别名可以通过 .vuepress/config.js 中 configureWebpack 来配置，如：

```js
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    }
}
```

## VuePress公共文件

有时，你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，
在这种情形下，你可以将它们放在 .vuepress/public 中， 它们最终会被复制到生成的静态文件夹中。

## VuePress基础路径

如果你的网站会被部署到一个非根路径，你将需要在 .vuepress/config.js 中设置 base，举例来说，
如果你打算将你的网站部署到 https://foo.github.io/bar/，那么 base 的值就应该被设置为 "/bar/" (应当总是以斜杠开始，并以斜杠结束)。

有了基础路径（Base URL），如果你希望引用一张放在 .vuepress/public 中的图片，你需要使用这样路径：/bar/image.png，然而，
一旦某一天你决定去修改 base，这样的路径引用将会显得异常脆弱。为了解决这个问题，
VuePress 提供了内置的一个 helper $withBase（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：

```html
<img :src="$withBase('/foo.png')" alt="foo">
```

值得一提的是，你不仅可以在你的 Vue 组件中使用上述的语法，在 Markdown 文件中亦是如此。

最后补充一句，一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中.

## VuePress在Markdown中使用Vue

当你在开发一个VuePress 应用时，由于所有的页面在生成静态HTML时都需要通过Node.js服务端渲染，因此所有的Vue相关代码都应当遵循 编写通用代码的要求。
简而言之，请确保只在 beforeMount 或者 mounted 访问浏览器 / DOM 的 API。
如果你正在使用，或者需要展示一个对于 SSR 不怎么友好的组件（比如包含了自定义指令），你可以将它们包裹在内置的ClientOnly组件中：
请注意，这并不能解决一些组件或库在导入时就试图访问浏览器 API 的问题 —— 如果需要使用这样的组件或库，你需要在合适的生命周期钩子中动态导入它们：
如果你的模块通过 export default 导出一个 Vue 组件，那么你可以动态注册它：

## VuePress项目部署

下述的指南基于以下条件：
- 文档放置在项目的 docs 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 npm scripts:

```json
{
    "scripts": {
        "docs:build": "vuepress build docs"
    }
}
```

## VuePress在GitHubPages部署

1. 在 docs/.vuepress/config.js 中设置正确的 base。
2. 在你的项目中，创建一个如下的 deploy.sh 文件（请自行判断去掉高亮行的注释）:

```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip
你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。
:::

## GitHubPages TravisCI部署

1. 在 docs/.vuepress/config.js 中设置正确的 base。
2. 在项目的根目录创建一个名为 .travis.yml 的文件；
3. 在本地执行 yarn 或 npm install 并且提交生成的 lock 文件（即 yarn.lock 或 package-lock.json）；
4. 使用 GitHub Pages 部署提供程序模板并遵循 Travis 文档

```shell
language: node_js
node_js:
    - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

## Netlify部署VuePress项目

1. 在 Netlify 中, 创建一个新的 GitHub 项目，使用以下设置：
```shell
Build Command: yarn docs:build 或者 npm run docs:build
Publish directory: docs/.vuepress/dist
```
2. 点击 deploy 按钮！

## Surge部署VuePress项目

1. 首先，假设你已经安装了 surge
2. 运行 yarn docs:build 或者 npm run docs:build；
3. 想要使用 surge 来部署，你可以运行： surge docs/.vuepress/dist；
4. 你也可以通过 surge docs/.vuepress/dist yourdomain.com 来部署到 自定义域名

## Heroku部署VuePress项目

1. 首先安装 Heroku CLI

2. 在[Heroku](https://signup.heroku.com/)注册一个 Heroku 账号；

3. 运行 heroku login 并填写你的 Heroku 证书：

```shell
heroku login
```

4. 在你的项目根目录中，创建一个名为 static.json 的文件，并包含下述内容：

```json
{
  "root": "./docs/.vuepress/dist"
}
```
5. 配置 Heroku 的 git 远程仓库：

```shell
# 版本变化
git init
git add .
git commit -m "My site ready for deployment."

# 以指定的名称创建一个新的 heroku 应用
heroku apps:create example

# 为静态网站设置构建包
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```
6. 部署你的网站：

```shell
# 发布网站
git push heroku master

# 打开浏览器查看 Helku CI 的 dashboard
heroku open
```

## 博文参考
- [Vuepress](https://www.vuepress.cn/)