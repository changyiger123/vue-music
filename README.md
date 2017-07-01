##介绍
vue-cli 默认只提供了dev和prod两种环境。但真实的开发流程还会多test(测试环境)。所以我们就要简单的修改一下代码。
##目录结构
```shell
├─build                                 构建相关  
│      build.js                              生产环境构建脚本
│      check-versions.js
│      dev-client.js                         开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│      dev-server.js                         运行本地开发服务器
│      utils.js                              构建相关工具方法
│      vue-loader.conf.js
│      webpack.base.conf.js                  wabpack基础配置
│      webpack.dev.conf.js                   wabpack开发环境配置
│      webpack.prod.conf.js                  wabpack生产环境/测试环境配置
│      dev-server.js                         运行本地构建服务器，可以访问构建后的页面
│      
├─config                                配置相关  
│      dev.env.js                            开发环境变量
│      index.js                              项目配置文件
│      prod.env.js                           生产环境变量
│      test.env.js                           测试环境变量
│      
├─src// 构建相关  
│  │  App.vue                           根组件
│  │  main.js                           入口js文件
│  │  
│  ├─api                                      
│  │      api.js                             所有请求
│  │      config.js                          请求配置
│  │      
│  ├─assets                             静态资源会被webpack构建
│  │      logo.png                          
│  │      
│  ├─components                         公共组件目录
│  │      Hello.vue
│  │      
│  ├─router                             路由配置
│  │      index.js
│  │      
│  ├─store                              vuex状态管理
│  └─views                              页面级组件尽量与router相呼应
└─static                                静态资源，不会被webpack构建
```

##vue-cli脚手架及一些常用插件安装
```
1.//淘宝镜像
    npm install -g cnpm –registry=[https://registry.npm.taobao.org](https://registry.npm.taobao.org/)
2. vue init webpack project-name            //初始化vue-cli模板
3. ESlint / e2e / Karma + Mocha             //语法检查/端到端测试/单元测试 这些没有装
4. vue-router          yes                  //vue路由插件
5. cnpm install sass-loader node-sass webpack --save-dev //安装sass-loader
6. cnpm install axios --save-dev                   //vue推荐网络库
7. cnpm install vuex --save-dev                    //vuex状态管理
8. cnpm install  babel-polyfill  --save            //解决非现代浏览器promise兼容
webpack.base.conf.js
 entry: {
    app: ['babel-polyfill','./src/main.js']
  },
```
>[npm 安装参数中的 --save-dev](https://segmentfault.com/q/1010000000403629)
`-save`和`save-dev`可以省掉你手动修改`package.json`文件的步骤。
`npm install module-name -save` 自动把模块和版本号添加到`dependencies`部分
 `npm install module-name -save-dve` 自动把模块和版本号添加到`devdependencies`部分
至于配置文件区分这俩部分， 是用于区别开发依赖模块和产品依赖模块

##开始配置多环境

- <b>说明
>1. `npm run  dev`         开发环境
 2. `npm run  build:test` 测试环境，调试信息，报错信息均保留
 3. ` npm run  build:prod`生产环境，关闭调试信息 如console.*、vue-devtool、js.map
 4. `npm run  build:test-preview` vue-cli内置的webpack-bundle-analyzer 一个模块分析的东西 （可以不用，不去配置npm script）
-  npm scripts
```
// pageage.json
"dev": "node build/dev-server.js",
"build:prod": "cross-env NODE_ENV=production node build/build.js",
"build:test": "cross-env NODE_ENV=test node build/build.js",
"build:test-preview": "cross-env NODE_ENV=test npm_config_preview=true  npm_config_report=true node build/build.js"
```
- 新建多环境
```
//新建test.env.js
module.exports = {
  NODE_ENV: '"test"'
}
//index.js
build: {
    testEnv: require('./test.env'),
    prodEnv: require('./prod.env'),
...
    //判断打包是否构建.map文件
    /* .map文件作用
     *索引控制台错误的位置，如果没有.map文件，不会出现报错信息
     */
    productionSourceMap: process.env.NODE_ENV === 'test',
}
```
- 根据环境不同决定是否有debug
```
//webpack.prod.conf.js
var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : config.build.testEnv
//
plugins: [
...
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: process.env.NODE_ENV === 'production'
      },
      sourceMap: true
    }),
//main.js
if(process.env.NODE_ENV === 'production'){
  //生产环境 关闭警告 vue-devtools
  Vue.config.productionTip = false
  Vue.config.devtools = false
}
```
- 打包进程loading 根据环境显示相应的打包文案
```
//build.js
var spinner = ora('building for '+ process.env.NODE_ENV +'...')
```
- 接口环境和运行环境切换使用
```
//api/config.js
if(process.env.NODE_ENV === 'production'){
  //生产环境部署
  axios.defaults.baseURL = 'http://123.456.7.89'
}else if(process.env.NODE_ENV === 'development'){
  //开发环境部署
  axios.defaults.baseURL = 'http://123.456.7.89:8081'
}else if(process.env.NODE_ENV === 'test'){
  //测试环境部署
  axios.defaults.baseURL = 'http://123.456.7.89:8082'
}
```
- 接口使用（axios）
```
import {_login} from 'api/api'
import axios from 'api/config'
...
let url = _login
axios.get(url)
       .then(res=>{
       //请求成功
       console.log(res)
         })
       .catch(err=>{
         //请求错误
       console.log(err)
       })
```
##其他webpack配置
- 文件夹索引
```
//webpack.base.conf.js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'static': path.resolve(__dirname, '../static')
...
    }
  },
```
- 网站图标
```
//webpack.prod.conf.js && webpack.dev.conf.js
var path = require('path')
...
function resolveApp(relativePath) {
  return path.resolve(relativePath);
}
...
new HtmlWebpackPlugin({
//使用
 favicon: resolveApp('favicon.ico')
})
]
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8091
npm run dev

# build for production with minification
npm run build:prod

# build for test with minification
npm run build:test

# build for production and view the bundle analyzer report
npm run build:test --report
```
