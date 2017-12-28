var svg = document.querySelector('#ball');

verticalBounce();

function verticalBounce() {
  // We animate the two elements (svg, pin) independently
  dynamics.animate(svg, {
    scaleY: 0.8,
    translateY: -60
  }, {
    type: dynamics.forceWithGravity,
    duration: 800,
    bounciness: 400
  })

  setTimeout(function () {
    verticalBounce();
  }, 1000)
}
