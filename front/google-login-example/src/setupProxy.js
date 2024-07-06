const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/verify_token",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    )
};
