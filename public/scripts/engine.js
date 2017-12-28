var point = document.getElementById('point');
var info =  document.getElementById('info');
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
  info.style.background = "grey";
  info.style.display = "block";

  document.getElementById('time').innerHTML = "Your time: " + time;
  document.getElementById('clicks').innerHTML = "Total clicks " +clicks;

  time = 3000;
}
