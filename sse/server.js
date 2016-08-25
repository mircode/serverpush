var http = require("http");
var fs = require("fs");

var msgId=0;

http.createServer(function (req, res) {
	  var index = "./index.html";
	  var fileName;
	  var interval;
	
	  if (req.url === "/")
	    fileName = index;
	  else
	    fileName = "." + req.url;
	
	  if (fileName === "./stream") {
	  	
	  	// 发送消息头
	    res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});
	    
	    // 发送消息体
	    res.write("id:"+msgId+"\n");				            // 消息ID
			res.write("retry: 10000\n");				            // retry时间
			res.write("event: connecttime\n");			        // 消息类型
			res.write("data: " + (new Date()) + "\n\n");    // 消息体
	
			// 发送消息体
	    interval = setInterval(function() {
	    	
	      res.write("id:"+msgId+"\n");				          // 消息ID
		 	 	res.write("retry: 10000\n");				          // retry时间
		  	res.write("data: " + (new Date()) + "\n\n");  // 消息体
	    
	    }, 1000);
	    
	    // 关闭连接
	    req.connection.addListener("close", function () {
	      clearInterval(interval);
	    }, false);
	    
	    
	  } else if (fileName === index) {
	  	
	  	// 返回页面
	    fs.exists(fileName, function(exists) {
	      if (exists) {
	        fs.readFile(fileName, function(error, content) {
	          if (error) {
	            res.writeHead(500);
	            res.end();
	          } else {
	            res.writeHead(200, {"Content-Type":"text/html"});
	            res.end(content, "utf-8");
	          }
	        });
	      } else {
	        res.writeHead(404);
	        res.end();
	      }
	    });
	  } else {
	    res.writeHead(404);
	    res.end();
	  }

}).listen(80, "127.0.0.1");
console.log("Server running at http://127.0.0.1:80/");