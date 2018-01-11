function addScoreAnimation() {
  var add = document.getElementById('addScore');
  add.style.top = '3em';
  add.style.opacity = 1;
  $('#addScore').animate({
    opacity: '0',
    top: '1em'
  }, 500);
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
