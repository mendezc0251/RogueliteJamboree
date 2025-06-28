
class Resources{
    constructor(){
        // Everything we want to download
        this.toLoad = {
            headerBack: '../../public/assets/HeaderA.png',
            peg: '../../public/assets/Peg.png',
            hitPeg: '../../public/assets/PegHit.png',
            coin: '../../public/assets/Coin.png',
            pBackImg1: '../../public/assets/cloud1.png',
            pBackImg2: '../../public/assets/cloud2.png',
            pBackImg3: '../../public/assets/cloud3.png',
            pBackImg4: '../../public/assets/cloud4.png',

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