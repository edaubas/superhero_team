
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/api/user',
        createProxyMiddleware({
            target: 'http://challenge-react.alkemy.org',
            pathRewrite: {
                "^/api/user": ""
            },
            changeOrigin: true
        })
    );
    app.use(
        '/api/hero',
        createProxyMiddleware({
            target: 'https://superheroapi.com/api',
            pathRewrite: {
                "^/api/hero": ""
            },
            changeOrigin: true
        })
    );

}