---
lang: zh-CN
sidebarDepth: 2
---

# Vue-Admin-Front容器化部署文档

## 一、安装Docker服务

```shell
## 使用国内 daocloud 一键安装命令：
sudo curl -sSL https://get.daocloud.io/docker | sh
sudo groupadd docker ##添加docker用户组
sudo gpasswd -a $USER docker ##将登陆用户加入到docker用户组中
newgrp docker ##更新用户组
```

```shell
## 安装docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
## 启动docker服务
systemctl start docker
## 设置docker开机自启
systemctl enable docker
## 配置docker加速器
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
## 重启docker服务
systemctl daemon-reload
systemctl restart docker
echo "Docker安装完成！"
```

## 二、编写Dockerfile

```dockerfile
FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf
```

## 三、添加.dockerignore

设置 .dockerignore 文件能防止 node_modules 和其他中间构建产物被复制到镜像中导致构建问题。

```html
**/node_modules
**/dist
```

## 四、编写nginx.conf

```html
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    server_name  localhost;
    location / {
      root   /app;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
    ## 配置代理，解决跨域问题
    location /api {
    	proxy_pass http://sph-h5-api.atguigu.cn/api;
    }
  }
}
```

## 五、构建服务镜像

```shell
docker build . -t vue-mall:1.0.0
```

## 六、拉取镜像

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/athena-zhaungxiaoyan/athena-mall-product:1.0.0
```

<img :src="$withBase('/project/athena-mall/docker-registery.png')" alt="registery">

## 七、运行容器

```shell
docker run --privileged=true --restart=always -name==vue-mall -d -p 80:80  vue-mall:1.0.0 
```

## 八、访问服务

```shell
http://remote-ip/
```

<img :src="$withBase('/project/athena-mall/docker-deploy.png')" alt="deploy">

## 博文参考

-[国外的虚拟电话](https://sms-activate.org/cn/)