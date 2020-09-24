var canvas = document.getElementById("circle");
var ctx = canvas.getContext("2d");
const params = new URLSearchParams(window.location.search)
var n = getOrDefault(params, "n", 10)
var numberOfSteps = getOrDefault(params, "stepNumber", 500) * 2
var circleRadius = getOrDefault(params, "radius", 10)
var saturation = getOrDefault(params, "saturation", 100)
var lightness = getOrDefault(params, "lightness", 50)
var startHue = parseInt(getOrDefault(params, "startHue", 0))
var endHue = parseInt(getOrDefault(params, "endHue", 359))
var showLines = params.has("showLines")
var showOuterCircle = params.has("showOuterCircle")
angle = 0
angleStep = Math.PI/numberOfSteps
var oldRadius = 0
var lines = []
setInterval(draw, 10)

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = canvas.width
    var height = canvas.height
    var center = [width/2, height/2]
    var radius = Math.min(center[0], center[1])
    ctx.clearRect(0, 0, width, height);
    if (radius != oldRadius) {
        lines = getListOfLines(radius, n, center)
        oldRadius = radius
    }
    if (showLines) {
        lines.forEach(line => drawLine(line[0], line[1]))
    }
    var circlePos = getLinePostOffset(radius, angle)
    if (showOuterCircle) {
        ctx.beginPath()
        ctx.fillStyle = "FF0000";
        var canvasCircle = worldToCanvas(circlePos, center)
        ctx.arc(canvasCircle[0], canvasCircle[1], circleRadius, 0, Math.PI*2)
        ctx.fill();
        ctx.closePath();
    }
    lines.forEach(line=> drawCircle(angle, radius, line[2], center))
    angle -= angleStep
    ctx.beginPath();
    ctx.fillStyle = "FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawCircle(circleAngle, radius, lineAngle, center) {
    var angle = circleAngle - lineAngle
    angleCos = Math.cos(angle)
    var scale = radius * angleCos
    var circle = getLinePostOffset(scale, lineAngle)
    var circlePos = worldToCanvas(circle, center)
    ctx.beginPath()
    var t = (angleCos + 1)/2
    var hue = startHue + t * (endHue - startHue)
    ctx.fillStyle = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)'
    ctx.arc(circlePos[0], circlePos[1], circleRadius, 0, Math.PI*2)
    ctx.fill();
    ctx.closePath();
}
function worldToCanvas(worldCoor, center) {
    return [center[0] + worldCoor[0], center[1] + worldCoor[1]]
}

function getLinePostOffset(radius, angle) {
    return [radius * Math.cos(angle), radius * Math.sin(angle)]
}

function getListOfLines(radius, n, center) {
    var result = []
    var i = 0
    for (i = 0; i < n; i++) {
        var angle = Math.PI/n * i;
        var startPoint = getLinePostOffset(radius, angle)
        var endPoint = [-startPoint[0], -startPoint[1]]
        var canvasStart = worldToCanvas(startPoint, center)
        var canvasEnd = worldToCanvas(endPoint, center)
        result.push([canvasStart, canvasEnd, angle])
    }
    return result
}

function drawLine(startPoint, endPoint) {
    ctx.beginPath()
    ctx.moveTo(startPoint[0], startPoint[1])
    ctx.lineTo(endPoint[0], endPoint[1])
    ctx.stroke()
    ctx.closePath()
}

function getOrDefault(params, arg, defaultVal) {
    if (params.has(arg)) {
        return params.get(arg)
    }
    return defaultVal
}