var point = document.getElementById('point');
var info =  document.getElementById('info');
var score = document.getElementById('score');
var currentScore = 0;
var time = 3000;
var clicks = 0;
var timer;
var $timer = $("#timer");
var currentTime;
var endTime;

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
  currentScore -= gameTime;
  info.style.display = "flex";

  document.getElementById('time').innerHTML = "Quickest time: " + time + "ms";
  document.getElementById('clicks').innerHTML = "Total clicks: " + clicks;
  document.getElementById('scoreResult').innerHTML = "Score: " + currentScore + "XP";
}

function playAgain() {
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
  var parameters = { name: $('#name').val(),
                     score: currentScore,
                     clicks: clicks,
                     time: time
                    };
  $.get('/saveUser', parameters, function(data) {
    var dHigher = data.rank + 2;
    var dLower = data.rank - 1;

    for (var h = 0; h < data.higher.length; h++) {
      addItem(data.higher[h], dHigher);
      dHigher--;
    }
    addItem(parameters, data.rank);
    for (var h of data.lower) {
      addItem(h, dLower);
      dLower--;
    }
  });
};

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
      document.getElementById('stats').appendChild(tr);
      rank++;
    }
  });
};
