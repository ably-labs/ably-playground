const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Ably = require('ably');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/createTokenRequest', (req, res) => {
  console.log('request');
  const client = new Ably.Realtime(process.env.ABLY_API_KEY);
  client.auth.createTokenRequest({ clientId: 'ably-playground' }, function(error, token) {
    res.status(200).json(token);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
