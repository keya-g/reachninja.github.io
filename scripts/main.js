
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var testarray = [[3,6,7],[3,4,7]];
console.log(testarray[1][1])

// var handRadius = 10;
// var handX = gameCanvas.width / 2;
// var handY = gameCanvas.height / 2;
var obstaclecount = 1
var gameshape = [gameCanvas.height, gameCanvas.width]
ctime = getTimeS();
expl = 0.33
var targets = new Array();

damping = 0;
mirror = false;
var newplayer = new player(gameshape, damping, mirror);
document.addEventListener("mousemove", mouseMoveHandler, false);

var game_object = new game();


// for(let c=0; c<obstaclecount; c++) {
//     targets.push(new obstacles(gameshape, ctime, expl));
//     console.log(targets[c].loc)
// }





function draw() {
    drawBG()    // Make background black and white - from other script
    drawHand(newplayer)  // Draw the hand marker
    for(let c=0; c<obstaclecount; c++){
        ctime = getTimeS();
        console.log(targets[c].loc)
        targets[c].updatePosition(ctime, [newplayer.loc[0],newplayer.loc[1]], 10, 1000);
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

function drawHand(player){
    ctx.beginPath();
    ctx.arc(player.loc[0], player.loc[1], player.radius, 0, Math.PI*2);
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
    var relativeX = e.clientX - gameCanvas.offsetLeft;
    var relativeY = e.clientY - gameCanvas.offsetTop;
    if(relativeX > 0 && relativeX < gameCanvas.width) {
        newX = relativeX;
        newY = relativeY;
    }

    curr_time = getTimeS();
    // console.log(newX,newY);
    newplayer.updatePosition([newX,newY], curr_time);
    // console.log(newplayer.loc);
    var mouse_loc = [newX, newY];
    return mouse_loc;
}


// var interval = setInterval(draw, 1);

game_object.startrun()

function rungame(){
    game_object.player.loc = newplayer.loc;
    game_object.run();
}

var interval = setInterval(rungame,1);

// rungame()

// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);












