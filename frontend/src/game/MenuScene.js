import { Scene } from './Scene'

export class MenuScene extends Scene {
    constructor(displayWidth, displayHeight, headerBack, buttons){
        super();
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.headerBack = headerBack;
        this.buttons = buttons;
    }

    drawSelf(ctx) {
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
}

class CharacterSelectScene extends Scene {
    drawSelf(ctx) {
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
}

class PachinkoScene extends Scene {
    drawSelf(ctx) {
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
}