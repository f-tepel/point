var point = document.getElementById('point');
var info =  document.getElementById('info');
var score = document.getElementById('score');
var currentScore = 0;
var time = 3000;
var totalScore = 0;
var clicks = 0;
var timer;
var $timer = $("#timer");
var currentTime;
var endTime;
var saveStatsCount = 0;

function move() {
  if(clicks == 0) {
    timer = setTimeout(startTimer, time);
    var date = new Date();
    currentTime = parseInt(date.getTime());
  } else {
    clearTimeout(timer);
    timer = setTimeout(startTimer, time);
  }
  currentScore += 3000;
  score.innerHTML = "Your score: " + currentScore + "XP";

  stopTimerAnimation();
  startTimerAnimation();
  var x = Math.floor((Math.random() * 90) + 1);
  var y = Math.floor((Math.random() * 75) + 1);

  point.style.position = "absolute";
  point.style.left = x + "vw";
  point.style.top = y + "vh";

  clicks++;
}

function startTimerAnimation() {
  $timer.animate({
    width: "0"
  }, time);
  time -= 50;

}

function stopTimerAnimation() {
  $timer.stop().animate({
    width: "60vw"
  }, 100);
}

function startTimer() {
  var date = new Date();
  endTime = parseInt(date.getTime());
  var gameTime = endTime - currentTime;
  totalScore = currentScore - gameTime;
  info.style.display = "flex";

  document.getElementById('scoreResult').innerHTML = currentScore;
  document.getElementById('time').innerHTML = "- " + gameTime;
  document.getElementById('total').innerHTML =  totalScore;
}

function playAgain() {
  saveStatsCount = 0;
  totalScore = 0;
  var stats = document.getElementById("stats");
  stats.innerHTML = '';

  time = 3000;
  clicks = 0;
  currentScore = 0;

  score.innerHTML = "Your score: " + currentScore + "XP";

  info.style.display = "none";
  point.style.margin = "auto";
  point.style.position = "static";
}

function saveStats() {
  document.getElementById('error-none').style.display = "none";
  document.getElementById('error-max').style.display = "none";

  if(saveStatsCount == 0) {
    var name = $('#name').val();
    if(name) {
      if(name.length < 13)
        var parameters = {
          name: name,
          score: totalScore,
          clicks: clicks,
          time: time
        };
        $.get('/saveUser', parameters, function(data) {
          var dHigher = data.rank - 2;
          var dLower = data.rank + 1;

          for (var h = 0; h < data.higher.length; h++) {
            addItem(data.higher[h], dHigher);
            dHigher++;
          }
          addItem(parameters, data.rank);
          for (var h of data.lower) {
            addItem(h, dLower);
            dLower++;
          }
        });
        saveStatsCount++;
      } else {
        document.getElementById('error-max').style.display = "block";
      }
    } else {
      document.getElementById('error-none').style.display = "block";
    }
  }


function addItem(data, rank) {
  console.log('adding item:', data, rank);
  var tr = document.createElement('tr');

  tr.className = 'singleStat';

  tr.innerHTML = '<td>' + rank + '</td><td>' + data.name + '</td><td>' + data.score + '</td>'
  document.getElementById('stats').appendChild(tr);
}

function showTop() {
  $.get('/showTop', function(data) {
    var stats = document.getElementById("stats");
    stats.innerHTML = '';
    var rank = 1;

    for(var h of data) {
      var tr = document.createElement('tr');
      tr.className = 'singleStat';
      tr.innerHTML = '<td>' + rank + '</td><td>' + h.name + '</td><td>' + h.score + '</td>'
      document.getElementById('topStats').appendChild(tr);
      rank++;
    }
  });
};
