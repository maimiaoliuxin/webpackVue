// 引入必要的模块
var express = require('express')
var webpack = require('webpack')
// var hbs = require('hbs');
// var path = require('path');

var config = require('./webpack.dev.config')//开发环境
// var config = require('./webpack.prod.config')//线上环境

// 创建一个express实例
var app = express()


// 调用webpack并把配置传递过去
var compiler = webpack(config)

// 使用 webpack-dev-middleware 中间件 //【热加载，追踪代码的变化】
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// 使用 webpack-hot-middleware 中间件
//配合 webpack-dev-middleware 使用，提供热加载，就是代码更新不用刷新浏览器了
//能够追踪我们代码的变化，并自动更新界面，甚至还能保留程序状态
var hotMiddleware = require('webpack-hot-middleware')(compiler)


// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)

// app.get('/', function(req, res) {
//     res.render('../../output/index.html', {
//         title: "基础功能页面",
//     });
// });

// app.set('view engine', 'html');
// app.engine('html', hbs.__express);
// app.use(bodyParser.urlencoded({
//         extended: false
//     }))
//     // parse application/json  
// app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, '/'))); //制定静态路径


// app.get('/', function(req, res) {
//     res.render('../output/index', {
//     });
// });

// 监听 8086端口，开启服务器
app.listen(8086, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://223.4.206.183:8086')
})