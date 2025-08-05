import {GameObject} from './GameObject'

export class CollisionEffect extends GameObject {
    constructor({position, duration=200}){
        super({ position })
        this.duration = duration
        this.elapsed = 0
    }

    step(delta, root){
        this.elapsed+=delta
        if(this.elapsed>this.duration){
            if(this.parent){
                this.parent.removeChild(this)
            } else if (root){
                root.removeChild(this)
            }
        }
    }

    drawImage(ctx, x, y){
        ctx.fillText("+1", x , y)
    }
}