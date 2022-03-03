export function drawLine(startingPoint, controlPoint, endPoint, ctx) {
  ctx.beginPath()
  ctx.moveTo(startingPoint.x, startingPoint.y)
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
  ctx.stroke()
  ctx.closePath()
}
