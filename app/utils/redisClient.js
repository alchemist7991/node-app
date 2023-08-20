const redis = require('redis');
const util = require('util');

const REDIS_HOST = process.env.REDIS_HOST || redis_server;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisUrl = `redis://${process.env.REDIS_HOST}:${REDIS_PORT}`;

const client = redis.createClient({
  url: redisUrl,
  legacyMode: true,
})

client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
client.on("error", (error) => console.error(error))

// promisify redis methods
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);
client.setex = util.promisify(client.setex);

module.exports = client;