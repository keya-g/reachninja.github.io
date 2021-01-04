class game{
    constructor(play_time = 40, camera_port = 0){        //camera_port = 0   // TO CHANGE
        // pygame.init()
        // this.win_sound = [pygame.mixer.Sound(resource_path("Sounds/pop1.wav")),
        //                   pygame.mixer.Sound(resource_path("Sounds/pop4.wav")),
        //                   pygame.mixer.Sound(resource_path("Sounds/pop6.wav"))]
        // this.error_sound = pygame.mixer.Sound(resource_path("Sounds/boom1.wav"))

        this.win_sound = [win1, win2, win3];
        this.error_sound = err;

        // pygame.font.init()
        // all_fonts = pygame.font.get_fonts()
        // this.textsize ={"large": pygame.font.SysFont(all_fonts[3], 200),
        //                 "medium": pygame.font.SysFont(all_fonts[3], 100),
        //                 "mid":pygame.font.SysFont(all_fonts[3],60),
        //                 "small": pygame.font.SysFont(all_fonts[3], 40),
        //                 "tiny": pygame.font.SysFont(all_fonts[3], 33)}
        // this.textsize = {"large": pygame.font.Font('freesansbold.ttf',200),
        //             "medium": pygame.font.Font('freesansbold.ttf',100),
        //             "small":pygame.font.Font('freesansbold.ttf',40),
        //             "tiny": pygame.font.Font('freesansbold.ttf',20)}

        this.textcolor = {"gray":   (100,100,100),
                          "white":  (255,255,255),
                          "black":  (0,0,0),
                          "red":    (255,0,0),
                          "green":  (0,255,0),
                          "blue":   (0,0,255)};
        this.camera_port = camera_port;
        this.play_time = play_time;
        this.game_type = null;
        this.wait_time = 5;
        this.obstacle_count = 0;
        this.intervention = 0;
        this.blob_area = 1;
        this.mirror = false;
        this.scaling_factor = 10;
        this.display_score = 0;
        this.old_score = 0;
        this.saveframe = false;
        this.game_params = {"exploding_perc" : 0.33, "max_unobs_time" : 0.2, "max_obs_time" : 0.8, 
                                "vel_max" : 1, "vel_min" : 0.5, "acc" : 100, "theta_max" : -30, "theta_min" : -90,
                                "min_obstacles" : 1, "max_obstacles" : 4, "damping" : 0, "mirror" : false, "magnetic_coef" : 1000 }
        // null; // json.load(open(resource_path('JsonFiles/Player_3/GameParams.json'),'r'));
        this.initializeGameType();
        this.initializeGameFrame();
        this.setGameID();
        this.resetBounds();
        this.resetRotationAngle();
        this.stationary = false;
        this.test_FR = 0;
        this.sendlog = false;
    }

    resetDamping(damping = 0){
        this.damping = damping; //0 // 0.5 // -0.5
        var scale_mat = [[1,0],[0,1]];
        this.damping_mat = scaleMatrix(scale_mat,this.damping);
        // this.damping_mat = this.damping*np.array(((-1, -1),(-1, 1)));
        this.player.resetDamping(this.damping, old_loc_wt = 0.3, new_loc_wt = 0.7) // Setting equal weightage to actual location && predicted location to allow damping effect
    }

    initializeGameType(){
        console.log(this.game_params["magnetic_coef"]);
        this.exploding_perc = this.game_params["exploding_perc"];
        this.max_unobs_time = this.game_params["max_unobs_time"];
        this.max_obs_time = this.game_params["max_obs_time"];
        this.acceleration = [0,this.game_params["acc]"]];
        this.velocity_min = this.game_params["vel_min"];
        this.velocity_max = this.game_params["vel_max"];
        this.theta_max = this.game_params["theta_max"];
        this.theta_min = this.game_params["theta_min"];
        this.min_obstacles = this.game_params["min_obstacles"];
        this.max_obstacles = this.game_params["max_obstacles"];
        this.damping = this.game_params["damping"]; // 0.5 // -0.5
        var scale_mat = [[1,0],[0,1]];
        this.damping_mat = scaleMatrix(scale_mat,this.damping);
        // this.damping_mat = this.damping*np.array(((-1, -1),(-1, 1)))
        this.mirror = this.game_params["mirror"];
        this.magnetic_coef = this.game_params["magnetic_coef"];
        
        if (this.velocity_max == this.velocity_min && this.velocity_max == 0){
            this.stationary = true;
        }
    }
    
    resetMagneticCoef(magnetic_coef){
        this.magnetic_coef = magnetic_coef;
    }

    initializeGameFrame(){
        // Function to initialilze the game screen size - background etc.
        drawBG()
        console.log("Screen size is: width=", gameCanvas.width," height=", gameCanvas.height);


        // this.video_capture = cv2.VideoCapture(this.camera_port)
        
        //// For windows
        // root = tk.Tk()
        // screen_width = root.winfo_screenwidth()
        // screen_height = root.winfo_screenheight()
        // this.screen_size_tuple = (screen_width, screen_height)
        // this.game_display = pygame.display.set_mode(this.screen_size_tuple)

        //// For Linux || Mac (?)
        // this.game_display = pygame.display.set_mode((0,0), pygame.FULLSCREEN)
        // screen_width = pygame.display.Info().current_w
        // screen_height = pygame.display.Info().current_h
        // this.screen_size_tuple = (screen_width, screen_height)

        // console.log(f"Width is {screen_width} && height is {screen_height}")

        // frame_width = int(this.video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        // frame_height = int(this.video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        // console.log(f"Width is {frame_width} && height is {frame_height}")
        
        
        // this.original_frame_tuple = (frame_width, frame_height)
        // this.aspectratio = this.original_frame_tuple[0]/this.original_frame_tuple[1]//frame_width/frame_height
        // // console.log(f'aspect ratio {this.aspectratio}')
        // this.frame_size_tuple = (int(this.screen_size_tuple[1]*this.aspectratio),this.screen_size_tuple[1])

        // this.width_ratio = this.original_frame_tuple[0]/(this.screen_size_tuple[1]*this.aspectratio)
        // this.height_ratio = this.original_frame_tuple[1]/this.screen_size_tuple[1]
        // // console.log(f'Width ratio is {this.width_ratio}, height ratio is {this.height_ratio}')
        // this.frame_offset = int((this.screen_size_tuple[0] - int(this.screen_size_tuple[1]*this.aspectratio))/2)

        // this.scaling_factor = 1/this.height_ratio

        // this.calibrate_button = pygame.Rect(this.frame_offset + this.frame_size_tuple[0]/5, np.round(2.5*this.frame_size_tuple[1]/4), this.frame_size_tuple[0]/5, this.frame_size_tuple[0]/15)
        // this.start_button = pygame.Rect(this.frame_offset + 3*this.frame_size_tuple[0]/5, np.round(2.5*this.frame_size_tuple[1]/4), this.frame_size_tuple[0]/5, this.frame_size_tuple[0]/15)
        // this.test_button = pygame.Rect(this.frame_offset + 2*this.frame_size_tuple[0]/5, 3*this.frame_size_tuple[1]/4, this.frame_size_tuple[0]/5, this.frame_size_tuple[0]/15)
        
        // this.button_color = (this.textcolor["grey"]
        // this.player_id_textbox = pygame.Rect(100, 100, 50, 50)
        // this.textbox_color = (255,255,255)

        // pygame.display.set_caption('Reach Ninja')
    }

    setGameID(){
        var d = new Date();
        this.game_id = d.getDate()+ "-" + d.getMonth() + "-" + d.getYear() + 
                            "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();// datetime.datetime.now().strftime("%d-%m-%Y_%H-%M-%S");
    }

    startrun(){
        var game_group = game_player_group; //2;
        this.current_game_type = "Control";

        if (game_group == 3){     // 3 is curriculum; 2 is control
            this.current_game_type = "Curriculum";
        }

        // this.current_game_type = 'Control'
        // clock = pygame.time.Clock()
        
        this.crashed = false;
        // this.game_mode = null;
        // key = cv2.waitKey(1)
        // key = key & 0xFF

        var player_id = game_player_id; //3;
        console.log(game_player_id);
        console.log('in game ', player_id, game_group)
        var gameshape = [gameCanvas.width, gameCanvas.height];
        this.player = new player(gameshape, this.damping, this.mirror, player_id, 0, 1);
        
        
        this.init_line = "Screen: " + gameshape;
        // this.gamelog = Gamelog(this.player, this.game_id)
        this.gamelog = new gamelog(this.player, this.game_id);
        
        
    }
        // console.log(t_old);
        // for (var t = 0; t < this.play_time;){
        //     t = getTimeS() - start_time;
        //     if (Math.ceil(t) != Math.ceil(t_old)){
        //         console.log(Math.ceil(t_old));
        //     }
        //     t_old = t;

        //     // for event in pygame.event.get():
        //     //     if event.type == pygame.QUIT:
        //     //         this.crashed = true
        //     //     else if event.type == pygame.KEYDOWN && event.key == pygame.K_q:
        //     //         this.crashed = true
        //         // else if event.type == pygame.KEYDOWN && event.key == pygame.K_s:
        //         //     this.game_mode = 'StartPlay'
        //         // else if event.type == pygame.KEYDOWN && event.key == pygame.K_c:
        //         //     this.game_mode = 'Calibrate'
        //         //     this.current_time = getTimeS()  
        //         // else if event.type == pygame.KEYDOWN && event.key == pygame.K_t:
        //         //     this.game_mode = 'Test'
        //         // else if event.type == pygame.KEYDOWN && event.key == pygame.K_e:
        //         //     this.game_mode = null
        //         //     this.player.start_time = -1
        //         //     // this.player.attempt -= 1 // TO CHANGE
        //         //     console.log('Exiting... ')

        //         // else if event.type == pygame.MOUSEBUTTONDOWN:
        //         //     if this.start_button.collidepoint(event.pos):
        //         //         this.game_mode = 'StartPlay'
        //         //     else if this.calibrate_button.collidepoint(event.pos):
        //         //         this.game_mode = 'Calibrate'
        //         //         this.current_time = getTimeS()  
        //         //     else if this.test_button.collidepoint(event.pos):
        //         //         this.game_mode = 'Test'
        //         //     else:
        //         //         this.pickColor()
                
        //     // if (this.game_mode == null){
        //     //     this.displayDefault();
        //     // }

        //     // else if (this.game_mode == 'StartPlay' && this.player.start_time == -1){
        /////////////////////////
        run(){
            this.sendlog = false;
            // console.log(this.game_mode);
            // console.log(this.player.id);
            if (this.game_mode == 'StartPlay' && this.player.start_time == -1){
                // Check for more than 40 attempts
                if (this.player.attempt >= 40){
                    console.log('Quitting... ');
                    this.crashed = true;
                }
                else{
                    console.log('Starting... ');
                    this.player.setStartTime();
                    this.player.last_time = getTimeS();
                    this.game_type = this.current_game_type;
                    this.frame_id = 1;
                    this.check_targets = false;
                    this.current_time = getTimeS();
                    this.initializeNewGame();
                    this.tracking_type = tracking_type; // Mouse or Video
                    this.intervention = 0;              // This is to signify type of game curriculum, right now we only have one curriculum running, so set to 0
                    this.gamelog.newGameLog(this.player.attempt, this.init_line)
                }
            }

            else if (this.game_mode == 'InPlay' && (getTimeS() - this.player.start_time) <= this.play_time){
                this.current_time = getTimeS();
                this.saveframe = false;//InPlay      // NEED TO CHANGE THIS BACK TO TRUE TO SAVE IMAGES
                this.updateGameFrame();
                this.updateGamelog();
            }
                
            else if (this.game_mode == 'InPlay'){
                this.game_mode = null;
                this.saveframe = false;
                // pygame.time.delay(2000);
                // setTimeout(() => {
                //   console.log("Waited 2000 ms");
                // }, 2000);
                this.player.setStartTime();
                // console.log(this.gamelog.datalog);
                this.sendData();
                this.sendlog = true;
                this.crashed = true;
            }

        if (this.crashed == true){
            if (confirm("Game ended! Restart?")){
                this.game_mode = 'StartPlay';
                this.gamelog.newGameLog = null;
                this.player.start_time = -1;
                this.crashed = false;
            }
        }
    }

    updateGameFrame(){
        this.stepGame();    // Run the next timestep of the game
        drawBG();           // Draw on canvas

        if (this.player.checkObservable(getTimeS())) {  // If the player should be visible on screen
            // console.log(this.player.loc);
            this.drawCircle(this.player);
        }            

        for (var c = 0; c<this.curr_obstacle.length; c++){ //For each obstacle
            this.drawCircle(this.curr_obstacle[c]);
        }
        
        
        // Redraw score canvas (left)
        clearCanvas(scoreCanvas);   
        var score_line = "Score:";
        this.writeOnCanvas(scoreCanvas, score_line, [scoreCanvas.width/2-75, scoreCanvas.height/2-50], "gray", "50px");
        score_line = this.player.score;
        this.writeOnCanvas(scoreCanvas, score_line, [scoreCanvas.width/2-20, scoreCanvas.height/2+50], "gray", "50px");

        // Redraw time cnvas (right)        
        clearCanvas(timeCanvas);
        var time_line = "Time:";
        this.writeOnCanvas(timeCanvas, time_line, [timeCanvas.width/2-75, timeCanvas.height/2-50], "gray", "50px");
        time_line = Math.ceil(this.play_time - (this.curr_time - this.player.start_time));
        this.writeOnCanvas(timeCanvas, time_line, [timeCanvas.width/2-20, timeCanvas.height/2+50], "gray", "50px");

        if (tracking_type == "Video"){  // Video framerate is slower
            var disp_frames = 10;   
        }
        else{
            var disp_frames = 100;
        }

        
        // If player has a change in score, score is displayed on screen for a few timesteps
        if (this.display_score > 0 && this.display_score <= disp_frames){
            var score_change = this.player.score - this.old_score;
            var dispmsg = Math.ceil(score_change);
            if (score_change < 0){
                dispmsg = Math.ceil(score_change);
            }
            this.writeOnCanvas(gameCanvas,dispmsg, this.player.loc, "black", "20px");
            this.display_score += 1;
            if (this.display_score >= disp_frames){
                this.old_score = this.player.score;
                // console.log('score updated')
                this.display_score = 0;
            }
        }
    }

    // Write score or time on canvas
    writeOnCanvas(curr_canvas, display_text, text_loc, textcolor, textsize = "20px"){
        var ctx = curr_canvas.getContext("2d");
        ctx.font = textsize +" Arial";
        ctx.fillStyle = textcolor;
        ctx.fillText(display_text, text_loc[0], text_loc[1]);
    }

    // drawing the tracked movement marker in red 
    drawHand(marker){
        ctx.beginPath();
        ctx.arc(marker.loc[0], marker.loc[1], marker.radius, 0, Math.PI*2);
        ctx.fillStyle =  marker.marker_color;
        ctx.fill();
        ctx.closePath();
    }

    // Sending log files of app.py for logging on server
    sendData(){
        let xhr = new XMLHttpRequest();
        let url = "get_data";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                // console.log(json);
            }
        };
        let data = JSON.stringify({'logname':this.gamelog.logname, 'logdata': this.gamelog.datalog});
        // console.log(data);
        xhr.send(data);
    }

    // Getting game parameters for each game; This runs once per subject and the json file contains parameters for all 40 sessions
    getGameParam(){
        let xhr = new XMLHttpRequest();
        let url = "send_gameparam";
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");

        var gameparam_json = null;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                gameparam_json = JSON.parse(xhr.responseText);
                // console.log(gameparam_json);
                // this.setGameParams(gameparam_json);
                // this.game_params = 6;
            }
        };
        // console.log(this.player.id)
        let data = JSON.stringify({"attempt":this.player.attempt,"player_no":this.player.id});
        // console.log(data);  
        xhr.send(data);
        // console.log(json);

        this.game_params = gameparam_json;

    }

    // Getting seeds for the obstacles; This runs once every attempt. Each json file contains over 
    // 100 seeds from which the game will pull information regarding the next obstacle that appears on screen.
    getGameSeeds(){
        let xhr = new XMLHttpRequest();
        let url = "send_gameseeds";
        console.log(url)
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");

        var gameseeds_json = null;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                gameseeds_json = JSON.parse(xhr.responseText);
                // console.log(gameseeds_json);
            }
        };
        // console.log(this.player.id)
        let data = JSON.stringify({"attempt":(this.player.attempt),"player_no":this.player.id});
        xhr.send(data);

        this.game_obstacle_seeds = gameseeds_json;
    }

    // setting the game parameters to those obtained from JSON
    setGameParams(gameparam_json)
    {
        console.log('setting params')
        this.game_params = gameparam_json;
    }

    // Run the next timestep of the game
    stepGame(){
        this.curr_time = getTimeS();

        var new_obstacle = new Array();
        var resetobstacle_count = false;
        this.check_targets = false;
        if (this.frame_id == 1){
            this.player.obs_start = getTimeS();
        }
        this.frame_id ++;
        var new_marker_no = 0;

        for (var ob_ctr = 0; ob_ctr < this.curr_obstacle.length; ob_ctr++) {// for each obstacle

            // Update the position of the obstacle given previous velocity and acceleration
            this.curr_obstacle[ob_ctr].updatePosition(this.curr_time, this.player.loc, this.player.radius, this.magnetic_coef);
            var o = this.curr_obstacle[ob_ctr];

            //Check for collision of player && marker - is this happens, score change && reset obstacle count
            if (o.checkCollision(this.player, 1)){ 
                // console.log('Collided! obstacle id ', o.obstacle_id)
                var addscore = this.updateScore(o);
                resetobstacle_count = true;
                new_marker_no = o.new_marker_no;
                this.display_score = 1;

                // Sound effects
                if (o.obstacle_type == 'Exploding'){
                    this.error_sound.play();
                }
                else{
                    let sound_no = Math.floor(addscore/10);
                    console.log(sound_no);
                    this.win_sound[sound_no].play();
                }
                // else{
                //     let sound_no = Math.floor(addscore/10);
                //     sound = this.win_sound[sound_no];
                //     sound.play();
                // }
                
            }

            // Check if marker left the screen, if this happens, reset obstacle count
            else if (!o.inframe){
                resetobstacle_count = true;
                new_marker_no = o.new_marker_no;
            }

            // Old case, where we had stationary markers - timeout after 10s, no longer relevant
            else if (this.stationary && o.obstacle_type == 'Exploding' && (this.curr_time -  o.start_time) > 10){
                resetobstacle_count = true;
                new_marker_no = o.new_marker_no;
            }
            
            // Check if the marker is Regular, if it is, check_targets is set to true indicating at least one of the markers in the new obstacle set is regular
            else if (o.obstacle_type == 'Regular'){
                this.check_targets = true;
                new_obstacle.push(o);
            }

            // This case will only be entered when the marker is 'Exploding' && still in frame / not collided with player
            else{
                new_obstacle.push(o)
            }
        }
        this.curr_obstacle = new_obstacle; // Effectively removed collided || out of frame markers

        if (resetobstacle_count){
            // Resetting obstacle count. 
            // If this.check_targets is still false, the new count will necessarily be 1 more than the last length
            // Otherwise, the new count will be new_marker_no - from seeds
            this.newobstacle_count(new_marker_no, this.curr_obstacle);
        }

        // console.log('Here before while');
        // this.check_targets has not been updates so it will still be false if null of the obstacles still on screen are 'Regular'
        while (this.curr_obstacle.length < this.obstacle_count){
            this.cur_obstacle_id += 1;
            var ctime = getTimeS();

            // Creating a new obstacle
            var new_obstacle = new obstacles(gameshape, ctime, this.exploding_perc, this.velocity_max, this.velocity_min, this.acceleration[1], this.theta_max, this.theta_min, this.max_obs_time, this.max_unobs_time, this.cur_obstacle_id);
            new_obstacle.setObstacleParams(this.game_obstacle_seeds[this.cur_obstacle_id-1]);   // Setting obstacle values to seeds || This can be commented if not using seeds, game will be random
            this.curr_obstacle.push(new_obstacle);

            if (this.curr_obstacle[this.curr_obstacle.length-1].obstacle_type == 'Regular'){
                this.check_targets = true;   // Checking if the newly added marker is regular - note that if this was previously false a new marker will necessarily be created
            }
        }
        if (!this.check_targets){
        // If after all this null of the new markers is 'Regular', the most recently created marker will become 'Regular' forcibly
        // Note that this will always be a newly created marker in the above while loop
            this.curr_obstacle[this.curr_obstacle.length-1].setRegularObstacle()
        }
    }

    // Resetting bounds on object tracking for OpenCV based on most recent mouse click
    resetBounds(lower = [170, 180,70], upper = [180, 255,255]){
        this.lower = lower;// np.array(lower, dtype = "uint8");
        this.upper = upper;// np.array(upper, dtype = "uint8");
    }

    // Wait for game to start - Needs to be updated
    waitGame(call_time){
        console.log("in wait time");
        alert('here');
        while ((getTimeS() - call_time) < 1 ){ //this.wait_time){
            // this.game_display.fill([255,255,255])
            drawBG();
            console.log(Math.ceil(getTimeS() - call_time));
            var text_center = [gameCanvas.width/2, gameCanvas.height/2 - 50]; //((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2 - 50))
            // this.messageDisplay(f"Attempt {this.player.attempt+1}", text_center, this.textcolor["black"])
            var msg = "Attempt" + (this.player.attempt+1);
            this.writeOnCanvas(gameCanvas, msg, text_center, "black");
            text_center = [gameCanvas.width/2, gameCanvas.height/2 + 50]; 
            msg = this.wait_time - (getTimeS() - call_time);
            this.writeOnCanvas(gameCanvas, msg, text_center, "black");
        }
    }

    // Resetting obstacle count if an obstacle has left the screen
    newobstacle_count(new_marker_no = 5, curr_obstacle = []){

        if (this.check_targets == false){   // This will be true if there are only exploding markers on screen
            // console.log(f'Old obstacle count {this.obstacle_count}')
            this.obstacle_count = Math.max((curr_obstacle.length) + 1, new_marker_no + 1);
            // console.log(f'New obstacle count {this.obstacle_count}')
        }
        else{   // If there are some regular marker, use the last seeded marker as reference for new_marker_no.
            this.obstacle_count = new_marker_no; 
        }
    }

    // If a marker was hit, the new score is calculated, and change in score is returned
    updateScore(marker){
        var addscore = 0;
        // console.log('Adding score')
        if (marker.obstacle_type == 'Exploding'){
            addscore = -10;
        }
        else{
            var size_effect = (marker.max_radius - marker.radius) / (marker.max_radius - marker.min_radius);
            var velocity_effect = (marker.original_velocity/marker.velocity_scale)/(this.velocity_max);
            // console.log('size ', size_effect, ' velocity ', velocity_effect);
            addscore = 10 + Math.ceil(10*size_effect) + Math.ceil(10*velocity_effect);
            if (addscore > 30){
                console.log(Math.ceil(10*size_effect), Math.ceil(10*velocity_effect))
            }
        }
        // console.log(this.player.score);
        this.player.score = this.player.score + addscore;
        // console.log(this.player.score);
        return addscore;
    }

    // Initializing new game parameters at the start of each attempt/session.
    initializeNewGame(){
        this.gamelog.game_type = this.game_type;
        drawBG()
        this.game_mode = 'InPlay';
        this.display_score = 0;
        this.old_score = 0;
        this.current_time = getTimeS();
        this.player.newGameInit(this.current_time);
        
        console.log('Attempt' + this.player.attempt);

        if (this.game_type == "Curriculum"){
            console.log(this.game_type)
            this.getGameParam();

        }
        this.getGameSeeds();
        this.initializeGameType();

        this.newobstacle_count();
        this.cur_obstacle_id = 0;
        this.check_targets = false;
        this.curr_obstacle =  new Array();

        console.log('Setting starting seeds')
        for (var ob_ctr = 0; ob_ctr < this.obstacle_count; ob_ctr ++){
            this.cur_obstacle_id += 1;
            var new_obstacle = new obstacles(gameshape, this.current_time, this.exploding_perc, this.velocity_max, this.velocity_min, this.acceleration[1], this.theta_max, this.theta_min, this.max_obs_time, this.max_unobs_time, this.cur_obstacle_id, this.min_obstacles, this.max_obstacles);
            new_obstacle.setObstacleParams(this.game_obstacle_seeds[this.cur_obstacle_id-1]);   // Set obstacle params to those from seed JSON
            this.curr_obstacle.push(new_obstacle);
        }

    }

    // Draw a circle on the canvas
    drawCircle(marker){
        ctx.beginPath();
        ctx.arc(marker.loc[0], marker.loc[1], marker.radius, 0, Math.PI*2);
        ctx.fillStyle =  marker.marker_color;
        ctx.fill();
        ctx.closePath();
    }

    // Update the game logger.
    updateGamelog(){
        this.gamelog.startPlayerLine(this.current_time, this.player, (this.obstacle_count + 1), this.game_type, this.tracking_type, this.intervention);
        this.gamelog.addObstacleLine(this.curr_obstacle);
        this.gamelog.writeLogLine();
        this.gamelog.clearLogLine();
    }

    // calibrateGame():
    //     call_time = getTimeS()

    //     console.log('Calibration Start')
    //     while (getTimeS() - call_time) < this.wait_time:
    //         this.saveframe = false
    //         this.displayDefault()
    //         text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2))
    //         this.messageDisplay(f"{this.wait_time - int(getTimeS() - call_time)}", text_center, this.textcolor["black"])
    //         pygame.display.update()

    //     call_time = getTimeS()
    //     while (getTimeS() - call_time) < this.wait_time:
    //         // this.saveframe = true     //  NEED TO CHANGE THIS BACK TO CAPTURE IMAGES
    //         this.frame_id += 1
    //         this.displayDefault()
    //         text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2))
    //         this.messageDisplay(f"{this.wait_time - int(getTimeS() - call_time)}", text_center, this.textcolor["green"])
    //         pygame.display.update()

    //     console.log('Calibration End')

    //     this.saveframe = false

    // testGame():
    //     call_time = getTimeS()
    //     this.gamelog.createTestLogger()
    //     console.log('Test Start')
    //     while (getTimeS() - call_time) < this.test_duration:
    //         ret, frame = this.video_capture.read()
    //         frame = cv2.flip(frame, 1)
    //         this.curr_time = getTimeS()

    //         frame, center, blob_area = this.blobDetect(frame)
    //         if blob_area >= this.blob_area:
    //             new_loc = np.array(center) 
    //             if this.mirror:
    //                 new_loc = this.flipMarkerPosition(new_loc, center)
    //         else:
    //             new_loc = np.array(this.player.loc)

    //         new_loc = this.rotateMarkerPosition(new_loc)
    //         this.player.updatePosition(new_loc, this.curr_time)
    //         this.game_display.fill([255,255,255])
    //         pygame.draw.rect(this.game_display, (0,0,0), (0,0,this.frame_offset, this.frame_size_tuple[1]))
    //         pygame.draw.rect(this.game_display, (0,0,0), (this.frame_offset + this.frame_size_tuple[0],0,this.frame_offset, this.frame_size_tuple[1]))

    //         playerloc = (int(this.player.loc[0]/this.width_ratio) + this.frame_offset, int(this.player.loc[1]/this.height_ratio))
    //         pygame.draw.circle(this.game_display, this.player.marker_color, playerloc, int(this.scaling_factor*this.player.radius))
    //         this.messageDisplay(f"{int(this.test_duration - (getTimeS() - call_time))}s", \
    //                                                     (this.frame_size_tuple[0] + int(this.frame_offset*3/2), this.frame_size_tuple[1]/2), this.textcolor["gray"])
    //         text_rect = this.getTextRect(f"{int(this.test_duration - (getTimeS() - call_time))}") // TO CHANGE
    //         this.messageDisplay('Time:', (this.frame_size_tuple[0] + int(this.frame_offset*3/2), this.frame_size_tuple[1]/2 - text_rect[3]), this.textcolor["gray"], "small")

    //         this.gamelog.addTestLine((getTimeS() - call_time), this.player.loc)

    //         pygame.display.update()

    //     this.test_FR = this.frame_id/this.test_duration
    //     console.log(f"Test Frame Rate is {this.test_FR}")


    // flipMarkerPosition(new_loc, center):
    //     new_loc[0] = this.original_frame_tuple[0] - center[0]
    //     new_loc[1] = center[1]
    //     return new_loc


    resetRotationAngle(rot_angle = 0){
        this.rotation_angle = rot_angle; //degrees
    }

    // rotateMarkerPosition(new_loc):
    //     // console.log(shape)
    //     shape = this.original_frame_tuple
    //     new_loc = new_loc - np.array((shape[0], shape[1]))/2
    //     c, s = np.cos(this.rotation_angle*np.pi/180), np.sin(this.rotation_angle*np.pi/180)
    //     R = np.array(((c, -s), (s, c)))
    //     new_loc = R.dot(new_loc) + (np.array((shape[0], shape[1])))/2
    //     return new_loc

}