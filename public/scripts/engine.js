var point = document.getElementById('point');
var info =  document.getElementById('info');
var score = document.getElementById('score');
var currentScore = 0;
var time = 3000;
var clicks = 0;
var timer;
var $timer = $("#timer");

function move() {
  if(clicks == 0) {
    timer = setTimeout(startTimer, time);
  } else {
    clearTimeout(timer);
    timer = setTimeout(startTimer, time);
  }
  currentScore += 100;
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
  $.get('/saveUSER', parameters, function(data) {
    for (var i = 0; i < data.length; i++) {
      addItem(data[i], i);
    };
  });
};

function addItem(data, i) {
  var tr = document.createElement('tr');

  tr.className = 'singleStat';

  tr.innerHTML = '<td>' + (i + 1) + '</td><td>' + data.name + '</td><td>' + data.score + '</td>'
  document.getElementById('stats').appendChild(tr);
}
