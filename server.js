const Sentry = require('@sentry/node');
Sentry.init({
  dsn: 'https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884',
});

// Express server setup
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { port } = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  // Allow isomorphic requests
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Include cookies in the requests sent to the API (sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // onward
  next();
});

// Connect to Kbucket
const KBucketClient = require('@magland/kbucket').KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({
  share_ids: ['spikeforest.spikeforest1'],
});
kbclient.setPairioConfig({
  collections: ['spikeforest'],
});

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// Serve up client files
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`🖥️  Server listening on port ${port}`));
