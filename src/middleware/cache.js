const redisClient = require('../config/redis');

const cache = async (req, res, next) => {
    const key = req?.originalUrl || req?.url;
    try {
        const data = await redisClient.get(key);
        if (data) {
            console.log("Cache hit for", key);
            return res.json(JSON.parse(data));
        }
        console.log("Cache miss for", key);
        // Override res.json to cache the response data
        res.sendResponse = res.json;
        res.json = (body) => {
            redisClient.setEx(key, 
                process.env.CACHE_EXPIRATION || 10, 
                JSON.stringify(body));
            res.sendResponse(body);
        };
        next();
    } catch (error) {
        console.log("Redis error:", error);
        next();
    }
};

module.exports = cache;