class gamelog{
    constructor(player, game_id){
        this.player_id = player.id;
        this.game_id = game_id;
        this.player_folder = "LogFiles/Player_" + this.player_id;
        this.datalog = "";
        // this.createDefaultLogFolder();
    }
        
        
    // createDefaultLogFolder(){
    //     os.makedirs(this.player_folder, exist_ok = true);
    //     this.calibration_log_folder = this.player_folder + "/Calibration_" + this.game_id;
    //     this.savefolder = this.calibration_log_folder;
    //     os.makedirs(this.calibration_log_folder, exist_ok = true);
    //     this.frame_id = 1;
    // }

    newGameLog(attempt, init_line, max_obstacle_count = 6){
        
        this.attempt = attempt; 
        this.logLineArray = [""];   
        this.frame_id = 0;
        // this.image_log_folder = "{this.player_folder}/Game_{this.attempt}_{this.game_id}"
        // this.savefolder = this.image_log_folder
        // os.makedirs(this.image_log_folder, exist_ok = true)
        // this.createLogger()
        this.addLine(init_line);
        this.addHeaders(max_obstacle_count, init_line);
        this.writeLogLine();
    }

    // createLogger(){
        // this.logger_name = this.player/Log_{this.attempt}_{this.game_id}.log'
        // this.logger = logging.getLogger(this.logger_name)
        // this.logger.setLevel(logging.INFO)
        // format_string = ("%(message)s")
        // log_format = logging.Formatter(format_string)
        
        // # Creating and adding the file handler
        // this.file_handler = logging.FileHandler(this.logger_name, mode='a')
        // this.file_handler.setFormatter(log_format)
        // this.logger.addHandler(this.file_handler)
        // this.frame_id = 1

    // createTestLogger(){
    //     this.logger_name = f'{this.player_folder}/Test_{datetime.datetime.now().strftime("%d-%m-%Y_%H-%M-%S")}.log'
    //     this.logger = logging.getLogger(this.logger_name)
    //     this.logger.setLevel(logging.INFO)
    //     format_string = ("%(message)s")
    //     log_format = logging.Formatter(format_string)

    //     # Creating and adding the file handler
    //     this.file_handler = logging.FileHandler(this.logger_name, mode='a')
    //     this.file_handler.setFormatter(log_format)
    //     this.logger.addHandler(this.file_handler)
    //     this.frame_id = 0

    //     this.logLine = ['Frame','Time', 'Attempt', \
    //                     'Player{X', 'Player{Y'] 
    //     this.writeLogLine()
    //     this.clearLogLine()

    // addTestLine(test_time, player_loc){
    //     this.frame_id += 1
    //     this.logLine = [this.frame_id, test_time, -1, \
    //                     player_loc[0], player_loc[1]]
    //     this.writeLogLine()
    //     this.clearLogLine()
        
    addHeaders(max_obstacle_count, init_line){
        
        this.logLine = ["Frame,Time,Attempt,"+ 
                        "Play ID,Marker_nos,"+
                        "Player:X,Player:Y,"+
                        "PlayerVel:X,PlayerVel:Y,"+
                        "PlayerAcc:X,PlayerAcc:Y,"+
                        "Player:Int,Player:Score,"+
                        "Player:Obs,Player:GameType"];
        for (var i = 1; i < max_obstacle_count+1; i++){
            this.logLine+=',';
            this.logLine+="M" + i + ":ID,";
            this.logLine+="M" + i + ":Type,";
            this.logLine+="M" + i + ":Rad,";
            this.logLine+="M" + i + ":PX,";
            this.logLine+="M" + i + ":PY,";
            this.logLine+="M" + i + ":VX,";
            this.logLine+="M" + i + ":VY,";
            this.logLine+="M" + i + ":AX,";
            this.logLine+="M" + i + ":AY";
        }
        this.addLine(this.logLine);
        this.clearLogLine();
    }

    startPlayerLine(curr_time, player, obstacle_count, game_type, intervention_type = 0){
        this.frame_id += 1;
        this.logLineArray = [this.frame_id, curr_time - player.start_time, player.attempt, player.play_id, obstacle_count, +
                        player.loc[0], player.loc[1], player.vel[0], player.vel[1], player.acc[0], player.acc[1],+
                        intervention_type, player.score, player.visible, game_type];
                    }

    addObstacleLine(curr_obstacles){
        for(let i = 0; i < curr_obstacles.length; i++){
            let o = curr_obstacles[i];
            this.logLineArray+=',' + (o.obstacle_id);
            this.logLineArray+=',' + (o.obstacle_type);
            this.logLineArray+=',' + (o.radius);
            this.logLineArray+=',' + (o.loc[0]);
            this.logLineArray+=',' + (o.loc[1]);
            this.logLineArray+=',' + (o.velocity[0]);
            this.logLineArray+=',' + (o.velocity[1]);
            this.logLineArray+=',' + (o.acceleration[0]);
            this.logLineArray+=',' + (o.acceleration[1]);
        }
        // console.log(this.logLineArray);
    }
    writeLogLine(){
        // this.logLine = this.logLineArray.join(',');
        // console.log("\n"+this.logLineArray);
        this.addLine(this.logLineArray);
        this.clearLogLine();
    }

    addLine(line){
        this.datalog+="\n"+line;
    }

    clearLogLine(){
        this.LogLine = [];
        this.logLineArray = [];
    }

    // saveImage(frame){
    //     cv2.imwrite("{this.savefolder}/{this.frame_id{010d}.png",frame)

}
