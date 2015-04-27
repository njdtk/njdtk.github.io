# njdtk.github.io

## 前提

学习新的前端构建工具

## 步骤

1. 安装grunt-cli

        npm install -g grunt-cli

1. 安装项目依赖包

        npm install

    碰到网络不好的时候，依赖包可能安装失败，请删除 `node_modules` 重新安装

1. 运行grunt本地服务器

        grunt server

1. 其他命令

        // 查看编译后的结果
        grunt server --dist=1

        // jshint
        grunt jshint

        // 编译全站
        grunt build

        /**
         * --gruntfile: 指定Gruntfile.js文件的位置，在项目根目录外运行Grunt会用到该参数
         * --node-modules: 指定开发环境依赖包的位置，只需要指定到node_modules父目录即可
         *                 使用该参数便于在同一机器上运行多个分支时共享依赖包
         */
        grunt --gruntfile=/home/webapp/src/Gruntfile.js --node-modules=/home/zhi.zhong

        /**
         * server命令参数
         *   --host: 指定自动打开浏览器的域名，默认值：localhost
         *   --port: 指定自动打开浏览器的端口号，默认值：9001
         */
         grunt server --host=www.yourdomain.com --port=9002


## 技术关键字
`jQuery` `backbonejs` `requirejs` `gruntjs` `less` `MVC` `nodejs`

## 特性

- livereload
静态文件修改后，网页浏览器会自动刷新。使用多屏幕开发时能明显感觉到该技术带来的效率提升
- less
一种css扩展语言，支持嵌套、变量等写法
- auto-prefixer
对css3部分新熟悉自动补全-webkit,-moz,-ms,-o等浏览器厂商前缀
- 自定义打包规则
css、js的方式不一样，css是在html中使用block写法声明，js是在config/boundl.js中配置
- 本地数据模拟
本文后面有篇幅描述
- 静态文件rename缓存方案
文件变化了，文件的md5也变了，解决静态资源浏览器环境问题
- 模块化开发
使用RequireJS来实现模块化文件的加载和打包
- 前端模版编译加载
前端模版单独写成一个文件，使用require!text插件加载打包
- i18n
自动识别用户浏览器语言，并加载对应的语言包
- jshint
编译时做语法检查，语法配置文件可以添加到各种编辑器，在写码过程实时检查代码

## 多个工程共享node_modules

为了以后多分支开发方便，可以将 `node_modules` 移动到项目外(比如 `C:\Users\qq.yang` )，启动时加上参数 `--node-modules=C:\Users\qq.yang` ，指定node\_modules的位置即可

全局路径，也就是带上参数 -g 的安装模式。这个命令会把模块安装在 $PREFIX/lib/node_modules 下，可通过命令 npm root -g 查看全局模块的安装目录。 package.json 里定义的bin会安装到 $PREFIX/bin 目录下，如果模块带有 man page 会安装到 $PREFIX/share/man 目录下

## Require静态资源地址写法
使用相对于baseURL的绝对地址，本项目的baseURL为`/static/js`

Simple
```
|
+- static
|   +- js
|       +- pages
|          +- index
|              +- bar.js
+- vm
```

在本工程的任何位置用RequireJS加载bar.js的话，应该写出这样
```
define([
    'pages/index/bar' //not '/pages/index/bar'
    ], function(bar)

// or
require(['pages/index/bar'])

```


## 模拟数据的使用

1. 模拟数据文件保存路径需要和vm模板路径一一对应
2. 模拟数据文件其实是一个js模块化文件，支持js编程，最后把需要返回的数据在 exports 中return就行了
3. _GET可以接收到url中的querystring，如 `?name=joe` ,可以用 `_GET['name']` 取到 `joe`，不支持POST

模拟数据分为2类

- 页面初始化数据
- 异步接口数据

### 页面初始化数据
这类数据会随着页面模板一起加载，放在 `/app/data/page/ebooking/xxx.js`

### 异步请求数据
这类数据通过AJAX请求加载，放在 `/app/data/api/ebooking/xxx.js`

### 模拟数据中加入头信息
在返回数据中加入headers节点数据的话，返回数据的同时，还会往http返回头中加入这些信息，（暂时只有页面初始化数据支持写头信息）

```javascript
// 返回数据的同时，写cookie
module.exports = function (_GET) {

    return {
        name: 'joe',

        headers = {
            // 在response的header中添加信息
            // http://nodejs.org/docs/latest/api/http.html#http_response_setheader_name_value
            'Set-Cookie': ['name=zhongzhi', 'id=100']
        }
    };
};
```

## CSS Sprite
`static/images/common`下预置了三个目录，放在这三个目录中的图片会被自动打成sprite图片，在生成图片的同时，
还会生成一个包含图片信息的less文件，使用时，先把对应的less文件import进来，
之后，可以直接使用图片信息的less变量，也可以使用内置的mix方法。

```css
@import "icons.less";

.select {
    color: #fff;
    .sprite-image(@slt-dot);
    .sprite-position(@slt-dot);
    background-repeat: repeat-y;
    background-color:  #252F3F;
}

.btn-show{
    .sprite(@icon-list);
}
```