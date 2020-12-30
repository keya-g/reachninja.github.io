class player extends marker{
    constructor(gameshape, damping, mirror, id = 1, old_loc_wt = 0.3, new_loc_wt = 0.7){
        super("Player");
        this.id = id;
        this.shape = gameshape;
        this.attempt = 0;   // TO CHANGE
        this.setRadius(10);
        this.loc = [gameshape[1]/2, gameshape[0]/2];
        this.last_time = -1;
        this.setScore();
        this.setStartTime();
        this.setPartialObservable();
        this.perc_obs = 0; //np.clip(np.random.rand(),0.5,1)  
        this.obstacle_count = 0;
        this.exploding_perc = 0.3;
        this.marker_color = "red"; // (255,0,0);
        this.vel = [0,0];
        this.acc = [0, 0];
        // this.old_loc_wt; // originally 0.3 TO CHANGE // 0.5 for damped
        // this.new_loc_wt;  // originally 0.7 TO CHANGE // 0.5 for damped
        this.gameType = 0;
        this.check_targets = false;
        // this.mirror = mirror
        this.resetDamping(damping, old_loc_wt, new_loc_wt);
    }
    resetDamping(damping = 0, old_loc_wt = 0.3, new_loc_wt = 0.7){
        this.damping = damping; 
        var scale_mat = [[1,0],[0,1]];
        this.damping_mat = scaleMatrix(scale_mat,this.damping);
        //this.damping*np.array(((1, 0),(0, 1))); // A positive damping value will cause overshoot, negative will cause undershoot
        // this.damping_mat = this.damping*np.array(((-1, -1),(-1, 1)))    // Shadmehr , R. & Mussa-Ivaldi , F. A. ( 1994 ). Adaptive representation of dynamics during learning of a motor task. Journal of Neuroscience , 74 ( 5 ), 3208 – 3224 . 
        this.old_loc_wt = old_loc_wt; // originally 0.3 TO CHANGE // 0.5 for damped
        this.new_loc_wt = new_loc_wt; // originally 0.7 TO CHANGE // 0.5 for damped1
        // print(f'Setting damping value to {this.damping}, {this.damping_mat}')
        // print(f'param {old_loc_wt}, old loc wt {this.old_loc_wt}, new loc wt {this.new_loc_wt}')
    }

    resetMovementParams(newplayer){
        this.loc = newplayer.loc;
        this.vel = newplayer.vel;
        this.acc = newplayer.acc;
        this.last_time = newplayer.last_time;
    }

    resetObsTime(max_obs_time = 1, max_unobs_time = 0.15){
        // print(f'{max_obs_time} {max_unobs_time}')
        this.max_obs_time = max_obs_time;
        this.max_unobs_time = max_unobs_time;
    }
    
    setShape(shape = np.array((480, 640))){
        this.shape = shape;
    }

    updateAcceleration(){
        // Shadmehr , R. & Mussa-Ivaldi , F. A. ( 1994 ). Adaptive representation of dynamics during learning of a motor task. Journal of Neuroscience , 74 ( 5 ), 3208 – 3224 . 
        this.acc = [arrayDot(this.damping_mat[0],this.vel), arrayDot(this.damping_mat[1],this.vel)];
        // (this.damping_mat[0]*this.vel[0] + this.damping_mat[1]*this.vel[1]);
        // print(this.acc)
    }

    updatePosition(new_loc, curr_time){  
        // console.log('newloc', new_loc);      
        var av_loc = arraySum(this.loc, scaleArray(this.vel, (curr_time - this.last_time)));//this.loc + this.vel*(curr_time - this.last_time);
        // console.log('av_loc', av_loc);
        // this.old_loc_wt = 0.3; 
        if (new_loc != this.loc){
            av_loc = arraySum(scaleArray(av_loc,this.old_loc_wt), scaleArray(new_loc,this.new_loc_wt));
        }
        av_loc[0] = clamp(av_loc[0], 0, this.shape[0]);
        av_loc[1] = clamp(av_loc[1], 0, this.shape[1]);
        // console.log('newloc', new_loc, 'av_loc2',av_loc);
        // print(f"vel: {this.vel}")
        this.updateAcceleration();
        // console.log('new acc', this.acc);
        // print(f'New acceleration is {this.acc}, Old vel is {this.vel}')

        var newvel = clamp(arraySum(scaleArray(arraySum(av_loc, scaleArray(this.loc,-1)), 1/(curr_time - this.last_time)), scaleArray(this.acc,(curr_time - this.last_time))), 0, 300);
        if (!(isFinite(av_loc[0]*this.loc[0]*(-1))) || !(isFinite(1/(curr_time - this.last_time)))){
            // console.log('here', arraySum(av_loc, scaleArray(this.loc,-1)), 1/(curr_time - this.last_time))
            newvel = this.vel;
        }
        this.vel = newvel;
        // console.log('newvel', this.vel);
        // print(f"velnew: {this.vel}")
        this.loc = av_loc;
        // print(f"newloc: {this.loc}")
        // console.log('new loc ', this.loc);
        this.last_time = curr_time;
    }

    setScore(){
        this.score = 0;
    }

    setPlayTime(play_time = 60){
        this.play_time = play_time;//int(input("How long will you play for"))
    }

    setPlayID(){
        var d = new Date();
        this.play_id = d.getDate()+ "-" + d.getMonth() + "-" + d.getYear() + 
                            "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();// datetime.datetime.now().strftime("%d-%m-%Y_%H-%M-%S");
    
    }

    newGameInit(curr_time){
        this.setScore();
        this.setPlayTime();
        this.setStartTime(curr_time);
        this.setPartialObservable();
        this.setPlayID();
        this.attempt += 1;
    }

}