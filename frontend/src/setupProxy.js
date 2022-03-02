const { createProxyMiddleware } = require('http-proxy-middleware');

const rewriteFn = function (path, req) {
    return path.replace(/\/proxy\/[^\/]+/gm, '');
};

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `http://${process.env.REGISTRY}`,
            changeOrigin: true,
        })
    );


    app.use(
        '/proxy',
        createProxyMiddleware({
            changeOrigin: true,
            router: function (req) {
                const { originalUrl } = req
                const regex = /\/proxy\/([^\/]+)(.*)/gm;

                matches = regex.exec(originalUrl)

                console.log(`http://${matches[1]}${matches[2]}`)

                return `http://${matches[1]}`
            },
            pathRewrite: rewriteFn
        })
    );
};