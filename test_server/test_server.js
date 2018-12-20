#!/usr/bin/env node

let port=process.env.PORT||4000;

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static('public'));

app.listen(port);

console.info(`Listening on port ${port}`);
