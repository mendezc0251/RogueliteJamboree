import { GameObject } from './GameObject'

export class Scene extends GameObject{
    constructor(){
        super();
    }

    step(delta,root){
        super.step(delta,root)
    }

    draw(ctx){
        this.drawSelf(ctx)
        super.draw(ctx)
    }

    drawSelf(ctx){

    }
}