# xb_home

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


1. vue init webpack project_name 初始化项目

2. 使用webstorm 打开

3. npm run dev 启动前端项目

4. 导入 element-ui 框架

5. 设置 element-ui 全局配置 编辑 main.js 文件

   5.1 

   ```
   import ElementUI from "element-ui"; // ui框架导入
   import 'element-ui/lib/theme-chalk/index.css' // ui css 样式导入
   ```

6. 导入 axios ,main.js 添加 axios 全局配置

   `npm install axios`

7. 配置 axios 跨域
   Config/index.js 文件中添加跨域
   $$
   '/doc': {
           target: 'http://localhost:8888', // 代理服务器
           changeOrigin: true,
           pathRewrite: {"^/doc": ""}
         }
   $$

8. 配置登录页面 login、使用 axios  请求 后端login、访问成功跳转首页、失败提示

9. 


