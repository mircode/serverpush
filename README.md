# Server Push

服务器推送数据的几种方式：ajax轮询，comet，websocket，server send event。

## 一、WebSocket

```
  var ws = new WebSocket('ws://127.0.0.1:8001');

  ws.onopen = function(e){
      console.log("连接服务器成功");
      ws.send("连接服务器成功：hello server");
  }
  ws.onclose = function(e){
      console.log("服务器关闭");
  }
  ws.onerror = function(){
      console.log("连接出错");
  }

  ws.onmessage = function(e){
    console.info(e.data);
  }
```

## 二、Server Send Event

```
var source = new EventSource("stream");
        
    // 如果Server不指定event事件类型,则调用默认的onmessage回调
    source.onmessage=function(e) {
      console.info(e.data);
    };

   // 接受connectiontime事件消息,自定义
    source.onconnecttime=function(e) {
      console.info(e.data);
    };

    // 打开连接
    source.onopen=function(event) {
      console.info("打开连接");
    };

   // 关闭连接
   source.onerror=function(event) {
      if (event.target.readyState === EventSource.CLOSED) {
        source.close();
        console.info("链接关闭");
      } else if (event.target.readyState === EventSource.CONNECTING) {
        console.info("连接关闭,尝试重新链接!");
      } else {
        console.info(""连接关闭,未知错误");
      }
    };
```
