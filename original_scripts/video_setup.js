
// Following code lets you get video data from camera device as per constraints and display to the video tag. 
// (https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
var video = document.getElementById("videoInput"); // video is the id of video tag
// var gameCanvas = document.getElementById("gameCanvas");
var lcanvas = document.getElementById("leftCanvas");
var rcanvas = document.getElementById("rightCanvas");

var elem = document.documentElement;
var instr_box = document.getElementById("instructions");
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
elem.addEventListener('keypress', keypressed);


// var gameshape = [gameCanvas.height, gameCanvas.width]
// var game_object = new game();

var context = gameCanvas.getContext("2d");
var streaming = false;
var window_width = window.innerWidth;
var window_height = window.innerHeight;
var display_width = window.innerWidth;
var display_height = window.innerHeight;
var gameshape = null;
var tracking_type = "Video";


navigator.mediaDevices.getUserMedia({ video: true, audio: false })

    .then(function(stream) {
        video.srcObject = stream;
        video.play();
        streaming = true;
        // openFullscreen();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });


var cv_built = false;
var cap = null;
const FPS = 60;
var pointX = 0;
var pointY = 0;
var actual_height = 0;
var actual_width = 0;

var pointcX = 0;
var pointcY = 0;

var lower = [145, 67, 20, 0];
var upper = [165, 67, 20, 255];
var mom = null;

var game_object = null;

var red_width = 600;    // This is the reduction in image size done to speed up blob tracking; higher value => more pixels to search, higher accuracy but lower speed; and vice versa



cv['onRuntimeInitialized']=()=>{
    console.log(cv.getBuildInformation());
    cv_built = true;
    center = new cv.Point([0,0]);
};

function deletevar(variable){
    try{
        variable.delete();
    }catch{}
}

var fontBase = 100,                   // selected default width for canvas
    fontSize = 20;                     // default size for font

function getFont(canvas) {
    var ratio = fontSize / fontBase;   // calc ratio
    var size = canvas.width * ratio;   // get font size based on current width
    return (size|0) + 'px Arial'; // set font
}

function processVideo() {

    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
    
    // start processing.
    cap.read(src);
    // cv.imshow('gameCanvas', src);
        // console.log(cap.get(CAP_PROP_FRAME_WIDTH ));
    cv.flip(src, src, 1);

    
    new_width = red_width;  // This value is set above
    new_height = actual_height*red_width/actual_width; //actual_height*perc_red/100;
    cv.resize(src, src, new cv.Size(new_width,new_height), 0, 0, cv.INTER_LINEAR);


    var center = new cv.Point(pointcX, pointcY);
    let dst = src.clone();
    // cv.circle(dst, center, 1, [200,255,0,255], 15);
    cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
    [dst, center, ...rest] = blobdetect(src, dst, hsv);

    cv.resize(dst, dst, new cv.Size(actual_width,actual_height), 0, 0, cv.INTER_LINEAR);

    // arraypt = scaleArray(arraypt, window_width/red_width);
    // arraypt[0] = window_width - arraypt[0];
    // console.log(center)
    cv.imshow('gameCanvas', dst);
    src.delete();
    dst.delete();
    hsv.delete();
}



function blobdetect(src, dst, hsv){
    var low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), lower);
    var high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), upper);
    var mask = hsv.clone();
    var contours = new cv.MatVector();
    var hierarchy = new cv.Mat();
    var arraypt = [actual_width/2,actual_height/2];
    
    cv.inRange(mask, low, high, mask);
    
    low.delete();
    high.delete();

    cv.findContours(mask, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    mask.delete();
    hierarchy.delete();
    var blob_area = 0;
    if (contours.size() > 0){
        var blob = contours.get(0);
        for (var i = 0; i < contours.size(); i++){
            if (cv.contourArea(contours.get(i)) > cv.contourArea(blob)){blob = contours.get(i);}
        }
        mom = cv.moments(blob);
        var arraypt = [Math.round(mom.m10/mom.m00), Math.round(mom.m01/mom.m00)];
        center = new cv.Point(Math.round(mom.m10/mom.m00), Math.round(mom.m01/mom.m00));
        var blob_vec = new cv.MatVector();
        blob_vec[0] = blob;
        cv.drawContours(dst, blob_vec, 1, [0,255,0,255], 5);
        cv.circle(dst, center, 1,[0,0,255,255],7);
        blob_area = cv.contourArea(blob);
        blob_vec.delete();
        blob.delete();
        mom = null;
    }
    contours.delete();
    
    return [dst, center, arraypt, blob_area];
}

function mouseDownHandler(e) {
    if (video.width == 0){return;}
    
    [relativeX, relativeY] = getMousePosition(e, gameCanvas);
    
    inframe = [false, false];
    if(relativeX > 0 && relativeX < display_width) {
        pointcX = relativeX;
        inframe[0] = true;
    }

    if(relativeY > 0 && relativeY < display_height) {
        pointcY = relativeY;
        inframe[1] = true;
    }

    if (inframe[0] == false || inframe[1] == false){return;}

    // console.log(pointcX, pointcY);
    if (cv_built && cap != null){
        
        src_local = new cv.Mat(display_height, display_width, cv.CV_8UC4);
        cap.read(src_local);
        var hsv_local = new cv.Mat(display_height, display_width, cv.CV_8UC3);
        cv.cvtColor(src_local, hsv_local, cv.COLOR_RGB2HSV);
        pickColor(src_local, hsv_local, pointcX, pointcY);
        hsv_local.delete();
        src_local.delete();
    }
}

function pickColor(src_local, hsv_local, x, y){


    // console.log(hsv_local.ucharPtr(x,y));
    var center = new cv.Point(x, y);
    var pixel = hsv_local.ucharPtr(y, hsv_local.cols - x);

    upper =  arrayClamp([pixel[0] + 10, pixel[1] + 80, pixel[2] + 100, 255],0,255);
    lower =  arrayClamp([pixel[0] - 10, pixel[1] - 80, pixel[2] - 100, 255],0,255);
    
}


function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function arrayClamp(og_array, min, max) {
    for(c = 0; c < og_array.length; c++){
        num = og_array[c];
        og_array[c] = clamp(num, min, max);
    }
    return og_array;
}

function mouseMoveHandler(e) {

    [relativeX, relativeY] = getMousePosition(e, gameCanvas);
    if(relativeX > 0 && relativeX < gameCanvas.width) {
        pointX = relativeX;
    }

    if(relativeY > 0 && relativeY < gameCanvas.height) {
        pointY = relativeY;
    }
}

function getMousePosition(e, gameCanvas){
    // console.log(e.pageX, e.pageY);
    var relativeX = e.pageX - gameCanvas.offsetLeft;
    var relativeY = e.pageY - gameCanvas.offsetTop;
    return[relativeX, relativeY];
}

function openFullscreen() {
    // console.log('requesting')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function keypressed(e){
    // console.log(e.key);
    if (e.key == 'f'){
          openFullscreen();}
}

function resetDisplaySize(){
    // console.log("Resetting display")
    window_width = window.innerWidth;
    window_height = window.innerHeight;
    display_height = window_height - 50;
    var video_ratio = actual_width/actual_height;
    display_width = Math.round(display_height*video_ratio);
    var style_line = "z-index:1; width: " + display_width   + "px; height:" + display_height + "px;";
    video.height = display_height; video.width = display_width;
    gameCanvas.setAttribute("style", style_line);
    style_line = "z-index:1; width: " + (window_width - display_width - 32)/2   + "px; height:" + display_height + "px;";
    lcanvas.setAttribute("style", style_line);
    rcanvas.setAttribute("style", style_line);
    lctx = lcanvas.getContext("2d");
    lctx.font = getFont(lcanvas);
    rctx = rcanvas.getContext("2d");
    rctx.font = getFont(rcanvas);
    gameshape = [actual_width, actual_height];
    // style_line = "z-index:2; position:absolute; top:" +   + "; left:"  +  ;
    // sbutton.setAttribute("style",style_line);
    with(sbutton.style) {
        let val = ((window_width - display_width)/4 - sbutton.clientWidth/2);
        left = val + "px" ;
        // console.log(sbutton.clientHeight, left);
        val = (display_height/2 - sbutton.clientHeight/2);
        top = val + "px";
    }

    if (versions){
        with(sbutton.style) {
            let val = ((window_width - display_width)/4 - sbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 - 5*sbutton.clientHeight);
            top = val + "px";
        }
        with(fbutton.style) {
            let val = ((window_width - display_width)/4 - fbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 - 3*fbutton.clientHeight);
            top = val + "px";
        }
        with(conbutton.style) {
            let val = ((window_width - display_width)/4 - conbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 - 1*conbutton.clientHeight);
            top = val + "px";
        }
        with(curbutton.style) {
            let val = ((window_width - display_width)/4 - curbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 + 1*curbutton.clientHeight);
            top = val + "px";
        }
        with(sgbutton.style) {
            let val = ((window_width - display_width)/4 - sgbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 + 3*sgbutton.clientHeight);
            top = val + "px";
        }
        with(grbutton.style) {
            let val = ((window_width - display_width)/4 - grbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 + 5*grbutton.clientHeight);
            top = val + "px";
        }
        with(wvbutton.style) {
            let val = ((window_width - display_width)/4 - wvbutton.clientWidth/2);
            left = val + "px" ;
            // console.log(sbutton.clientHeight, left);
            val = (display_height/2 + 7*wvbutton.clientHeight);
            top = val + "px";
        }

    }
    with(rbutton.style) {
        let val = ((window_width - display_width)/4 - rbutton.clientWidth/2);
        left = val + "px" ;
        // console.log(sbutton.clientHeight, left);
        val = (display_height/2 + 9*rbutton.clientHeight);
        top = val + "px";
    }
}




