class game{
    constructor(play_time = 40, camera_port = 0){        //camera_port = 0   // TO CHANGE
        // pygame.init()
        // this.win_sound = [pygame.mixer.Sound(resource_path("Sounds/pop1.wav")),
        //                   pygame.mixer.Sound(resource_path("Sounds/pop4.wav")),
        //                   pygame.mixer.Sound(resource_path("Sounds/pop6.wav"))]
        // this.error_sound = pygame.mixer.Sound(resource_path("Sounds/boom1.wav"))

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
        this.game_params = null; // json.load(open(resource_path('JsonFiles/Player_3/GameParams.json'),'r'));
        this.initializeGameType();
        this.initializeGameFrame();
        this.setGameID();
        this.resetBounds();
        this.resetRotationAngle();
        this.stationary = false;
        this.test_FR = 0;
    }

    resetDamping(damping = 0){
        this.damping = damping; //0 // 0.5 // -0.5
        var scale_mat = [[1,0],[0,1]];
        this.damping_mat = scaleMatrix(scale_mat,this.damping);
        // this.damping_mat = this.damping*np.array(((-1, -1),(-1, 1)));
        this.player.resetDamping(this.damping, old_loc_wt = 0.5, new_loc_wt = 0.5) // Setting equal weightage to actual location && predicted location to allow damping effect
    }

    initializeGameType(exploding_perc = 0.33, max_unobs_time = 0.2, max_obs_time = 0.8, 
                                vel_max = 1, vel_min = 0.5, acc = 100, theta_max = -30, theta_min = -90,
                                min_obstacles = 1, max_obstacles = 4, damping = 0, mirror = false, magnetic_coef = 0){
        this.exploding_perc = exploding_perc;
        this.max_unobs_time = max_unobs_time;
        this.max_obs_time = max_obs_time;
        this.acceleration = np.array([0,acc]);
        this.velocity_min = vel_min;
        this.velocity_max = vel_max;
        this.theta_max = theta_max;
        this.theta_min = theta_min;
        this.min_obstacles = min_obstacles;
        this.max_obstacles = max_obstacles;
        this.damping = damping; // 0.5 // -0.5
        var scale_mat = [[1,0],[0,1]];
        this.damping_mat = scaleMatrix(scale_mat,this.damping);
        // this.damping_mat = this.damping*np.array(((-1, -1),(-1, 1)))
        this.mirror = mirror;
        this.magnetic_coef = magnetic_coef;
        if vel_max == vel_min && vel_max == 0{
            this.stationary = true;
        }
    }
        

    initializeGameFrame(){
        // Function to initialilze the game screen size - background etc.
        function drawBG()
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

    run(){
        var game_group = 2;
        var current_game_type = "Control";

        if game_group == 3{     // 3 is curriculum; 2 is control
            current_game_type = "Curriculum";
        }

        // current_game_type = 'Control'
        // clock = pygame.time.Clock()
        
        this.crashed = false;
        this.game_mode = null;
        // key = cv2.waitKey(1)
        // key = key & 0xFF

        var player_id = 3;
        this.player = Player(gameshape = (this.original_frame_tuple[1], this.original_frame_tuple[0]), damping = this.damping, mirror = this.mirror, id = player_id);
        this.init_line = f"Screen: {this.screen_size_tuple}; Original: {this.original_frame_tuple}; Modified: {this.frame_size_tuple}";
        // this.gamelog = Gamelog(this.player, this.game_id)

        while (!this.crashed){
            // for event in pygame.event.get():
            //     if event.type == pygame.QUIT:
            //         this.crashed = true
            //     else if event.type == pygame.KEYDOWN && event.key == pygame.K_q:
            //         this.crashed = true
                // else if event.type == pygame.KEYDOWN && event.key == pygame.K_s:
                //     this.game_mode = 'StartPlay'
                // else if event.type == pygame.KEYDOWN && event.key == pygame.K_c:
                //     this.game_mode = 'Calibrate'
                //     this.current_time = time.time()  
                // else if event.type == pygame.KEYDOWN && event.key == pygame.K_t:
                //     this.game_mode = 'Test'
                // else if event.type == pygame.KEYDOWN && event.key == pygame.K_e:
                //     this.game_mode = null
                //     this.player.start_time = -1
                //     // this.player.attempt -= 1 // TO CHANGE
                //     console.log('Exiting... ')

                // else if event.type == pygame.MOUSEBUTTONDOWN:
                //     if this.start_button.collidepoint(event.pos):
                //         this.game_mode = 'StartPlay'
                //     else if this.calibrate_button.collidepoint(event.pos):
                //         this.game_mode = 'Calibrate'
                //         this.current_time = time.time()  
                //     else if this.test_button.collidepoint(event.pos):
                //         this.game_mode = 'Test'
                //     else:
                //         this.pickColor()
                
            if (this.game_mode == null){
                this.displayDefault();
            }

            else if (this.game_mode == 'StartPlay' && this.player.start_time == -1){
                
                // Check for more than 40 attenpts
                if (this.player.attempt >= 40){
                    console.log('Quitting... ');
                    this.crashed = true;
                }
                else{
                    console.log(f'Starting... ')
                    this.game_type = current_game_type;
                    this.frame_id = 1;
                    this.waitGame(time.time());
                    this.check_targets = false;
                    this.initializeNewGame();
                    // this.gamelog.newGameLog(this.player.attempt, this.init_line);
                }
            }

            else if (this.game_mode == 'InPlay' && (time.time() - this.player.start_time) <= this.play_time){
                this.current_time = time.time();
                this.saveframe = false;//InPlay      // NEED TO CHANGE THIS BACK TO TRUE TO SAVE IMAGES
                this.updateGameFrame();
                // this.updateGamelog();
            }
                
            else if (this.game_mode == 'InPlay'){
                this.game_mode = null;
                this.saveframe = false;
                // pygame.time.delay(2000);
                setTimeout(() => {
                  console.log("Waited 2000 ms");
                }, 2000);
                this.player.setStartTime();
            }

            else if (this.game_mode == 'Calibrate'){
                console.log('Calibrating...')
                this.frame_id = 1;
                this.saveframe = false;
                // this.gamelog.savefolder = this.gamelog.calibration_log_folder
                this.calibrateGame();
                this.game_mode = null;
            }

            else if (this.game_mode == 'Test'){
                console.log('Testing...');
                this.frame_it = 1;
                this.test_duration = 10; //s
                this.testGame();
                this.game_mode = null;
            }


            // pygame.display.update()
            // clock.tick(60)

        // this.video_capture.release()
        // cv2.destroyAllWindows()
        // pygame.quit()
        alert("Quitting game!");
    }


    // videoFrameToPyGameDisplay(frame, saveframe = false, savelocation = []){
    //     frame, center, blob_area = this.blobDetect(frame)
    //     frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    //     if saveframe == true:
    //         cv2.imwrite(f"{this.calibration_log_folder}/{this.frame_id:010d}.png",frame)

    //     frame = np.rot90(frame)
    //     frame = pygame.surfarray.make_surface(frame)
    //     frame = pygame.transform.scale(frame, this.frame_size_tuple)
    //     return frame
    // }

    updateGameFrame(){
        // ret, frame = this.video_capture.read()
        // frame = cv2.flip(frame, 1)
        this.stepGame(frame);
        // this.game_display.fill([255,255,255]);
        // pygame.draw.rect(this.game_display, (0,0,0), (0,0,this.frame_offset, this.frame_size_tuple[1]))
        // pygame.draw.rect(this.game_display, (0,0,0), (this.frame_offset + this.frame_size_tuple[0],0,this.frame_offset, this.frame_size_tuple[1]))
        
        // console.log(this.player.loc, this.height_ratio)

        // playerloc = (int(this.player.loc[0]/this.width_ratio) + this.frame_offset, int(this.player.loc[1]/this.height_ratio))
        // console.log(f"player.loc {this.player.loc}, height ratio {this.height_ratio}, new updategameframe {playerloc}")
        // if this.player.checkObservable(time.time()):
        //     pygame.draw.circle(this.game_display, this.player.marker_color, playerloc, int(this.scaling_factor*this.player.radius))

        if (this.player.checkObservable(getTimeS())) {
            this.drawCircle(this.player);
        }            

        for (c = 0; c<this.curr_obstacle.length; c++){ //o in this.curr_obstacle:
            // obstacleloc = (int(o.loc[0]/this.width_ratio) + this.frame_offset, int(o.loc[1]/this.height_ratio))
            this.drawCircle(this.curr_obstacle[c]);
            // pygame.draw.circle(this.game_display, o.marker_color, obstacleloc, int(this.scaling_factor*o.radius))
        }
        
        score_line = "Score:\n" + this.player.score;
        this.writeOnCanvas(scoreCanvas, score_line, [scoreCanvas.width/2, scoreCanvas.height/2], "gray");

        time_line = "Time:\n" + Math.ceil(this.play_time - (this.curr_time - this.player.start_time));
        this.writeOnCanvas(timeCanvas, time_line, [timeCanvas.width/2, timeCanvas.height/2], "gray");

        var disp_frames = 10;
        if (this.display_score > 0 && this.display_score <= disp_frames){
            var score_change = this.player.score - this.old_score;
            var dispmsg = Math.ceil(score_change);
            if (score_change < 0){
                dispmsg = Math.ceil(score_change)*-1;
            }
            this.writeOnCanvas(gameCanvas,dispmsg, playerloc, "black", "20px");
            this.display_score += 1;
            if (this.display_score == disp_frames){
                this.old_score = this.player.score;
                this.display_score = 0;
            }
        }
        // pygame.display.update()
    }

    function writeOnCanvas(curr_canvas, display_text, text_loc, textcolor, textsize = "50px"){
        var ctx = curr_canvas.getContext("2d");
        ctx.font = textsize +" Arial";
        ctx.fillStyle = textcolor;
        ctx.fillText(display_text, text_loc[0], text_loc[1]);
    }

    function drawHand(marker){
        ctx.beginPath();
        ctx.arc(marker.loc[0], marker.loc[1], marker.radius, 0, Math.PI*2);
        ctx.fillStyle =  marker.marker_color;
        ctx.fill();
        ctx.closePath();
    }

    stepGame(){
        this.curr_time = getTimeS();

        // frame, center, blob_area = this.blobDetect(rawframe)
        // console.log(f'stepGame center {center}')
        // if blob_area >= this.blob_area:
        //     new_loc = np.array(center) 
        //     // console.log(f'Observed location is {new_loc}')
        //     if this.mirror:
        //         new_loc = this.flipMarkerPosition(new_loc, center)
        //         // console.log(f'Changed location is {new_loc}')
        // else:
        //     new_loc = np.array(this.player.loc)


        // new_loc = this.rotateMarkerPosition(new_loc)
        // console.log(f'Final location is {new_loc}')

        // console.log(f'Stepgame new_loc {new_loc}')
        // this.player.updatePosition(new_loc, this.curr_time)
        // console.log(f'this.player.loc in stepGame after update {this.player.loc}')

        var new_obstacle = new Array();
        var resetobstacle_count = false;
        this.check_targets = false;
        if (this.frame_id == 1){
            this.player.obs_start = getTimeS();
        }

        var new_marker_no = 0;
        for (c = 0; c < this.curr_obstacle.length; c++) {//o in this.curr_obstacle:
            var o = this.curr_obstacle[c];
            o.updatePosition(this.curr_time, this.player.loc, this.player.radius, this.magnetic_coef);
            //Check for collision of player && marker - is this happens, score change && reset obstacle count
            if (o.checkCollision(this.player, this.scaling_factor/2)){
                var addscore = this.updateScore(o);
                
                // if o.obstacle_type == 'Exploding':
                    // pygame.mixer.Sound.play(this.error_sound);
                    // pygame.time.delay(500)

                // else:
                    // try:
                    //     p = max( i for i,o in enumerate(addscore - np.array([0, 8, 15])) if o > 0);
                    // except:
                    //     p = 0;
                    // pygame.mixer.Sound.play(this.win_sound[p])
                resetobstacle_count = true;
                new_marker_no = o.new_marker_no;
                this.display_score = 1;
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
                new_obstacle.append(o);
            }

            // This case will only be entered when the marker is 'Exploding' && still in frame / not collided with player
            else{
                new_obstacle.append(o)
            }

        // if this.stationary && not this.check_targets:
        //     // console.log('Here')
        //     resetobstacle_count = true //this.obstacle_count += 1
            // new_marker_no = o.new_marker_no

        this.curr_obstacle = new_obstacle; // Effectively removed collided || out of frame markers

        if (resetobstacle_count){
            // Resetting obstacle count. 
            // If this.check_targets is still false, the new count will necessarily be 1 more than the last length
            // Otherwise, the new count will be new_marker_no - from seeds
            this.newobstacle_count(new_marker_no, this.curr_obstacle);
        }

        // this.check_targets has not been updates so it will still be false if null of the obstacles still on screen are 'Regular'
        while (this.curr_obstacle.length < this.obstacle_count){
            this.cur_obstacle_id += 1;
            this.curr_obstacle.append(Obstacle((this.original_frame_tuple[1], this.original_frame_tuple[0]), \
                                                        this.current_time, this.exploding_perc, \
                                                        this.velocity_max, this.velocity_min, \
                                                        this.acceleration, this.theta_max, this.theta_min,\
                                                        this.max_obs_time, this.max_unobs_time, cur_id = this.cur_obstacle_id));

            //// The following commented code is required for older curriculums where obstacle properties were being changed.
            // if this.player.attempt in [1,2,3,38,39,40] && this.game_type in ['Curriculum', 'Regular']:
                // this.game_obstacles = json.load(open(resource_path(f'GameSeeds_{this.player.attempt}.json'),'r'))
            // 
            // if this.game_type == 'Control' || (this.game_type == 'Curriculum' && this.player.attempt in [1,2,3,34,35,36,37,38,39,40]):
            // if not (this.game_type == 'Curriculum' && this.player.attempt in training_attempts):
                // this.curr_obstacle[-1].setObstacleParams(**this.game_obstacles[str(this.seeds_used)])
                // this.seeds_used += 1
                // console.log(f'Here for attempt {this.player.attempt}')

            // training_attempts = [5,6,7,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,36]
            // if not (this.game_type == 'Curriculum' && this.player.attempt in training_attempts):
            // if not (this.player.attempt in training_attempts):
                // this.curr_obstacle[-1].setObstacleParams(**this.game_obstacles[str(this.seeds_used)])
                // this.seeds_used += 1

            if (this.curr_obstacle[-1].obstacle_type == 'Regular'){
                this.check_targets = true   // Checking if the newly added marker is regular - note that if this was previously false a new marker will necessarily be created
            }

            // if len(this.curr_obstacle) == this.obstacle_count && this.check_targets == false:
            //     this.curr_obstacle[-1].setRegularObstacle()

        // if this.stationary && not this.check_targets:
        if not this.check_targets{
        // If after all this null of the new markers is 'Regular', the most recently created marker will become 'Regular' forcibly
        // Note that this will always be a newly created marker in the above while loop
            this.curr_obstacle[-1].setRegularObstacle()
        }
    }

    // blobDetect(frame):
    //     center = [0, 0]
    //     hsv = cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)
    //     mask = cv2.inRange(hsv, this.lower, this.upper)

    //     contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_null)
    //     blob_area = 0
    //     if len(contours) > 0:
    //         blob = max(contours, key=lambda el: cv2.contourArea(el))
    //         M = cv2.moments(blob)
    //         if M["m00"] > 0:
    //             center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
    //             cv2.circle(frame, center, this.player.radius, (0,0,255), -1)
    //         cv2.drawContours(frame, [blob],-1, (0,255,0), 3)
    //         blob_area = cv2.contourArea(blob)

    //     if this.saveframe:
    //         this.gamelog.saveImage(frame)

    //     // console.log(f'Bloc detect center {center}')
    //     return frame, center, blob_area

    // resetBounds(this,lower = [170, 180,70], upper = [180, 255,255]):
    //     this.lower = np.array(lower, dtype = "uint8")
    //     this.upper = np.array(upper, dtype = "uint8")

    // pickColor():
    //     ret, frame = this.video_capture.read()
    //     frame = cv2.flip(frame, 1)
    //     pos = pygame.mouse.get_pos()
    //     x = int((pos[0] - this.frame_offset)*this.width_ratio)
    //     y = int(pos[1]*this.height_ratio)
    //     image_hsv = cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)
    //     try:
    //         pixel = image_hsv[y, x]
    //     except:
    //         pixel = image_hsv[0,0]

    //     // you might want to adjust the ranges(+-10, etc):
    //     upper_new =  np.clip(np.array([pixel[0] + 10, pixel[1] + 80, pixel[2] + 100]), 0, 255)
    //     lower_new =  np.clip(np.array([pixel[0] - 10, pixel[1] - 80, pixel[2] - 100]), 0, 255)

    //     this.resetBounds(lower_new, upper_new)
    //     frame, center, blob_area = this.blobDetect(frame)
    //     this.blob_area = blob_area*0.1

    waitGame(call_time){
        while ((getTimeS() - call_time) < this.wait_time):
            // this.game_display.fill([255,255,255])
            var text_center = [gameCanvas.width/2, gameCavas.height/2 - 50]; //((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2 - 50))
            // this.messageDisplay(f"Attempt {this.player.attempt+1}", text_center, this.textcolor["black"])
            msg = "Attempt" + (this.player.attempt+1);
            this.writeOnCanvas(gameCanvas, msg, text_center, "black");
            text_center = [gameCanvas.width/2, gameCavas.height/2 + 50]; 
            msg = this.wait_time - (getTimeS() - call_time);
            this.writeOnCanvas(gameCanvas, msg, text_center, "black");
            // var text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2)+50);
            // this.messageDisplay(f"{int(this.wait_time - (time.time() - call_time))}", text_center, this.textcolor["black"])
            // pygame.display.update()
    }

    // textObjects(text, font, color){
    //     var text_surface = font.render(text, true, color);
    //     return text_surface, text_surface.get_rect();
    // }

    // getTextRect(text, textsize_type = 'medium', color = (0,0,0)){
    //     font = this.textsize[textsize_type];
    //     var text_surface = font.render(text, true, color);
    //     return text_surface.get_rect();
    // }

    // messageDisplay(text, text_center, color, textsize_type = "medium"):
    //     // large_text = pygame.font.Font('freesansbold.ttf',200)
    //     // medium_text = pygame.font.Font('freesansbold.ttf',100)
    //     // small_text = pygame.font.Font('freesansbold.ttf',20)
        
    //     text_surf, text_rect = this.textObjects(text, this.textsize[textsize_type], color);
    //     text_rect.center = text_center;
    //     this.game_display.blit(text_surf, (text_rect[0], text_rect[1]));
        
    newobstacle_count(new_marker_no = 5, curr_obstacle = []){
        //// Commenting this clock because we have already checked for this condition. Whether false || true we have checked whether any markers in curr_obstacle are Regular
        // this.check_targets = false
        // for o in curr_obstacle:
        //     if o.obstacle_type == 'Regular':
        //         this.check_targets = true

        if (this.check_targets == false){
            // console.log(f'Old obstacle count {this.obstacle_count}')
            // console.log(new_marker_no)
            // if len(curr_obstacle) + 1 < new_marker_no + 1: //this.max_obstacles+1:
            //     this.obstacle_count = new_marker_no //this.rs.randint(len(curr_obstacle)+1,this.max_obstacles+1) //np.random.randint(len(curr_obstacle)+1,this.max_obstacles+1) 
            // else:
            this.obstacle_count = max(len(curr_obstacle) + 1, new_marker_no + 1); //this.max_obstacles + 1)
            // console.log(f'New obstacle count {this.obstacle_count}')
        }
        else{
            this.obstacle_count = new_marker_no; //this.rs.randint(this.min_obstacles,this.max_obstacles+1) //np.random.randint(this.min_obstacles,this.max_obstacles+1)
        }
    }

    updateScore(marker){
        var addscore = 0;
        if (marker.obstacle_type == 'Exploding'){
            addscore = -10;
        }
        else{
            var size_effect = (marker.max_radius - marker.radius) / (marker.max_radius - marker.min_radius);
            var velocity_effect = (marker.original_velocity/marker.velocity_scale)/(this.velocity_max);
            // console.log(f'size {size_effect}, velocity {velocity_effect}')
            addscore = 10 + int(10*size_effect) + int(10*velocity_effect);
        }
        this.player.score = this.player.score + addscore;
        return addscore;
    }

    initializeNewGame(){
        this.gamelog.game_type = this.game_type;
        this.game_mode = 'InPlay';
        this.display_score = 0;
        this.old_score = 0;
        this.current_time = getTimeS();
        this.player.newGameInit(this.current_time);
        
        console.log(f'Attempt {this.player.attempt}');
        this.player.resetObsTime(1,0);

        // if this.player.attempt in [1,38]:
        //     this.rs = np.random.RandomState(38)
        // else if this.player.attempt in [2,39]:
        //     this.rs = np.random.RandomState(39)
        // else if this.player.attempt in [3,40]:
        //     this.rs = np.random.RandomState(40)
        // else:
        //     this.rs = np.random.RandomState(null)

        if (this.game_type == 'Curriculum' && this.player.attempt <= 40){
            this.initializeGameType(**this.game_params[str(this.player.attempt)])
            this.player.resetObsTime(this.game_params[str(this.player.attempt)]['max_obs_time'],
                                        this.game_params[str(this.player.attempt)]['max_unobs_time'])
        }
            // console.log('Curriculum')
        else if (this.game_type == 'Control'){
            this.initializeGameType(**this.game_params[str(1)])
            this.player.resetObsTime(1,1)
        }
            // console.log('Regular')        
        // else if this.game_type == 'PositiveDamped':
        //     this.initializeGameType()
        //     this.resetDamping(damping = 10)
        //     // this.player.setObservable()
        //     // console.log('PositiveDamped')
        
        // else if this.game_type == 'NegativeDamped':
        //     this.initializeGameType()
        //     this.resetDamping(damping = -10)
        //     // this.player.setObservable()
        //     // console.log('NegativeDamped')
        
        // else if this.game_type == 'MaxUnobservable':
        //     this.initializeGameType()
        //     this.player.resetObsTime(1,1) // this.player.resetObsTime(0.75,1)
        //     // console.log('MaxUnobservable')
        
        // else if this.game_type == 'Mirror':
        //     this.mirror = true
        //     this.player.mirror = true
        //     // console.log('Mirror')
        
        // else if this.game_type == 'Rotated':
        //     ang = 45
        //     this.resetRotationAngle(ang)
        //     // console.log(f'Rotated {ang} degrees')
        
        // else if this.game_type == 'SingleTarget':
        //     this.initializeGameType(exploding_perc = 1, min_obstacles = 3)
        //     // console.log('SingleTarget')
        
        // else if this.game_type == 'MagneticField':
        //     // magnetic_coef = 5
        //     this.initializeGameType(magnetic_coef = 5000)
        //     // console.log('MagneticField')
        
        // else if this.game_type == 'MagneticUnobservable':
        //     this.initializeGameType(magnetic_coef = 5000)
        //     this.player.resetObsTime(1,1)
                    
        // else if this.game_type == 'UnobservableDamped':
        //     this.initializeGameType()
        //     this.player.resetObsTime(1,1)
        //     this.resetDamping(damping = -10)

        // else if this.game_type == 'DampedMagnetic':
        //     this.initializeGameType(magnetic_coef = 5000)
        //     this.resetDamping(damping = -10)
        
        // else if this.game_type == 'MagneticDampedUnobservable':
        //     this.initializeGameType(magnetic_coef = 5000)
        //     this.resetDamping(damping = -10)
        //     this.player.resetObsTime(1,1)
        else:
            console.log('How did you get here?')
            this.crashed = true

        // console.log(this.game_type)

        // this.player.exploding_perc = 0.9
        // console.log('Exploding percentage forced to 0.9 - Remove')

        this.newobstacle_count();
        this.curr_obstacle = [];
        this.seeds_used = 0;
        this.cur_obstacle_id = 0;
        this.check_targets = false;
        while (this.curr_obstacle.length < this.obstacle_count){
            this.cur_obstacle_id += 1;
            this.curr_obstacle.append(Obstacle((this.original_frame_tuple[1], this.original_frame_tuple[0]), \
                                                this.current_time, this.exploding_perc, \
                                                this.velocity_max, this.velocity_min, \
                                                this.acceleration, this.theta_max, this.theta_min,\
                                                this.max_obs_time, this.max_unobs_time, cur_id = this.cur_obstacle_id));

            //// The following commented code is required for older curriculums where obstacle properties were being changed.
            // // if this.game_type == 'Control' || (this.game_type == 'Curriculum' && this.player.attempt in [1,2,3,34,35,36,37,38,39,40]):
            // if not (this.game_type == 'Curriculum' && this.player.attempt in range(4,34)):
            //     this.game_obstacles = json.load(open(resource_path(f'JsonFiles/GameSeeds_{this.player.attempt}.json'),'r'))
            //     this.curr_obstacle[-1].setObstacleParams(**this.game_obstacles[str(this.seeds_used)])
            //     this.seeds_used += 1
            // // console.log(f'Here for attempt {this.player.attempt}')

            // this.game_obstacles = json.load(open(resource_path(f'JsonFiles/Player_3/GameSeeds_{this.player.attempt}.json'),'r'))

            // training_attempts = [5,6,7,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,36]
            // if not (this.player.attempt in training_attempts):
            //     this.curr_obstacle[-1].setObstacleParams(**this.game_obstacles[str(this.seeds_used)])
            //     this.seeds_used += 1            
                
            if (this.curr_obstacle[-1].obstacle_type == 'Regular'){
                this.check_targets = true
            }
        }
        if (!this.check_targets){
            this.curr_obstacle[-1].setRegularObstacle()
        }
    }

    // displayDefault(saveframe = false){
    //     ret, frame = this.video_capture.read()
    //     rawframe = cv2.flip(frame, 1)
    //     frame = this.videoFrameToPyGameDisplay(frame)
    //     this.game_display.fill([0,0,0])
    //     this.game_display.blit(frame, (this.frame_offset,0))
        
    //     // if this.game_mode == null:
    //     pygame.draw.rect(this.game_display, this.textcolor["gray"], this.start_button)
    //     this.messageDisplay("Start Game", (this.start_button.center), this.textcolor["black"], textsize_type = "small")
    //     pygame.draw.rect(this.game_display, this.textcolor["gray"], this.calibrate_button)
    //     this.messageDisplay("Calibrate", (this.calibrate_button.center), this.textcolor["black"], textsize_type = "small")
    //     pygame.draw.rect(this.game_display, this.textcolor["gray"], this.test_button)
    //     this.messageDisplay("Test", (this.test_button.center), this.textcolor["black"], textsize_type = "small")
    //     text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/6))
    //     this.messageDisplay(f"Test frame rate is {this.test_FR}", text_center, this.textcolor["black"], textsize_type = "small")
        
    //     pygame.display.update()
    // }

    // updateGamelog():
    //     this.gamelog.startPlayerLine(this.current_time, this.player, (this.obstacle_count + 1), this.game_type)
    //     this.gamelog.addObstacleLine(this.curr_obstacle)
    //     this.gamelog.writeLogLine()
    //     this.gamelog.clearLogLine()

    // calibrateGame():
    //     call_time = time.time()

    //     console.log('Calibration Start')
    //     while (time.time() - call_time) < this.wait_time:
    //         this.saveframe = false
    //         this.displayDefault()
    //         text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2))
    //         this.messageDisplay(f"{this.wait_time - int(time.time() - call_time)}", text_center, this.textcolor["black"])
    //         pygame.display.update()

    //     call_time = time.time()
    //     while (time.time() - call_time) < this.wait_time:
    //         // this.saveframe = true     //  NEED TO CHANGE THIS BACK TO CAPTURE IMAGES
    //         this.frame_id += 1
    //         this.displayDefault()
    //         text_center = ((this.frame_size_tuple[0]/2) + this.frame_offset,(this.frame_size_tuple[1]/2))
    //         this.messageDisplay(f"{this.wait_time - int(time.time() - call_time)}", text_center, this.textcolor["green"])
    //         pygame.display.update()

    //     console.log('Calibration End')

    //     this.saveframe = false

    // testGame():
    //     call_time = time.time()
    //     this.gamelog.createTestLogger()
    //     console.log('Test Start')
    //     while (time.time() - call_time) < this.test_duration:
    //         ret, frame = this.video_capture.read()
    //         frame = cv2.flip(frame, 1)
    //         this.curr_time = time.time()

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
    //         this.messageDisplay(f"{int(this.test_duration - (time.time() - call_time))}s", \
    //                                                     (this.frame_size_tuple[0] + int(this.frame_offset*3/2), this.frame_size_tuple[1]/2), this.textcolor["gray"])
    //         text_rect = this.getTextRect(f"{int(this.test_duration - (time.time() - call_time))}") // TO CHANGE
    //         this.messageDisplay('Time:', (this.frame_size_tuple[0] + int(this.frame_offset*3/2), this.frame_size_tuple[1]/2 - text_rect[3]), this.textcolor["gray"], "small")

    //         this.gamelog.addTestLine((time.time() - call_time), this.player.loc)

    //         pygame.display.update()

    //     this.test_FR = this.frame_id/this.test_duration
    //     console.log(f"Test Frame Rate is {this.test_FR}")


    // flipMarkerPosition(new_loc, center):
    //     new_loc[0] = this.original_frame_tuple[0] - center[0]
    //     new_loc[1] = center[1]
    //     return new_loc

    // resetRotationAngle(this,rot_angle = 0):
    //     this.rotation_angle = rot_angle //degrees

    // rotateMarkerPosition(new_loc):
    //     // console.log(shape)
    //     shape = this.original_frame_tuple
    //     new_loc = new_loc - np.array((shape[0], shape[1]))/2
    //     c, s = np.cos(this.rotation_angle*np.pi/180), np.sin(this.rotation_angle*np.pi/180)
    //     R = np.array(((c, -s), (s, c)))
    //     new_loc = R.dot(new_loc) + (np.array((shape[0], shape[1])))/2
    //     return new_loc

}