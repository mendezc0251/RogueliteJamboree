import headerBacking from '../assets/HeaderA.png'
import pegImgSrc from '../assets/Peg.png'
import coinImgSrc from '../assets/Coin.png'
import pBackImg1 from '../assets/cloud1.png'
import pBackImg2 from '../assets/cloud2.png'
import pBackImg3 from '../assets/cloud3.png'
import pBackImg4 from '../assets/cloud4.png'

export function initCanvas(canvas) {
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

    let currentScene = "menu";

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
    // instantiate coin object
    const coin = {
        x: displayWidth / 2,
        y: 0,
        radius: 32,
        vx: 0,
        vy: 0,
        gravity: 0.5,
        bounceFactor: 0.7
    }
    // instantiate peg object
    const pegs = [
        { x: 280, y: 80, radius: 40 },
        { x: 440, y: 80, radius: 40 },
        { x: 600, y: 80, radius: 40 },
        { x: 760, y: 80, radius: 40 },
        { x: 920, y: 80, radius: 40 },
        { x: 360, y: 240, radius: 40 },
        { x: 520, y: 240, radius: 40 },
        { x: 680, y: 240, radius: 40 },
        { x: 840, y: 240, radius: 40 },
        { x: 280, y: 400, radius: 40 },
        { x: 440, y: 400, radius: 40 },
        { x: 600, y: 400, radius: 40 },
        { x: 760, y: 400, radius: 40 },
        { x: 920, y: 400, radius: 40 },
        { x: 360, y: 560, radius: 40 },
        { x: 520, y: 560, radius: 40 },
        { x: 680, y: 560, radius: 40 },
        { x: 840, y: 560, radius: 40 },
    ]

    function updatePachinko() {
        coin.vy += coin.gravity

        coin.x += coin.vx
        coin.y += coin.vy

        pegs.forEach(peg => {
            let dx = coin.x - (peg.x+peg.radius)
            let dy = coin.y - (peg.y+peg.radius)
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

                const velocityMag = Math.sqrt(coin.vx**2+coin.vy**2)
                if(velocityMag<0.5){
                    coin.vx +=(Math.random()<0.5 ? -1 : 1)*3
                }
            }
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
        else if (currentScene === "slots") {
            renderSlots()
        }
        else if (currentScene === "chess") {
            renderChess()
        }
    }
    // Instantiate header image
    const headerBack = new Image()
    headerBack.src = headerBacking

    //Set button width and location on canvas
    const buttonWidth = displayWidth * 0.3 //20% width button
    const buttonHeight = displayHeight * 0.15 //10% height button

    const buttonX = (displayWidth - buttonWidth) / 2 // center horizontal
    const buttonY = displayHeight * 0.6 //50% from top

    const buttons = [
        { text: "Play", x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight, isHovered: false, onClick: () => currentScene = "characterSelect" }
    ]

    // function to look for mouse click on buttons
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
    }

    // render function for the Menu
    function renderMenu() {


        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0, 0, displayWidth, displayHeight)

        const scale = 1

        if (headerBack.complete) {
            ctx.drawImage(headerBack, (displayWidth - headerBack.width * scale) * 0.5, (displayHeight - headerBack.height * scale) * 0.15, headerBack.width * scale, headerBack.height * scale)
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

    const charButtons = [
        { text: "Capy's Coin Waterfall", x: displayWidth * (1 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "pachinko" },
        { text: "Croc's Chaotic Slots", x: displayWidth * (3 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "slots" },
        { text: "Caty's Chess Set", x: displayWidth * (5 / 6) - 150, y: (displayHeight / 2) - 150, width: 300, height: 300, isHovered: false, onClick: () => currentScene = "chess" }
    ]
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
    const coinImg = new Image()
    coinImg.src = coinImgSrc

    const pegImg = new Image()
    pegImg.src = pegImgSrc

    const pBack1 = new Image()
    pBack1.src = pBackImg1

    const pBack2 = new Image()
    pBack2.src = pBackImg2

    const pBack3 = new Image()
    pBack3.src = pBackImg3

    const pBack4 = new Image()
    pBack4.src = pBackImg4
    // render Pachinko game
    function renderPachinko() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.drawImage(pBack1,0,0,displayWidth,displayHeight)
        ctx.drawImage(pBack2,0,0,displayWidth,displayHeight)
        ctx.drawImage(pBack3,0,0,displayWidth,displayHeight)
        ctx.drawImage(pBack4,0,0,displayWidth,displayHeight)

        pegs.forEach(peg => {
            if (pegImg.complete) {
                ctx.drawImage(pegImg, peg.x, peg.y, peg.radius * 2, peg.radius * 2)
            }

        })
        if(coinImg.complete){
            ctx.drawImage(coinImg,coin.x-coin.radius,coin.y-coin.radius,coin.radius*2,coin.radius*2)
        }


    }
    function renderSlots() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)
    }
    function renderChess() {
        ctx.clearRect(0, 0, displayWidth, displayHeight)
    }

    function gameLoop() {
        update()
        render()
        requestAnimationFrame(gameLoop)
    }
    gameLoop()

}