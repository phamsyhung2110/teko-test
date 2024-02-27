const Redis = require('ioredis');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');

// const redisClient = new Redis();
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 100, // limit each IP to 100 requests per windowMs
    // store: new RedisStore({
    //     client: redisClient,
    //     prefix: 'ratelimit:',
    // }),
});

module.exports = limiter 
