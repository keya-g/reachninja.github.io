document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var handRadius = 10;
var handX = canvas.width / 2;
var handY = canvas.height / 2;
var obstaclecount = 1
var gameshape = [canvas.height, canvas.width]
ctime = getTimeS();
expl = 0.33
var targets = new Array();
// var targets = new obstacles(gameshape, ctime, expl)


for(let c=0; c<obstaclecount; c++) {
    targets.push(new obstacles(gameshape, ctime, expl));
    console.log(targets[c].loc)
}



function draw() {
    drawBG()    // Make background black and white - from other script
    drawHand()  // Draw the hand marker
    for(let c=0; c<obstaclecount; c++){
        ctime = getTimeS();
        console.log(targets[c].loc)
        targets[c].updatePosition(ctime, [handX,handY], 10, 1000);
        console.log(targets[c].loc)
        if (!targets[c].inframe){
            targets[c] = new obstacles(gameshape, ctime, expl);
        }

        drawMarker(targets[c])
    }
}

function drawMarker(target){
    ctx.beginPath();
    ctx.arc(target.loc[0], target.loc[1], target.radius, 0, Math.PI*2);
    if (target.obstacle_type == "Exploding"){
        ctx.fillStyle =  "black";
    }
    else{ctx.fillStyle =  "blue";}
    // ctx.fillStyle =  "blue";
    ctx.fill();
    ctx.closePath();
}

function drawHand(){
    ctx.beginPath();
    ctx.arc(handX, handY, handRadius, 0, Math.PI*2);
    ctx.fillStyle =  "red";
    ctx.fill();
    ctx.closePath();
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.width) {
        handX = relativeX;
        handY = relativeY;
    }
}


var interval = setInterval(draw, 1);

// draw()
// setTimeout(function(){ console.log("Next step"); draw();}, 2000);
// setTimeout(function(){ console.log("Next step"); draw();}, 2000);
// setTimeout(function(){ console.log("Next step"); draw();}, 2000);
// setTimeout(function(){ console.log("Next step"); draw();}, 2000);
// setTimeout(function(){ console.log("Next step"); draw();}, 2000);












