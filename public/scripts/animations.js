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

  // Use the delay option to delay your animations
  //dynamics.animate(pin, {
  //  translateY: -60
  // }, {
  //   type: dynamics.forceWithGravity,
  //   bounciness: 0,
  //   duration: 500,
  //   delay: 150
  // })
  //
  // dynamics.animate(svg, {
  //   scaleY: 0.8
  // }, {
  //   type: dynamics.bounce,
  //   duration: 800,
  //   bounciness: 600,
  //   delay: 650,
  //   complete: horizontalBounce
  // })
}
