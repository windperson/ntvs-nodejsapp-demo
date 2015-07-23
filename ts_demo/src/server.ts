/// <reference path="../Scripts/typings/tsd.d.ts" />
/// <reference path="HttpMiscUtil.ts" />
import http = require('http');
import HttpMiscUtil = require('./HttpMiscUtil');
import Favicon = HttpMiscUtil.HandleHttpMisc.Favicon;

import Hello = require('./Respond/HelloMessage');
var port: number = process.env.port || 1337;
http.createServer(function (req: http.ServerRequest, res: http.ServerResponse) {

    if (req.url === Favicon.faviconURL) {
        res.writeHead(Favicon.HttpCode, Favicon.MIME);
        res.end();
        return;
    }

    var msg: Hello.HelloMessage = new Hello.HelloMessage();
    res.writeHead(200, { 'Content-Type': msg.ContentType });
    res.end(msg.Content);
}).listen(port);