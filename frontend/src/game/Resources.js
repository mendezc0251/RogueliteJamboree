
class Resources{
    constructor(){
        // Everything we want to download
        this.toLoad = {
            headerBack: '../../src/assets/HeaderA.png',
            peg: '../../src/assets/Peg.png',
            hitPeg: '../../src/assets/PegHit.png',
            coin: '../../src/assets/Coin.png',
            pBackImg1: '../../src/assets/cloud1.png',
            pBackImg2: '../../src/assets/cloud2.png',
            pBackImg3: '../../src/assets/cloud3.png',
            pBackImg4: '../../src/assets/cloud4.png',

        };

        this.images = {};

        // Load each image
        Object.keys(this.toLoad).forEach(key=>{
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key]={
                image: img,
                isLoaded:false
            }
            img.onload=()=>{
                this.images[key].isLoaded = true
            }
        })
    }
}

export const resources = new Resources();