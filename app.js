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

  const findDocuments = function(db, callback) {
    scores.find().sort({score : 1}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      var data = JSON.parse(docs)
      console.log(data.name);

    });
  }
  findDocuments();

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
    const score = req.query.score;
    const clicks = req.query.clicks;
    const time = req.query.time;

    res.send("Name " + name + " Score: " + score + " Clicks: " + clicks + " Time: " + time);

    scores.insertOne(
      {name : name, score : score, clicks : clicks, time : time}
    );
  });

  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.listen(8080);
  console.log('listening on port 8080')
});
