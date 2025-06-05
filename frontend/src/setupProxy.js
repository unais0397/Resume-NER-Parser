"use strict";
var createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
module.exports = function (app) {
    app.use('/minedata', createProxyMiddleware({
        target: 'http://127.0.0.1:8002',
        changeOrigin: true,
    }));
};
