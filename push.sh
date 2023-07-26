#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 提交gitee仓库信息
git add .
git commit -m 'feat(Zhuang-XiaoYan) [xjl005] 添加提交仓库信息'
git remote push -f origin master:master

# 提交github仓库信息
git add .
git commit -m 'feat(Zhuang-XiaoYan) [xjl005] 添加提交仓库信息';
git remote push -f upstream master:master

cd -