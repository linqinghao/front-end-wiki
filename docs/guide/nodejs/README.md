## 创建一个HTTP服务器
在`nodejs`中, 创建一个`http`服务器是非常容易的。`http`模块是`nodejs`中的核心模块，用来创建 http 服务。

```js
// craete a http server
const http = require('http')

const PORT = 9876
let server = http.createServer(function(req, res) {
  res.write('Hello Nodejs')
  res.end()
})

server.listen(PORT, function() {
  console.log(`[server] start at 127.0.0.1:${PORT}`)
})
```
如上面代码，引入`http`模块，并且调用`http.createServer()`方法，最后使用`server.listen`监听端口。这样子，一个简单的`http`服务器就启动了。可以看到访问如下：




## 获取请求信息

## 原生发起HTTP请求

## 上传文件

## 创建一个静态转发服务器

## socket服务


