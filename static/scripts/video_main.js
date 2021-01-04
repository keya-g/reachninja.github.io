


function main(){
    // openFullscreen()
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

        resetDisplaySize()
        if (resetcap){
            cap = new cv.VideoCapture(video);
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
    
    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
    
    // start processing.
    cap.read(src);
    cv.flip(src, src, 1);
    var center = new cv.Point(pointcX, pointcY);
    dst = src.clone();
    cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
    let arraypt_old = game_object.player.loc;
    [dst, center, arraypt, blob_area] = blobdetect(src, dst, hsv);
    
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