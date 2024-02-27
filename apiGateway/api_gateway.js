const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;
const limiter = require('./ratelimit');


// Apply the rate limiter to all routes
app.use(limiter);

// Create proxy middleware for services
const service1Proxy = createProxyMiddleware({
    target: 'http://localhost:3001', // URL of Service 1
    changeOrigin: true,
});

const service2Proxy = createProxyMiddleware({
    target: 'http://localhost:3002', // URL of Service 2
    changeOrigin: true,
});

// Middleware to log client IP address
app.use((req, res, next) => {
    console.log(`Client IP: ${req.ip}`);
    next();
});

// Routes
app.use('/api/service1', service1Proxy);
app.use('/api/service2', service2Proxy);

// Start the server
app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
