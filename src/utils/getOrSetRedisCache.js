const redisClient = require("../db/redis");

const getOrSetRedisCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (err, cacheData) => {
            if (err) return reject(err);
            if (cacheData != null) return resolve(JSON.parse(cacheData));
            const freshData = await cb();
            await redisClient.setex(key, 1800, JSON.stringify(freshData));
            resolve(freshData);
        });
    });
};

module.exports = {
    getOrSetRedisCache,
};
