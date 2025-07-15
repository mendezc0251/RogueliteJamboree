import GameLoop from '../game/GameLoop'
import { events } from './Events'
import { resources } from "./Resources"
import { GameObject } from './GameObject'
import { Upgrades } from './Upgrades'

console.log("initCanvas called")
export function initCanvas(canvas) {
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
        else if (currentScene === "gameoverPachinko") {
            updateGameoverPachinko()
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
    let guestData = JSON.parse(localStorage.getItem("rj_guest_data"))
    let gameState = {
                    bfNum: 0.5,
                    multiplier: ["x2", "x1", "x1", "x1", "x.5"],
                    coins: 1,
                    pegHits: 1,
                    maxWorldHeight: 1200,
                    pegRows: 3,
                    round: 1,
                    rounds: 5,
                    ammo: 2,
                    maxAmmo: 2,
                    totalScore: 0,
                    score: 0,
                }
    if(guestData){
        gameState = guestData.pachinkoGameState
    }

    const leftWallX = 119
    const rightWallX = 1160

    let cameraY = 0
    // instantiate coins array and ammo
    let coins = []
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
                pegs.push({ x, y: firstRowY + yOffset, radius: pegRadius, hit: false, hits: gameState.pegHits })
            }

            for (let x of rowOffsets[1]) {
                pegs.push({ x, y: secondRowY + yOffset, radius: pegRadius, hit: false, hits: gameState.pegHits })
            }
        }
        return pegs
    }
    let pegs = generatePegs(gameState.pegRows)

    const bottomWalls = [
        { x: 199, y: gameState.maxWorldHeight - 48, width: 2, height: 48 },
        { x: 279, y: gameState.maxWorldHeight - 48, width: 2, height: 48 },
        { x: 359, y: gameState.maxWorldHeight - 48, width: 2, height: 48 },
        { x: 439, y: gameState.maxWorldHeight - 48, width: 2, height: 48 },
        { x: 519, y: gameState.maxWorldHeight - 48, width: 2, height: 48 },
        { x: 599, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 679, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 759, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 839, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 919, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 999, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
        { x: 1079, y: gameState.maxWorldHeight - cameraY - 48, width: 2, height: 48 },
    ]
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
        multi.text = gameState.multiplier[Math.floor(Math.random() * gameState.multiplier.length)]
    })

    const dropZone = {
        xMax: 1080,
        xMin: 120,
    }
    let ghostCoin = {
        x: 600,
        y: 0,
        radius: 32,
    }
    function resetBoard(coin) {
        if (coin.y - coin.radius < cameraY + displayHeight) {
            return true
        }
        else {
            console.log(gameState.score + " Before multiplier")
            multiScore(coin)
            console.log(gameState.score + " After multiplier")
            if (coins.length == 1) {
                gameState.totalScore += gameState.score
                multipliers.forEach(multi => {
                    multi["text"] = gameState.multiplier[Math.floor(Math.random() * gameState.multiplier.length)]
                })
                pegs.forEach(peg => {
                    peg.hit = false
                    peg.hits = gameState.pegHits
                })
            }

            return false
        }
    }
    function multiScore(c) {
        multipliers.forEach(multi => {
            if (c.x > multi.x && c.x < multi.x + 80) {
                console.log(parseFloat(("" + multi.text).slice(1)))
                gameState.score = Math.floor(gameState.score * parseFloat(("" + multi.text).slice(1)))
            }
        })
    }

    function handleRoundEnd() {
        if (gameState.round == gameState.rounds) {
            const guestData = JSON.parse(localStorage.getItem('rj_guest_data'))
            guestData.pachinkoPoints = (guestData.pachinkoPoints) + gameState.totalScore
            if (gameState.totalScore > guestData.pachinkoHighscore) {
                guestData.pachinkoHighscore = gameState.totalScore
            }
            localStorage.setItem("rj_guest_data", JSON.stringify(guestData))


            currentScene = "gameoverPachinko"
            console.log("Game Over!")
        } else {
            upgradeButtonsArr = upgradesClass.getRandomUpgrades()
            console.log("ROUND OVER!")
            gameState.round += 1
            console.log("Round " + gameState.round + " begin!")
            console.log(gameState.maxAmmo)
            gameState.ammo = gameState.maxAmmo
            currentScene = "upgradePachinko"
        }
    }

    canvas.addEventListener("mousemove", function (event) {
        const rect = canvas.getBoundingClientRect()
        let mouseX = event.clientX - rect.left

        ghostCoin.x = Math.max(dropZone.xMin + ghostCoin.radius, Math.min(dropZone.xMax + ghostCoin.radius, mouseX))
    })




    function updatePachinko() {
        if (gameState.ammo == 0 && coins.length == 0) {
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
                const wallY = gameState.maxWorldHeight - wall.height

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
                    if (peg.hits != 0 && peg.hit != true) {
                        peg.hits -= 1
                        gameState.score += 1
                        console.log(gameState.score)
                    }
                    if (peg.hits == 0) {
                        peg.hit = true
                    }

                }
            })
        })
        if (coins.length > 0) {
            const lastCoin = coins[coins.length - 1]
            const targetY = lastCoin.y - displayHeight / 2

            cameraY += (targetY - cameraY) * 0.05
            cameraY = Math.max(0, Math.min(cameraY, gameState.maxWorldHeight - displayHeight))
        } else {
            cameraY += (0 - cameraY) * 0.05
        }
        coins = coins.filter(resetBoard)
    }

    let upgradesClass = new Upgrades(displayWidth, displayHeight, gameState)
    let upgradeButtonsArr = upgradesClass.getRandomUpgrades()


    // update function for Pachinko upgrade scene
    function updateUpgradePachinko() {
        upgradeButtonsArr.forEach(button => {
            button.isHovered = mouseX >= button.x && mouseX <= button.x + button.width
                && mouseY >= button.y && mouseY <= button.y + button.height
        })
    }

    // function to reset Pachinko game
    function resetPachinkoGameState() {
        guestData = JSON.parse(localStorage.getItem("rj_guest_data"))
        console.log("resetting game board")
        gameState = guestData.pachinkoGameState

        pegs = generatePegs(gameState.pegRows)

        upgradesClass = new Upgrades(displayWidth, displayHeight, gameState)
        upgradeButtonsArr = upgradesClass.getRandomUpgrades()

        multipliers.forEach(multi => {
            multi.text = gameState.multiplier[Math.floor(Math.random() * gameState.multiplier.length)]
        })

    }
    //Set button width and location on canvas
    let buttonWidth = displayWidth * 0.3 //20% width button
    let buttonHeight = displayHeight * 0.15 //10% height button

    let buttonX = (displayWidth - buttonWidth) / 2 // center horizontal
    let buttonY = displayHeight * 0.6 //50% from top
    let buttonY2 = displayHeight * 0.4
    const gameoverButtons = [
        {
            text: "Play Again?", x: buttonX, y: buttonY2, width: buttonWidth, height: buttonHeight, isHovered: false, onClick: () => {
                resetPachinkoGameState()
                currentScene = "pachinko"
            }
        },
        {
            text: "Menu", x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight, isHovered: false, onClick: () => {
                resetPachinkoGameState()
                currentScene = "menu"
            }
        },
    ]
    // update functionf or Pachinko game over scene
    function updateGameoverPachinko() {
        gameoverButtons.forEach(button => {
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
        else if (currentScene === "gameoverPachinko") {
            renderGameoverPachinko()
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
    buttonWidth = displayWidth * 0.3 //20% width button
    buttonHeight = displayHeight * 0.15 //10% height button

    buttonX = (displayWidth - buttonWidth) / 2 // center horizontal
    buttonY = displayHeight * 0.6 //50% from top

    const buttons = [
        { text: "Play", x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight, isHovered: false, onClick: () => currentScene = "characterSelect" }
    ]

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

            if (coins.length <= 0 && gameState.ammo != 0) {
                gameState.score = 0
                let offset = 0
                for (let i = 1; i <= gameState.coins; i++) {

                    if (i % 2 == 1 && i != 1) {
                        offset = -offset
                    } else if (i % 2 == 0 && i != 1) {
                        offset = Math.abs(offset) + 64
                    }
                    coins.push({
                        x: ghostCoin.x + offset,
                        y: ghostCoin.y,
                        radius: 32,
                        vx: 0,
                        vy: 0,
                        gravity: 0.5,
                        bounceFactor: gameState.bfNum,
                        filtered: false,
                        scored: false,
                    })
                }

                gameState.ammo -= 1
            }
        }
        else if (currentScene === "upgradePachinko") {
            upgradeButtonsArr.forEach(button => {
                const withinX = mouseX >= button.x && mouseX <= button.x + button.width
                const withinY = mouseY >= button.y && mouseY <= button.y + button.height
                if (withinX && withinY) {
                    button.onClick()
                    pegs = generatePegs(gameState.pegRows)
                    pegs.forEach(peg => {
                        peg.hit = false
                        peg.hits = gameState.pegHits
                    })
                    currentScene = "pachinko"
                    button.onClick = null
                }
            })
        }
        else if (currentScene === "gameoverPachinko") {
            gameoverButtons.forEach(button => {
                const withinX = mouseX >= button.x && mouseX <= button.x + button.width
                const withinY = mouseY >= button.y && mouseY <= button.y + button.height
                if (withinX && withinY) {
                    button.onClick()
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
        ctx.fillRect(leftWallX - 4, 0 - cameraY, 8, gameState.maxWorldHeight)
        ctx.fillRect(rightWallX - 4, 0 - cameraY, 8, gameState.maxWorldHeight)

        bottomWalls.forEach(wall => {
            ctx.fillStyle = "#2D2D2D"
            ctx.fillRect(wall.x, gameState.maxWorldHeight - cameraY - 48, wall.width, wall.height)
        })

        multipliers.forEach(multi => {
            ctx.globalAlpha = 0.5
            ctx.font = '20px "Press Start 2P"'
            ctx.fillStyle = "#2D2D2D"
            ctx.fillText(multi.text, multi.textX, multi.textY)
            ctx.globalAlpha = 1.0
        })

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(199, gameState.maxWorldHeight - cameraY - 48, 2, 48)

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
        ctx.fillText(gameState.totalScore, 100, 25)
        ctx.globalAlpha = 1.0
    }
    // renders the upgrade screen after each round
    function renderUpgradePachinko() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        upgradeButtonsArr.forEach(button => {
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '15px "Press Start 2P"'
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText(button.text, button.x + 150, button.y - 50)
        })
    }
    // renders gameover screen
    function renderGameoverPachinko() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        ctx.font = '60px "Press Start 2P"'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#F9F7F1"
        ctx.fillText("GAME OVER", displayWidth / 2, displayHeight * 0.3)

        gameoverButtons.forEach(button => {
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '30px "Press Start 2P"'
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText(button.text, button.x + (button.width / 2), button.y + (button.height / 2))
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