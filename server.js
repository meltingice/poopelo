const fetch = require('node-fetch');
const redis = require('redis');
const express = require('express');

const redisClient = redis.createClient({ url: process.env.REDIS_URL || "redis://127.0.0.1:6379" });
const app = express();

const CMG_ENDPOINT = "https://cmgcharleston.com/wp-json/wp/v2/posts?categories=106&per_page=3";

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/latest', (req, res) => {
  redisClient.get('post_cache', (err, data) => {
    if (data === null) {
      fetch(CMG_ENDPOINT)
        .then(resp => resp.json())
        .then(json => {
          redisClient.set('post_cache', JSON.stringify(json), 'EX', 600);
          res.json(json)
        });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});
