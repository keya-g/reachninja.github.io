var sbutton = document.getElementById("startbutton");
sbutton.addEventListener("click", startButtonHandler);
var rbutton = document.getElementById("returnbutton");
rbutton.addEventListener("click", returnButtonHandler);
document.addEventListener('keydown', logKey);
if (versions){
    fbutton.addEventListener("click", fastButtonHandler);
    conbutton.addEventListener("click",conButtonHandler);
    curbutton.addEventListener("click",curButtonHandler);
    sgbutton.addEventListener("click",sgButtonHandler);
    grbutton.addEventListener("click",grButtonHandler);
    wvbutton.addEventListener("click",wvButtonHandler);
}

var reset_check = true;

function logKey(e) {
    console.log(e.code);
    if (e.code.includes('Enter'))
        startButtonHandler();
    if (e.code.includes('KeyF'))
        openFullscreen();

}

function returnButtonHandler(){
    if (game_object != null){
        game_object.crashed = true;
        reset_check = true
        if(confirm("Returning!")){
            game_object.game_mode = null;
            sbutton.style.display = "block";
            if (versions){
                fbutton.style.display = "block";
                conbutton.style.display = "block";
                curbutton.style.display = "block";
                sgbutton.style.display = "block";
                grbutton.style.display = "block";
                wvbutton.style.display = "block";
            }
            rbutton.style.display = "none";
            lcontext = lcanvas.getContext('2d');
            rcontext = rcanvas.getContext('2d');
            lcontext.clearRect(0,0, lcanvas.width, lcanvas.height);
            rcontext.clearRect(0,0, rcanvas.width, rcanvas.height);

        }else{
            game_object.crashed = false;
        }
    }
}


var game_group = 0; // Default initialization
function startButtonHandler(){
      reset_check = true;
      if (game_object != null){
            game_group = 0;
            sbutton.style.display = "none";
            game_object.game_mode = 'StartPlay';
            rbutton.style.display = "block";
            game_object.startrun();
            if (versions){
                fbutton.style.display = "none";
                conbutton.style.display = "none";
                curbutton.style.display = "none";
                sgbutton.style.display = "none";
                grbutton.style.display = "none";
                wvbutton.style.display = "none";
                
            }
      }
  }
  function fastButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 1;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }
  function conButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 2;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }
  function curButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 3;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }
  function sgButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 4;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }
  function grButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 5;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }
  function wvButtonHandler(){
      reset_check = true;
      if (game_object != null){
            sbutton.style.display = "none";
            fbutton.style.display = "none";
            conbutton.style.display = "none";
            curbutton.style.display = "none";
            sgbutton.style.display = "none";
            grbutton.style.display = "none";
            wvbutton.style.display = "none";
            rbutton.style.display = "block";
            game_group = 6;
            game_object.game_mode = 'StartPlay';
            game_object.startrun();
          
      }
  }


function main(){
    // openFullscreen()
    resetDisplaySize();
    let resetcap = false;
    if (cv_built == true && streaming){

        if (game_object == null){
            game_object = new game(40);
            console.log(game_object.play_time)
            game_object.game_mode = null;
        }

        cap = new cv.VideoCapture(video);
        if (actual_height == 0){
            actual_height = cap.video.videoHeight; 
            resetcap = true;
            video.height = cap.video.videoHeight;
        }
        if (actual_width == 0){
            actual_width = cap.video.videoWidth; 
            video.width = cap.video.videoWidth; 
        }

        if (video.width == 0){return;}
        
        if (resetcap){
            cap = new cv.VideoCapture(video);
            if (reset_check){
                resetDisplaySize();
                reset_check = false;
            }
        }
        if (reset_check){
            resetDisplaySize();
            reset_check = false;
        }
        var begin = Date.now();
        var delay = 1000/FPS - (Date.now() - begin);
        // console.log(game_object.game_mode);
        // console.log(gameshape);
        if (game_object.game_mode != null){
            setTimeout(rungame, delay);
        }
        else{

            setTimeout(processVideo, delay);
        }
    }
}


function rungame(){
    
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
    
    // start processing.
    
    cap.read(src);

    // new_width = //actual_width*perc_red/100;
    new_width = red_width;  // This value is set in video_setup.js
    new_height = actual_height*red_width/actual_width; //actual_height*perc_red/100;

    cv.resize(src, src, new cv.Size(new_width,new_height), 0, 0, cv.INTER_LINEAR);

    // cv.flip(src, src, 1);
    var center = new cv.Point(pointcX, pointcY);
    let dst = src.clone();
    cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
    let arraypt_old = game_object.player.loc;
    [dst, center, arraypt, blob_area] = blobdetect(src, dst, hsv);
    // console.log(arraypt, center);
    arraypt = scaleArray(arraypt, actual_width/red_width);
    
    arraypt[0] = actual_width - arraypt[0];
    // console.log(arraypt);

    src.delete();
    dst.delete();
    hsv.delete();
    // center.delete();

    curr_time = getTimeS();
    // console.log(curr_time);
    
    if (isNaN(arraypt[0]+arraypt[1])){
        // console.log(isNaN(arraypt[0]));
        arraypt = arraypt_old;
    }
    game_object.player.updatePosition(arraypt, curr_time);
    // console.log(game_object.player.loc);
    game_object.run();
}



// var interval = setInterval(rungame,1);

var interval = setInterval(main, 0);