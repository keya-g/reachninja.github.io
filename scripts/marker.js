class marker{
    constructor(markertype = 'Unlabeled'){
        this.min_radius = 5;
        this.max_radius = 10;
        this.perc_obs = 0;
        this.max_unobs_time = 0.15;
        this.max_obs_time = 1;
        this.unobs_start = -1;
        this.marker_color = (0,255,0);
        this.visible = true;
        this.resetMarker(markertype);
    }

    resetMarker(marker_type = 'Unlabeled'){
        this.type = marker_type;
        this.setRadius(Math.floor(Math.random()*(this.max_radius+1 - this.min_radius) + this.min_radius));
        this.setObservable();
        this.setStartTime();
        this.obs_start = getTimeS();
    }

    setRadius(rad ){
        this.radius = rad;
    }

    setObservable(){
        this.observable = true;
    }

    setPartialObservable(){
        this.observable = false;
    }

    changeObsPerc(new_perc){
        this.perc_obs = new_perc;
    }

    checkObservable(curr_time){
        if (this.max_unobs_time == 0){
            this.observable = true;
        }

        if (this.observable == false){
            if (((curr_time - this.obs_start) > this.max_obs_time && this.unobs_start == -1) || 
                             +   ((curr_time - this.unobs_start) < this.max_unobs_time && this.obs_start == -1)){
                this.visible = false;
                this.obs_start = -1;
                if (this.unobs_start == -1){
                    this.unobs_start = curr_time;    
                }
            }         
            else{
                this.visible = true;
                this.unobs_start = -1;
                if (this.obs_start == -1){
                    this.obs_start = curr_time;
                }
            }
        }                    
        else{
            this.visible = true;
            this.unobs_start = -1;
            if (this.obs_start == -1){
                this.obs_start = curr_time;
            }
        }
            
        
        return this.visible;
    }

    setStartTime(start_time = -1){
        this.start_time = start_time;
    }
}