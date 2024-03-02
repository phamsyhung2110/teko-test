// ratelimit.js

const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible');
const Redis = require('ioredis');

let redisClient;

try {
    redisClient = new Redis();
} catch (error) {
    console.error('Error initializing Redis client:', error);
    process.exit(1); // Exit the process if Redis client initialization fails
}

// Track request counts in memory (for demonstration purposes)
const requestCounts = {};

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate-limiter',
    points: 10,
    duration: 1000 * 60 * 60,
});

const rateLimitMiddleware = (req, res, next) => {
    const clientIp = req.ip;

    // Increment request count for the client IP
    requestCounts[clientIp] = (requestCounts[clientIp] || 0) + 1;

    console.log(`Request count for ${clientIp}: ${requestCounts[clientIp]}`);

    
    try {
        rateLimiter.consume(clientIp)
            .then(() => {
                res.send('Consume successful');
                next();
            })
            .catch(() => {
                res.status(429).send('Rate limit exceeded');
            });
    } catch (error) {
        // Handle Redis client errors
        console.error('Redis client error:', error);
        res.status(500).send('Internal Server Error');
    }
};





module.exports = { rateLimitMiddleware, requestCounts };
