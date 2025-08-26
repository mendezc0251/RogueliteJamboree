
class Resources{
    constructor(){
        // Everything we want to download
        this.toLoad = {
            headerBack: '/assets/HeaderA.png',
            peg: '/assets/Peg.png',
            hitPeg: '/assets/PegHit.png',
            coin: '/assets/Coin.png',
            pBackImg1: '/assets/cloud1.png',
            pBackImg2: '/assets/cloud2.png',
            pBackImg3: '/assets/cloud3.png',
            pBackImg4: '/assets/cloud4.png',
            fruit: '/assets/Fruit.jpg',
            

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