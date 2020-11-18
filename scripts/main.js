
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var testarray = [[3,6,7],[3,4,7]];
console.log(testarray[1][1])

var gameshape = [gameCanvas.width, gameCanvas.height];
ctime = getTimeS();
damping = 0;
mirror = false;
var newplayer = new player(gameshape, damping, mirror);
document.addEventListener("mousemove", mouseMoveHandler, false);

var game_object = new game();





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
    // newX = 0; newY = 0;
    if(relativeX > 0 && relativeX < gameCanvas.width) {
        newX = relativeX;
        // newY = relativeY;
    }
    if(relativeY > 0 && relativeY < gameCanvas.height) {
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
var tracking_type = "Mouse";
game_object.startrun()

function rungame(){
    game_object.player.loc = newplayer.loc;
    if (game_object.game_mode == null){
        game_object.game_mode = 'StartPlay';
    }

    game_object.run();
}

function resetDisplaySize(){
    window_width = window.innerWidth;
    window_height = window.innerHeight;

    style_line = "z-index:1; width: " + (window_width - gameCanvas.width)/2   + "px; height:" + gameCanvas.height + "px;";
    scoreCanvas.setAttribute("style", style_line);
    timeCanvas.setAttribute("style", style_line);
    // gameshape = [display_width, display_height];
    // style_line = "z-index:2; position:absolute; top:" +   + "; left:"  +  ;
    // sbutton.setAttribute("style",style_line);
    // with(sbutton.style) {
    //     var val = ((window_width - display_width)/4 - sbutton.clientWidth/2);
    //     left = val + "px" ;
    //     // console.log(sbutton.clientHeight, left);
    //     val = (display_height/2 - sbutton.clientHeight/2);
    //     top = val + "px";
    // }
}

resetDisplaySize()
var interval = setInterval(rungame,1);

// rungame()

// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);
// setTimeout(function(){ console.log("Next step"); game_object.run();}, 2000);












