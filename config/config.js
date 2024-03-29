module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongodb",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    REDIS_URL: process.env.REDIS_URL || "redisdb",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET
}