# wx-client
微信公众号接口[wx-api](https://github.com/niefy/wx-api)前端项目，包含微信登录、微信分享、CMS文章示例功能

## 开发环境
- node.js

## 启动步骤
1. 启动[wx-api](https://github.com/niefy/wx-api)项目,具体流程参考对应项目介绍
2. 安装依赖

``` bash
npm install
```
2. 编译构建
``` bash
# 开发环境
npm run serve

# 生产环境
npm run build
```
3. 浏览器打开如下地址：
    - 首页：http://localhost:8080
    - 文章(微信分享)示例：http://localhost:8080/article/1
    - 微信登录示例：http://localhost:8080/wxLogin