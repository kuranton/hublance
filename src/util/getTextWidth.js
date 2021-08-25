export function getTextWidth (text, font) {
  // re-use canvas object for better performance
  console.log(window.measureTextCanvas)
  var canvas = window.measureTextCanvas || (window.measureTextCanvas = document.createElement('canvas'))
  var context = canvas.getContext('2d')
  context.font = font
  var metrics = context.measureText(text)
  console.log(metrics)
  return metrics.width
}
