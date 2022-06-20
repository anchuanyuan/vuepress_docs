#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github
git config --global init.defaultBranch main
git config --global user.email "1162734640@qq.com"
git config --global user.name "An"
git init
git add .
git commit -m 'build: deploy'
git remote add origin https://chuanyuan_an:acy123456@gitee.com/chuanyuan_an/vuepress_blog.git
git remote add github https://github.com/anchuanyuan/anchuanyuan.github.io.git
git push origin main -f
git push github master -f


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist
