const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const PORT = process.env.PORT || 5000;

// Use connect method to connect to the server loccal
//MongoClient.connect("mongodb://localhost:27017", function (err, client) {

//Use connect method to connect to the server online
MongoClient.connect("mongodb://heroku_h7xk0tmx:em7skah8t4vlj4tfmd10efda68@ds247077.mlab.com:47077/heroku_h7xk0tmx", function (err, client) {
  if(err) throw err;

  const points = client.db('heroku_h7xk0tmx');
  const scores = points.collection('scores');

  scores.insertOne({name: "Felix", score: 9000, clicks: 3, time: 3000})

  fs.readFile('views/pages/main.html', (err, html) => {
    app.get('/', function (req, res) {
      res.send(html.toString());
    });
  });

  fs.readFile('views/pages/game.html', (err, html) => {
    app.get('/game', function (req, res) {
      res.send(html.toString());
    });
  });

  app.get('/saveUser', function(req, res){
    let objId;
    let rank;
    var newInsert = {
      name: req.query.name,
      score: parseInt(req.query.score),
      clicks: parseInt(req.query.clicks),
      time: req.query.time
    };

    scores.insertOne(newInsert, function(err, docsInserted) {
      if (err) throw err;

      objId = newInsert._id;
      scores.find().sort({score: -1}).toArray(function(err, allScores) {
        if (err) throw err;

        for (var i = 0; i < allScores.length; i++) {
          console.log(i + " " + objId)
          if(allScores[i]._id.toString() == objId.toString()) {
            rank = i;
          }
        }
        scores.find({ score: { $gt: newInsert.score } } ).sort({score : 1}).limit(2).toArray(function(err, higher) {
          if (err) throw err;

          scores.find({ score: { $lt: newInsert.score } } ).sort({score : -1}).limit(2).toArray(function(err, lower) {
            if (err) throw err;

            res.send({
              lower: lower,
              higher: higher,
              rank: rank
            });
          });
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

  app.listen(PORT);
  console.log('listening on port ' + PORT)
});
