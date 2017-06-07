const fetch = require('node-fetch');
const express = require('express');

const app = express();

const CMG_ENDPOINT = "https://cmgcharleston.com/wp-json/wp/v2/posts?categories=106&per_page=3";

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/latest', (req, res) => {
  fetch(CMG_ENDPOINT)
    .then(resp => resp.json())
    .then(json => res.json(json));
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});
