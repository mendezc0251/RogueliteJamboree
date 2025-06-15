import headerBacking from '../assets/HeaderA.png'

export function initCanvas(canvas){
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    canvas.style.imageRendering = 'pixelated'
    const dpr = window.devicePixelRatio || 1

    const displayWidth = 1280
    const displayHeight = 720

    canvas.width = 1280*dpr
    canvas.height = 720*dpr

    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    ctx.scale(dpr,dpr)

    canvas.addEventListener("click", function (event){
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        handleClick(mouseX, mouseY)
    })

    let currentScene = "menu";

    function update(){
        if(currentScene==="menu"){
            updateMenu();
        }
        else if(currentScene=="characterSelect"){
            updateChar();
        }
    }

    function updateMenu(){

    }

    function updateChar(){

    }

    function render(){
        if (currentScene==="menu"){
            renderMenu();
        }
        else if(currentScene==="characterSelect"){
            renderChar();
        }
    }
    //Instantiate header image
    const headerBack = new Image()
    headerBack.src = headerBacking

    //Set button width and location on canvas
    const buttonWidth = displayWidth*0.3 //20% width button
    const buttonHeight = displayHeight*0.15 //10% height button

    const buttonX = (displayWidth - buttonWidth) / 2 // center horizontal
    const buttonY = displayHeight*0.6 //50% from top

    const buttons = [
        {text: "Play", x:buttonX, y:buttonY, width:buttonWidth, height:buttonHeight, onClick: () => currentScene="characterSelect"}
    ]
    function renderMenu(){
        
        
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0,0,displayWidth, displayHeight)

        const scale = 1

        if(headerBack.complete){
            ctx.drawImage(headerBack, (displayWidth-headerBack.width*scale)*0.5, (displayHeight-headerBack.height*scale)*0.15, headerBack.width*scale,headerBack.height*scale)
        }

        buttons.forEach(button =>{
            ctx.fillStyle = "#FFD97D"
            ctx.fillRect(button.x, button.y, button.width, button.height)
            ctx.font = '40px "Press Start 2P"'
            ctx.fillStyle = "#F9F7F1"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(button.text, button.x+(button.width/2), button.y+(button.height/2))

        })

        document.fonts.ready.then(()=>{
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText("Roguelite Jamboree",(displayWidth)*0.5,(displayHeight)*0.3)

        })
        
            

    }

    function renderChar(){

    }

    function gameLoop(){
        update()
        render()
        requestAnimationFrame(gameLoop)
    }
    gameLoop()
    
}