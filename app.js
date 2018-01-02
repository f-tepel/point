const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Use connect method to connect to the server
MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if(err) throw err;
  console.log("Hello World")
  const points = client.db('points')
  const customers = points.collection('customers')
  console.log("Collection created!");

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

  app.get('/searching', function(req, res){
    const name = req.query.name;
    const score = req.query.score;
    const clicks = req.query.clicks;
    const time = req.query.time;

    res.send("Name " + name + " Score: " + score + " Clicks: " + clicks + " Time: " + time);
  });

  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.listen(8080);
  console.log('listening on port 8080')
});
