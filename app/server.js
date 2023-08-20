const express = require('express');
const morgan = require('morgan');
const axios = require('axios')
const cache = require('./middleware/cacheMiddleware');
const redisClient = require('./utils/redisClient');

const app = express();


const PORT = process.env.PORT || 8000
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(require('./routes'));

app.get('/welcome', (req, res) => {
    res.send('Welcome');
});

app.get('/cacheTest/:username', cache.userCache, async (req, res) => {
  try {
    const username = req.params.username
    const api = await axios.get(`https://jsonplaceholder.typicode.com/users/?username=${username}`)
    await redisClient.setex(username, 1440, JSON.stringify(api.data))
    return res.status(200).json(api.data)
  } catch (error) {console.log(error)}
});


app.listen(PORT, () => {
    console.log(`Server up on PORT:${PORT}`);
})
