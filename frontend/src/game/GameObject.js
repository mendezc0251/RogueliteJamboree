export class GameObject{
    constructor({x,y}){
        this.x = x
        this.y = y
        this.children = [];
    }
    // entry point of the loop
    stepEntry(delta, root){
        this.children.forEach((child)=> child.stepEntry(delta, root));

        this.step(delta, root)
    }

    step(_delta){

    }

    draw(ctx,x,y){
        const drawPosX=x+this.x;
        const drawPosY = y+this.y;

        this.drawImage(ctx, drawPosX, drawPosY)

        this.children.forEach((child) => child.draw(ctx,drawPosX,drawPosY));
    }

    drawImage(ctx,drawPosX,drawPosY){

    }

    addChild(gameObject){
        this.children.push(gameObject);
    }

    removeChild(gameObject){
        this.children = this.children.filter(g =>{
            return gameObject !== g;
        })
    }
}