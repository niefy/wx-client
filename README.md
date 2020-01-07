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
3. 修改.env.development开发环境配置文件
4. 编译构建
``` bash
# 开发环境
npm run serve

# 生产环境
npm run build
```
5. 浏览器打开如下地址：
    - 首页：http://localhost:8080

## 体验微信分享和微信登录示例页面
由于微信分享和微信登录功能需在正式域名下使用，开发环境建议使用nginx转发功能+ngrok代理，例如：
nginx.conf配置
```
location /wx/ { #转发后端接口
    proxy_pass   http://127.0.0.1:8088/wx/;
}
location /client/ { #转发微信端H5
    proxy_pass   http://127.0.0.1:8080/;
}
```

然后配置ngok映射到nginx端口:http://xxx.ngrok.io -> http://localhost:80
```
ngrok http  80
```

然后可以微信访问开发环境页面
    - 文章(微信分享)示例：http://xxx.ngrok.io/client/article/1
    - 微信登录示例：http://xxx.ngrok.io/client/wxLogin

## 生产环境如何部署（需先部署wx-api）
1. 配置wx-client目录下.env.production文件
2. 编译打包：npm run build
3. 将打包后的dist目录内文件上传到服务器nginx的资源目录（默认目录名是html）
4. 修改nginx.conf配置，将/wx/ 请求转发到wx-api生产环境接口地址
5. 域名映射到nginx所在服务器，前往微信公众号后台配置做开发配置