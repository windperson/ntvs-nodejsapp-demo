import Hello = require('./Respond/HelloMessage');
import http = require('http');
var port: number = process.env.port || 1337;
http.createServer(function (req: http.ServerRequest, res: http.ServerResponse) {
    var msg: Hello.HelloMessage = new Hello.HelloMessage();
    res.writeHead(200, { 'Content-Type': msg.ContentType });
    res.end(msg.Content);
}).listen(port);