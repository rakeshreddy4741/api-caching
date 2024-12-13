const redis = require('redis');

// Create Redis client
const client = redis.createClient({
    socket: {
        reconnectStrategy: false 
    }
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = client;