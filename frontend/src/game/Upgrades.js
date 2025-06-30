class Upgrades {

    constructor() {
        // array that holds all available upgrades
        this.upgrades = [
            { text: "+1 Ball", description: "Adds a ball to the drop", onClick: addBall },
            { text: "Bouncier coins!", description: "Adds more bounce to coins", onClick: addBounce },
            { text: "High risk! High reward!", description: "Adds higher chance to get .5x and 2x multipliers", onClick: highRiskReward },
            { text: "+2 rows", description: "Adds another row to the Pachinko board", onClick: addRows },
            { text: "Reinforced pegs", description: "Allows a ball to score twice on the same peg", onClick: morePegHits },
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