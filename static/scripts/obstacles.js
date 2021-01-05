
class obstacles extends marker{
    constructor(gameshape, curr_time, exploding_perc, vel_max = 1, vel_min = 0.5, acc = 100, theta_max = -30, theta_min = -150,max_obs_time = 1, max_unobs_time = 0.15, cur_id = 0, min_obstacles = 1, max_obstacles = 5, damping = 0, mirror = false){
        super('Target');
        this.shape = gameshape;
        // console.log(gameshape);
        this.obstacle_id = cur_id;
        // console.log('In obstacle def ', cur_id)
        this.new_marker_no = 3;
        this.resetObstacle(curr_time, exploding_perc, vel_max= vel_max, vel_min = vel_min, acc = acc, theta_max = theta_max, theta_min = theta_min, max_obs_time = 1, max_unobs_time = 0.15);
        this.obstacle_params = {'x':[0,0], 'velocity': 100, 'theta' : 1.57, 'rad':3,  'type':'Regular' , 'new_marker_no' : 3};
    }

    resetObstacle(curr_time, exploding_perc, vel_max = 1, vel_min = 0.5, acc = 100, theta_max = -30, theta_min = -90, max_obs_time = 1, max_unobs_time = 0.15){
        
        this.x = Math.ceil(Math.random()*gameCanvas.width); //np.around(np.random.rand(1)*this.shape[1]);
        this.y = 0;
        this.velocity_scale = 500;
        this.velocity =  clamp(Math.random(), vel_min, vel_max)*this.velocity_scale//np.random.uniform(low = vel_min, high = vel_max, size = 1)*this.velocity_scale; //np.clip(np.random.rand(1),vel_min,vel_max)*this.velocity_scale
        this.theta = Math.ceil(Math.random()*(theta_max - theta_min) + theta_min)*Math.PI/180 //np.random.randint(theta_min, theta_max)*np.pi/180;
        // // print(f'loc {this.x}, Old {this.theta*180/np.pi}')

        if (this.x > this.shape[1]/2){
            this.theta = -Math.PI - this.theta;
        }

        // // print(f'loc {this.x}, New {this.theta*180/np.pi}')

        // // this.theta = -60*np.pi/180 // TO CHANGE REMOVE
        // // print(f'loc {this.x}, New {this.theta*180/np.pi}')
        this.original_velocity = this.velocity;
        this.velocity = [Math.cos(this.theta)*this.velocity, Math.sin(this.theta)*this.velocity];
        this.acceleration = [0,acc];
        this.loc = [this.x, (this.shape[1] - this.y)];
        // console.log(this.loc);
        // console.log('in reset ' + this.shape);
        this.last_time = curr_time;
        this.inframe = true;
        this.max_unobs_time = max_unobs_time;
        this.max_obs_time = max_obs_time;
        
        // // this.setPartialObservable()
        this.perc_obs = 0; // np.clip(np.random.rand(),0.5,1)  
        this.start_time = getTimeS();
        // // this.marker_color = (0,0,255)
        if (Math.random() < exploding_perc){
            this.setExplodingObstacle();
        }
        else{
            this.setRegularObstacle();
        }
    }

    setObstacleParams(newparams){
        this.obstacle_params = newparams;
        this.x = Math.ceil(this.obstacle_params["x"]*this.shape[0]);
        this.velocity = [this.obstacle_params["velocity"]]*this.velocity_scale;//[np.clip(velocity,0.5,1)*this.velocity_scale]
        this.theta = this.obstacle_params["theta"];
        this.original_velocity = this.velocity;

        // // print(f'x {x}, velocity {velocity}, theta {theta}, rad {rad}, type {type}')
        if (this.x > this.shape[0]/2){
            this.theta = -Math.PI - this.theta;
        }

        // // print(f'loc {this.x}, New {this.theta*180/np.pi}')

        // // this.theta = -60*np.pi/180 // TO CHANGE REMOVE
        // // print(f'loc {this.x}, New {this.theta*180/np.pi}')
        
        this.setRadius(this.obstacle_params["rad"]);

        if (this.obstacle_params.type == 'Exploding'){
            this.setExplodingObstacle();
        }
        else{
            this.setRegularObstacle();
        }

        this.velocity = [Math.cos(this.theta)*this.velocity, Math.sin(this.theta)*this.velocity];
        this.loc = [this.x, (this.shape[1] - 0*this.y)];
        this.new_marker_no = this.obstacle_params["new_marker_no"];
        
    }


    updatePosition(curr_time, player_loc, player_rad, magnetic_coef){
        // console.log('acc' + this.acceleration)
        var vel_change = [0,0];
        var acc_change = [0,0];
        // console.log(this.loc);
        // console.log(player_loc);
        var field_vector = arraySum(this.loc, scaleArray(player_loc,-1)); // this.loc - player_loc;
        // // console.log(field_vector);
        var field_dist = clamp(norm(field_vector),1,1000);
        // console.log(this.loc, player_loc,field_vector,norm(field_vector),this.radius)
        // console.log(acc_change)
        if (field_dist < this.radius*50){
            if (field_dist <= 0.01){
                field_dist = 0.01;
            }
            // console.log(field_vector);
            var field_dir = scaleArray(field_vector, 1/field_dist);
            // vel_change = (magnetic_coef*player_rad*this.radius/(field_dist^2))*field_dir
            acc_change = scaleArray(field_dir,(magnetic_coef*player_rad/(field_dist^2)));
            // console.log('Close enough!', acc_change);
            // print(f"Acc {this.acceleration}, change {acc_change}")
        }
        // // print(f'Mag Coef {magnetic_coef}')
        if (this.obstacle_type == 'Exploding'){
            // vel_change = -vel_change
            acc_change = scaleArray(acc_change,-1);
        }
        // console.log("acceleration", arraySum(acc_change,this.acceleration));
        // console.log(this.velocity)
        // console.log("calculating")
        // this.velocity = np.clip(this.velocity + (curr_time - this.last_time)*this.acceleration + vel_change,-200,200)
        this.velocity = arrayClamp(arraySum(this.velocity, scaleArray(arraySum(acc_change,this.acceleration),(curr_time - this.last_time))),-500,500);
        //clamp(this.velocity + (curr_time - this.last_time)*(this.acceleration+acc_change),-500,500);
        // console.log(this.velocity)
        // console.log("time" + curr_time + "old time" + this.last_time);
        this.loc = arraySum(this.loc,  scaleArray(this.velocity,(curr_time - this.last_time)));//(curr_time - this.last_time)*this.velocity);
        // console.log(this.loc)
        this.last_time = curr_time;
        // print(f"Shape {this.shape}; Loc {this.loc}")
        // console.log(this.shape);
        if (this.loc[0] >= 0 && this.loc[0] < this.shape[0] && this.loc[1] >= 0 && this.loc[1] < this.shape[1]){
            this.inframe = true;
        }
        else{
            this.inframe = false;
        }
        return this.loc;
    }

    checkCollision(player, scaling_factor){
        var dist = arraySum(this.loc, scaleArray(player.loc,-1)) ;
        // console.log(dist);
        return norm(dist)< (this.radius + player.radius)*scaling_factor;
    }
            
    setRegularObstacle(){
        this.obstacle_type = 'Regular';
        this.marker_color = "blue" // (0,0,255);
    }
    setExplodingObstacle(){
        this.obstacle_type = 'Exploding';
        this.marker_color = "black"; // (0, 0, 0);
    }

    

}





