const Redis = require('ioredis');

const redis = new Redis({
  port: 6379,
  host: 'localhost',
});

(async () => {
  try {
    const keys = await redis.keys('*');

    if (keys.length === 0) {
      console.log('No keys found in Redis.');
    } else {
      for (const key of keys) {
        const value = await redis.get(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
    }
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  } finally {
    await redis.quit(); // Close the Redis connection
  }
})();
