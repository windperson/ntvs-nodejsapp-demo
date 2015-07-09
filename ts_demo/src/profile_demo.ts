/// <reference path="../Scripts/typings/tsd.d.ts" />
/// <reference path="HttpMiscUtil.ts" />
import http = require('http');
import spinModule = require('./Profile_Demo/SpinFunc');

import HttpMiscUtil = require('./HttpMiscUtil');
import Favicon = HttpMiscUtil.HandleHttpMisc.Favicon;
import NormalText = HttpMiscUtil.HandleHttpMisc.NormalText;

var n = 0;
var port: number = process.env.port || 1337;
http.createServer(function (req: http.ServerRequest, res: http.ServerResponse) {

    if (req.url === Favicon.faviconURL) {
        res.writeHead(Favicon.HttpCode, Favicon.MIME);
        res.end();
        return;
    }

    res.writeHead(NormalText.HttpCode, NormalText.MIME);
    var s1 = 0, s2 = 0, s3 = 0;
    s1 = spinModule.spin(1000000);
    s2 = spinModule.spin(3000000);
    s3 = spinModule.spin(6000000);

    res.end(' n=' + n++ + ' s1=' + s1 + ' s2=' + s2 + ' s3=' + s3);

}).listen(port);