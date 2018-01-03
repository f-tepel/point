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

  const points = client.db('points');
  const scores = points.collection('scores');

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

  app.get('/saveUser', function(req, res){
    const name = req.query.name;
    const score = parseInt(req.query.score);
    const clicks = parseInt(req.query.clicks);
    const time = req.query.time;

    scores.insertOne(
      {name : name, score : score, clicks : clicks, time : time}
    );

    //const allScores = scores.find().sort({score : 1}).toArray();

    scores.find({ score: { $gt: score } } ).sort({score : 1}).limit(2).toArray(function(err, higher) {
      if (err) throw err;

      scores.find({ score: { $lt: score } } ).sort({score : -1}).limit(2).toArray(function(err, lower) {
        if (err) throw err;

        res.send({
          lower: lower,
          higher: higher
        });
      });
    });
  });

  app.get('/showTop', function (req, res) {
    scores.find().sort({score : -1}).limit(10).toArray(function(err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.listen(8080);
  console.log('listening on port 8080')
});
