export default class GameLoop{
    constructor(update, render){

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60; // 60 fps


        this.update=update;
        this.render=render;

        this.rafId = null;
        this.isRunning=false;
    }

    mainLoop= (timestamp)=>{
        if(!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp

        // Accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;

        // Fixed time step updates.
        // If there's enough acculmulated time to run one or more fixed updates, run
        while(this.accumulatedTime>=this.timeStep){
            console.log("Update")
            this.update(this.timeStep);
            this.accumulatedTime-=this.timeStep;
        }

        //Render
        this.render()

        this.rafId = requestAnimationFrame(this.mainLoop)
    }

    start(){
        if(!this.isRunning){
            this.isRunning=true;
            this.rafId=requestAnimationFrame(this.mainLoop);
        }
    }

    stop(){
        if(this.rafId){
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning=false;
    }
    
}