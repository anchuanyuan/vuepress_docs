#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github
git config --global init.defaultBranch master
git config --global user.email "1162734640@qq.com"
git config --global user.name "An"
git init
git add .
git commit -m 'deploy'
git remote add origin https://chuanyuan_an:acy123456@gitee.com/chuanyuan_an/vuepress_blog.git
git push origin main -f


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist