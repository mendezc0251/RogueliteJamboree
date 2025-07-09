export class Upgrades {

    constructor(displayWidth,displayHeight,gameState) {
        this.gameState=gameState;
        
        const addCoin = () => {
            this.gameState.coins += 1
            console.log("Ball added!")
        }
        let bounceLevel = 0;
        const addBounce = () => {
            bounceLevel += 1
            let bounceFactor = 1 - 0.5 * Math.exp(-0.2 * bounceLevel)
            this.gameState.bfNum = bounceFactor
            console.log("Bounce added", this.gameState.bfNum)
        }

        const highRiskReward = () => {
            this.gameState.multiplier.push("x2")
            this.gameState.multiplier.push("x.5")
            console.log("Multiplier pool loaded!")
        }

        const addRows = () => {
            this.gameState.maxWorldHeight+=320
            this.gameState.pegRows+=1
            console.log("Rows added to game board!")
        }

        const morePegHits = () => {
            this.gameState.pegHits += 1
            console.log("Peg's reinforced!")
        }
        const moreAmmo = () =>{
            this.gameState.maxAmmo += 1
            this.gameState.ammo=this.gameState.maxAmmo
            console.log("+1 Ammo")
        }
        // array that holds all available upgrades
        this.upgrades = [
            { text: "+1 Ball", description: "Adds a extra coin to the drop", onClick: addCoin },
            { text: "Bouncier coins!", description: "Adds more bounce to coins", onClick: addBounce },
            { text: "High risk! High reward!", description: "Adds higher chance to get .5x and 2x multipliers", onClick: highRiskReward },
            { text: "+2 rows", description: "Adds another row to the Pachinko board", onClick: addRows },
            { text: "Reinforced pegs", description: "Allows a ball to score twice on the same peg", onClick: morePegHits },
            { text: "+1 Ammo", description: "Adds a extra coin to your ammo", onClick: moreAmmo }
        ]
        // array to hold upgrades offered to the player
        this.upgradeButtons = [
            { text: null, description: null, x: displayWidth * (1 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
            { text: null, description: null, x: displayWidth * (3 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
            { text: null, description: null, x: displayWidth * (5 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
        ]
    }

    getRandomUpgrades() {
        this.upgradeButtons.forEach(button => {
            let i = Math.floor(Math.random() * this.upgrades.length)
            button.text = this.upgrades[i].text
            button.onClick = this.upgrades[i].onClick
        }
        )
        return this.upgradeButtons
    }
}