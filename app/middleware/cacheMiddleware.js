const client = require('../utils/redisClient')

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
