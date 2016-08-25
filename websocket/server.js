// Socket服务器
var ws = require("nodejs-websocket");

var server = ws.createServer(function(conn){
	
    conn.on("text", function (str) {
        console.log("Client Request:"+str);
        console.log("Server Response:"+str);
        conn.sendText(str)
    })
    
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
    
}).listen(8001);

console.log("WebSocket Server => ws://127.0.0.1:8001");


// Http服务器
var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
	  var index = "./index.html";
	  var fileName;
	  var interval;
	
	  if (req.url === "/")
	    fileName = index;
	  else
	    fileName = "." + req.url;
	
	  if (fileName === index) {
	  	
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

}).listen(8000, "127.0.0.1");
console.log("HTTP Server => http://127.0.0.1:8000/");