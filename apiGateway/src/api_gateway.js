// api_gateway.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;
const { rateLimitMiddleware, requestCounts } = require('./ratelimit');
app.use(rateLimitMiddleware);

// Middleware to log client IP address
app.use((req, res, next) => {
    console.log(`Client IP: ${req.ip}`);
    next();
});

// Apply the rate limiter to all routes

// Create proxy middleware for services
const service1Proxy = createProxyMiddleware({
    target: 'http://localhost:3001', // URL of Service 1
    changeOrigin: true,
});

const service2Proxy = createProxyMiddleware({
    target: 'http://localhost:3002', // URL of Service 2
    changeOrigin: true,
});

// Routes
app.use('/api/service1', service1Proxy);
app.use('/api/service2', service2Proxy);

// Test endpoint for checking rate limit
app.get('/api/check-rate-limit', (req, res) => {
    res.send(`Response from API. Request count: ${requestCounts[req.ip]}`);
});

// Start the server
app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
