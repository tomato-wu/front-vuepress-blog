#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


git add .
git commit -m '小改动'
git push origin

cd -