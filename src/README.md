# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```

不管是服务器还是客户端都有 `emit` 和 `on` 这两个函数，可以说 socket.io 的核心就是这两个函数了，通过 `emit` 和 `on` 可以轻松地实现服务器与客户端之间的双向通信。

`emit` ：用来发射一个事件或者说触发一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（一般省略，如需对方接受到信息后立即得到确认时，则需要用到回调函数）。
`on` ：用来监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为一个匿名函数用来接收对方发来的数据，该匿名函数的第一个参数为接收的数据，若有第二个参数，则为要返回的函数。
socket.io 提供了三种默认的事件（客户端和服务器都有）：`connect` 、`message` 、`disconnect` 。当与对方建立连接后自动触发 `connect` 事件，当收到对方发来的数据后触发 `message` 事件（通常为 `socket.send()` 触发），当对方关闭连接后触发 `disconnect` 事件。

此外，socket.io 还支持自定义事件，毕竟以上三种事件应用范围有限，正是通过这些自定义的事件才实现了丰富多彩的通信。

最后，需要注意的是，在服务器端区分以下三种情况：

`socket.emit()` ：向当前连接的该连接的客户端广播
`socket.broadcast.emit()` ：向除去建立该连接的客户端外的所有客户端广播
`io.sockets.emit()` ：向所有客户端广播

https://www.w3cschool.cn/socket/
https://github.com/MetinSeylan/Vue-Socket.io
https://socket.io/docs/v2/client-api/#managertimeoutvalue
