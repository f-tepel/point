const fs = require('fs');
const http = require('http');
const express = require('express');
var path = require('path');

var app = express();

fs.readFile('views/pages/main.html', (err, html) => {
  app.get('/main', function (req, res) {
    res.send(html.toString());
  });
});
fs.readFile('views/pages/game.html', (err, html) => {
  app.get('/game', function (req, res) {
    res.send(html.toString());
  });
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(8080);
