import redis from "../redis/redisClient";

/**
 * Store a value in Redis with an optional TTL
 * @param key
 * @param value
 * @param ttl
 */
export const storeValue = async (key, value, ttl) => {
    try {
        if (ttl) {
            await redis.set(key, value, { ex: ttl});
        } else {
            await redis.set(key, value);
        }
    } catch (error) {
        console.error("Error storing value in Redis:", error);
    }
}

export const getValue = async (key) => {
    return await redis.get(key);
}

export const deleteValue = async (key) => {
    return await redis.del(key);
}

