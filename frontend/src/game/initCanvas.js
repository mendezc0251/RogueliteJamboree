import GameLoop from '../game/GameLoop'
import { events } from './Events'
import { resources } from "./Resources"
import { GameObject } from './GameObject'

console.log("initCanvas called")
export function initCanvas(canvas) {
    if(window.__gameInitialized){
        console.warn("initCanvas called more than once!")
        return
    }
    window.__gameInitialized = true
    let currentScene = "menu";
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    canvas.style.imageRendering = 'pixelated'
    const dpr = window.devicePixelRatio || 1

    const displayWidth = 1280
    const displayHeight = 720

    canvas.width = 1280 * dpr
    canvas.height = 720 * dpr

    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    ctx.scale(dpr, dpr)

    let mouseX = 0
    let mouseY = 0
    //TODO: Create sprite class to add children to menuScene GameObject
    const menuScene = new GameObject({
        position: { x: 0, y: 0 }
    });


    // Track mouse clicks
    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect()
        mouseX = event.clientX - rect.left
        mouseY = event.clientY - rect.top

        handleClick(mouseX, mouseY)
    })
    // Track mouse position
    canvas.addEventListener("mousemove", function (event) {
        const rect = canvas.getBoundingClientRect()
        mouseX = event.clientX - rect.left
        mouseY = event.clientY - rect.top
    })



    function update() {
        if (currentScene === "menu") {
            updateMenu()
        }
        else if (currentScene == "characterSelect") {
            updateChar()
        }
        else if (currentScene === "pachinko") {
            updatePachinko()
        }
        else if (currentScene === "upgradePachinko") {
            updateUpgradePachinko()
        }
        else if (currentScene === "slots") {
            updateSlots()
        }
        else if (currentScene === "chess") {
            updateChess()
        }

    }

    // Update funciton for the Menu
    function updateMenu() {
        buttons.forEach(button => {
            button.isHovered = mouseX >= button.x && mouseX <= button.x + button.width
                && mouseY >= button.y && mouseY <= button.y + button.height
        })

    }

    function updateChar() {
        charButtons.forEach(button => {
            button.isHovered = mouseX >= button.x && mouseX <= button.x + button.width
                && mouseY >= button.y && mouseY <= button.y + button.height
        })

    }

    const leftWallX = 119
    const rightWallX = 1160

    let cameraY = 0
    const maxWorldHeight = 1200
    // instantiate coins array and ammo
    let coins = []
    let ammo = 2
    // instantiate peg object
    let pegAmount = 1
    function generatePegs(setCount) {
        const pegs = []
        const rowSpacing = 160
        const firstRowY = 80
        const secondRowY = firstRowY + 160
        const rowOffsets = [
            [80, 280, 440, 600, 760, 920, 1120],
            [200, 360, 520, 680, 840, 1000]
        ]
        const pegRadius = 40
        for (let i = 0; i < setCount; i++) {
            const yOffset = i * rowSpacing * 2

            for (let x of rowOffsets[0]) {
                pegs.push({ x, y: firstRowY + yOffset, radius: pegRadius, amount: pegAmount, hit: false })
            }

            for (let x of rowOffsets[1]) {
                pegs.push({ x, y: secondRowY + yOffset, radius: pegRadius, amount: pegAmount, hit: false })
            }
        }
        return pegs
    }
    const pegs = generatePegs(3)

    const bottomWalls = [
        { x: 199, y: maxWorldHeight - 48, width: 2, height: 48 },
        { x: 279, y: maxWorldHeight - 48, width: 2, height: 48 },
        { x: 359, y: maxWorldHeight - 48, width: 2, height: 48 },
        { x: 439, y: maxWorldHeight - 48, width: 2, height: 48 },
        { x: 519, y: maxWorldHeight - 48, width: 2, height: 48 },
        { x: 599, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 679, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 759, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 839, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 919, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 999, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 1079, y: maxWorldHeight - cameraY - 48, width: 2, height: 48 },
    ]
    let multiplier = ["x2", "x1", "x.5"]
    let multipliers = [
        { text: null, textX: 159, textY: displayHeight - 24, x: 119, y: cameraY + displayHeight },
        { text: null, textX: 239, textY: displayHeight - 24, x: 199, y: cameraY + displayHeight },
        { text: null, textX: 319, textY: displayHeight - 24, x: 279, y: cameraY + displayHeight },
        { text: null, textX: 399, textY: displayHeight - 24, x: 359, y: cameraY + displayHeight },
        { text: null, textX: 479, textY: displayHeight - 24, x: 439, y: cameraY + displayHeight },
        { text: null, textX: 559, textY: displayHeight - 24, x: 519, y: cameraY + displayHeight },
        { text: null, textX: 639, textY: displayHeight - 24, x: 599, y: cameraY + displayHeight },
        { text: null, textX: 719, textY: displayHeight - 24, x: 679, y: cameraY + displayHeight },
        { text: null, textX: 799, textY: displayHeight - 24, x: 759, y: cameraY + displayHeight },
        { text: null, textX: 879, textY: displayHeight - 24, x: 839, y: cameraY + displayHeight },
        { text: null, textX: 959, textY: displayHeight - 24, x: 919, y: cameraY + displayHeight },
        { text: null, textX: 1039, textY: displayHeight - 24, x: 999, y: cameraY + displayHeight },
        { text: null, textX: 1119, textY: displayHeight - 24, x: 1079, y: cameraY + displayHeight },
    ]

    multipliers.forEach(multi => {
        multi.text = multiplier[Math.floor(Math.random() * multiplier.length)]
    })

    let round = 1
    let rounds = 5
    let totalScore = 0
    let score = 0

    const dropZone = {
        xMax: 1080,
        xMin: 120
    }
    let ghostCoin = {
        x: 600,
        y: 0,
        radius: 32
    }
    function resetBoard(coin) {
        if (coin.y - coin.radius < cameraY + displayHeight) {
            return true
        }
        else {
            console.log(score + " Before multiplier")
            multiScore(coin)
            console.log(score + " After multiplier")
            pegs.forEach(peg => {
                if (peg.hit == true) {
                    peg.hit = false
                }
            })
            if (coin.scored == true) {
                multipliers.forEach(multi => {
                    multi["text"] = multiplier[Math.floor(Math.random() * multiplier.length)]
                })
            }
            totalScore += score
            score = 0
            return false
        }
    }
    function multiScore(c) {
        if (c.scored == false) {
            c.scored = true
            multipliers.forEach(multi => {
                if (c.x > multi.x && c.x < multi.x + 80) {
                    console.log(parseFloat(("" + multi.text).slice(1)))
                    score = Math.floor(score * parseFloat(("" + multi.text).slice(1)))
                }
            })
        }
    }

    function handleRoundEnd() {
        if (round == rounds) {
            console.log("Game Over!")
        } else {
                upgradeButtons.forEach(button => {
                    let i = Math.floor(Math.random() * upgrades.length)
                    button.text = upgrades[i].text
                    button.onClick = upgrades[i].onClick
                })
                console.log("ROUND OVER!")
                round += 1
                console.log("Round " + round + " begin!")
                ammo += 2
                currentScene = "upgradePachinko"
        }
    }

    canvas.addEventListener("mousemove", function (event) {
        const rect = canvas.getBoundingClientRect()
        let mouseX = event.clientX - rect.left

        ghostCoin.x = Math.max(dropZone.xMin + ghostCoin.radius, Math.min(dropZone.xMax + ghostCoin.radius, mouseX))
    })


    function updatePachinko() {
        if (ammo == 0 && coins.length == 0) {
            handleRoundEnd();
        }

        coins.forEach(coin => {
            coin.vy += coin.gravity

            coin.x += coin.vx
            coin.y += coin.vy
            // handle coin collision with walls
            if (coin.x - coin.radius < leftWallX) {
                coin.x = leftWallX + coin.radius
                coin.vx *= -coin.bounceFactor
            } else if (coin.x + coin.radius > rightWallX) {
                coin.x = rightWallX - coin.radius
                coin.vx *= -coin.bounceFactor
            }

            // handle bottom wall collisions
            bottomWalls.forEach(wall => {
                const wallY = maxWorldHeight - wall.height

                if (
                    coin.x + coin.radius > wall.x &&
                    coin.x - coin.radius < wall.x + wall.width &&
                    coin.y + coin.radius > wallY &&
                    coin.y - coin.radius < wallY + wall.height
                ) {
                    if (coin.x < wall.x + wall.width / 2) {
                        coin.x = wall.x - coin.radius
                    } else {
                        coin.x = wall.x + wall.width + coin.radius
                    }
                    coin.vx *= -coin.bounceFactor

                    coin.vy *= 0.25
                }
            })

            // handle coin collison with pegs
            pegs.forEach(peg => {
                let dx = coin.x - (peg.x + peg.radius)
                let dy = coin.y - (peg.y + peg.radius)
                let dist = Math.sqrt(dx * dx + dy * dy)
                let minDist = coin.radius + peg.radius

                if (dist < minDist) {
                    let nx = dx / dist
                    let ny = dy / dist

                    let overlap = minDist - dist
                    coin.x += nx * overlap
                    coin.y += ny * overlap

                    let dot = coin.vx * nx + coin.vy * ny
                    coin.vx -= 2 * dot * nx
                    coin.vy -= 2 * dot * ny

                    coin.vx *= coin.bounceFactor
                    coin.vy *= coin.bounceFactor

                    const velocityMag = Math.sqrt(coin.vx ** 2 + coin.vy ** 2)
                    if (velocityMag < 0.5) {
                        coin.vx += (Math.random() < 0.5 ? -1 : 1) * 3
                    }
                    if (peg.hit == false) {
                        peg.hit = true
                        score += 1
                    }
                }
            })
        })
        if (coins.length > 0) {
            const lastCoin = coins[coins.length - 1]
            const targetY = lastCoin.y - displayHeight / 2

            cameraY += (targetY - cameraY) * 0.05
            cameraY = Math.max(0, Math.min(cameraY, maxWorldHeight - displayHeight))
        } else {
            cameraY += (0 - cameraY) * 0.05
        }
        coins = coins.filter(resetBoard)
    }

    // function tied to the +1 ball upgrade
    function addBall() {
        console.log("Ball added!")
    }
    let bounceLevel = 0;
    function addBounce() {
        bounceLevel+=1
        let bounceFactor = 1-0.5*Math.exp(-0.2*bounceLevel)
        bfNum = bounceFactor
        console.log("Bounce added",bfNum)
    }

    function highRiskReward() {
        multiplier.push("x2")
        multiplier.push("x.5")
        console.log("Multiplier pool loaded!")
    }

    function addRows() {
        console.log("Rows added to game board!")
    }

    function morePegHits() {
        console.log("Peg's reinforced!")
    }

    function updateUpgradePachinko() {
        upgradeButtons.forEach(button => {
            button.isHovered = mouseX >= button.x && mouseX <= button.x + button.width
                && mouseY >= button.y && mouseY <= button.y + button.height
        })
    }

    function updateSlots() {

    }

    function updateChess() {

    }

    function render() {
        if (currentScene === "menu") {
            renderMenu();
        }
        else if (currentScene === "characterSelect") {
            renderChar();
        }
        else if (currentScene === "pachinko") {
            renderPachinko()
        }
        else if (currentScene === "upgradePachinko") {
            renderUpgradePachinko()
        }
        else if (currentScene === "slots") {
            renderSlots()
        }
        else if (currentScene === "chess") {
            renderChess()
        }
    }
    // load header image
    const headerBack = resources.images.headerBack;

    //Set button width and location on canvas
    const buttonWidth = displayWidth * 0.3 //20% width button
    const buttonHeight = displayHeight * 0.15 //10% height button

    const buttonX = (displayWidth - buttonWidth) / 2 // center horizontal
    const buttonY = displayHeight * 0.6 //50% from top

    const buttons = [
        { text: "Play", x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight, isHovered: false, onClick: () => currentScene = "characterSelect" }
    ]

    // function to look for mouse click on buttons
    events.on("playClick", currentScene, buttons.forEach(button => {

    }))

    let bfNum = 0.5
    function handleClick(mouseX, mouseY) {
        if (currentScene === "menu") {
            buttons.forEach(button => {
                const withinX = mouseX >= button.x && mouseX <= button.x + button.width
                const withinY = mouseY >= button.y && mouseY <= button.y + button.height
                if (withinX && withinY) {
                    button.onClick()
                }
            })
        }
        else if (currentScene === "characterSelect") {
            charButtons.forEach(button => {
                const withinX = mouseX >= button.x && mouseX <= button.x + button.width
                const withinY = mouseY >= button.y && mouseY <= button.y + button.height
                if (withinX && withinY) {
                    button.onClick()
                }
            })
        }
        else if (currentScene === "pachinko") {

            if (coins.length <= 0 && ammo != 0) {

                coins.push({
                    x: ghostCoin.x,
                    y: ghostCoin.y,
                    radius: 32,
                    vx: 0,
                    vy: 0,
                    gravity: 0.5,
                    bounceFactor: bfNum,
                    filtered: false,
                    scored: false,
                })
                ammo -= 1
            }
        }
        else if (currentScene === "upgradePachinko") {
            upgradeButtons.forEach(button => {
                const withinX = mouseX >= button.x && mouseX <= button.x + button.width
                const withinY = mouseY >= button.y && mouseY <= button.y + button.height
                if (withinX && withinY) {
                    button.onClick()
                    currentScene = "pachinko"
                    button.onClick = null
                }
            })
        }
    }
    // render function for the Menu
    function renderMenu() {


        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        const scale = 1


        if (headerBack.isLoaded) {
            ctx.drawImage(headerBack.image, (displayWidth - headerBack.image.width * scale) * 0.5, (displayHeight - headerBack.image.height * scale) * 0.15, headerBack.image.width * scale, headerBack.image.height * scale)
        }

        buttons.forEach(button => {
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '40px "Press Start 2P"'
            ctx.fillStyle = "#F9F7F1"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(button.text, button.x + (button.width / 2), button.y + (button.height / 2))

        })

        document.fonts.ready.then(() => {
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText("Roguelite Jamboree", (displayWidth) * 0.5, (displayHeight) * 0.3)

        })



    }
    // array with buttons corresponding to the gamemode
    const charButtons = [
        { text: "Capy's Coin Waterfall", x: displayWidth * (1 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "pachinko" },
        { text: "Croc's Chaotic Slots", x: displayWidth * (3 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "slots" },
        { text: "Caty's Chess Set", x: displayWidth * (5 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "chess" }
    ]

    // render character select screen
    function renderChar() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        charButtons.forEach(button => {
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '18px "Press Start 2P"'
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText(button.text, button.x + 150, button.y - 50)
        })
    }

    // creating Image objects and setting source directory
    const coinImg = resources.images.coin

    const pegImg = resources.images.peg

    const hitPegImg = resources.images.hitPeg
    const pBack1 = resources.images.pBackImg1
    const pBack2 = resources.images.pBackImg2
    const pBack3 = resources.images.pBackImg3
    const pBack4 = resources.images.pBackImg4

    // render Pachinko game
    function renderPachinko() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)



        if (pBack1.isLoaded) {
            ctx.drawImage(pBack1.image, 0, 0, displayWidth, displayHeight)
        }
        if (pBack2.isLoaded) {
            ctx.drawImage(pBack2.image, 0, 0, displayWidth, displayHeight)
        }
        if (pBack3.isLoaded) {
            ctx.drawImage(pBack3.image, 0, 0, displayWidth, displayHeight)
        }
        if (pBack4.isLoaded) {
            ctx.drawImage(pBack4.image, 0, 0, displayWidth, displayHeight)
        }


        ctx.fillStyle = "#A8E6CF"
        ctx.fillRect(leftWallX - 4, 0 - cameraY, 8, maxWorldHeight)
        ctx.fillRect(rightWallX - 4, 0 - cameraY, 8, maxWorldHeight)

        bottomWalls.forEach(wall => {
            ctx.fillStyle = "#2D2D2D"
            ctx.fillRect(wall.x, wall.y - cameraY, wall.width, wall.height)
        })

        multipliers.forEach(multi => {
            ctx.globalAlpha = 0.5
            ctx.font = '20px "Press Start 2P"'
            ctx.fillStyle = "#2D2D2D"
            ctx.fillText(multi.text, multi.textX, multi.textY)
            ctx.globalAlpha = 1.0
        })

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(199, maxWorldHeight - cameraY - 48, 2, 48)

        pegs.forEach(peg => {
            if (pegImg.isLoaded && peg.hit == false) {
                ctx.drawImage(pegImg.image, peg.x, peg.y - cameraY, peg.radius * 2, peg.radius * 2)
            } else if (hitPegImg.isLoaded && peg.hit == true) {
                ctx.drawImage(hitPegImg.image, peg.x, peg.y - cameraY, peg.radius * 2, peg.radius * 2)
            }

        })
        if (coinImg.isLoaded) {
            ctx.globalAlpha = 0.5
            ctx.drawImage(coinImg.image, ghostCoin.x - ghostCoin.radius, (ghostCoin.y - ghostCoin.radius) - cameraY, ghostCoin.radius * 2, ghostCoin.radius * 2)
            ctx.globalAlpha = 1.0
        }
        coins.forEach(coin => {
            if (coinImg.isLoaded) {
                ctx.drawImage(coinImg.image, coin.x - coin.radius, (coin.y - coin.radius) - cameraY, coin.radius * 2, coin.radius * 2)
            }
        })
        ctx.globalAlpha = 0.6
        ctx.font = '40px "Press Start 2P"'
        ctx.textAlign = "center"
        ctx.textBaseline = "left"
        ctx.fillStyle = "#F9F7F1"
        ctx.fillText(totalScore, 100, 25)
        ctx.globalAlpha = 1.0
    }
    // array that holds all available upgrades
    const upgrades = [
        { text: "+1 Ball", description: "Adds a ball to the drop", onClick: addBall },
        { text: "Bouncier coins!", description: "Adds more bounce to coins", onClick: addBounce },
        { text: "High risk! High reward!", description: "Adds higher chance to get .5x and 2x multipliers", onClick: highRiskReward },
        { text: "+2 rows", description: "Adds another row to the Pachinko board", onClick: addRows },
        { text: "Reinforced pegs", description: "Allows a ball to score twice on the same peg", onClick: morePegHits },
    ]
    // array to hold upgrades offered to the player
    let upgradeButtons = [
        { text: null, description: null, x: displayWidth * (1 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
        { text: null, description: null, x: displayWidth * (3 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
        { text: null, description: null, x: displayWidth * (5 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: null },
    ]
    // renders the upgrade screen after each round
    function renderUpgradePachinko() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        upgradeButtons.forEach(button => {
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '15px "Press Start 2P"'
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText(button.text, button.x + 150, button.y - 50)
        })
    }
    function renderSlots() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)
    }
    function renderChess() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)
    }
    // TODO: fix bugs invlovling double execution of functions
    const gameLoop = new GameLoop(update, render)
    gameLoop.start()
}