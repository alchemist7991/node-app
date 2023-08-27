const client = require('../utils/redisClient')
const redisConstants = require('../constants/redis');

exports.userCache = async function (req, res, next) {
  try {
    const cache_data = await client.get(req.params.username);
    if (cache_data)
      return res.status(200).json(JSON.parse(cache_data));
    else
      next();
  } catch (error) {
      console.log(error)
  }
}

exports.usersCache = async function (req, res, next) {
  try {
    if (req.path.includes('getAll')) {
      const cachedData = await client.get(redisConstants.keys.ALL_USERS);
      if(!!cachedData) {
        console.log('Cache hit - all users');
        return res.status(200).json(JSON.parse(cachedData)); // [TODO] show max of 100 users
      }
    }
    if (req.path.match(/(v1\/user\/[0-9])/)) {
      const userId = req.params.id;
      const cachedData = await client.hget(redisConstants.keys.USER_SET, userId);
      if(!!cachedData) {
        console.log(`Cache hit - userId:${userId}`);
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
  } catch (e) { console.error(`Failed to retrieve data from Redis: ${e}`) }
  next();
}
