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

    let mouseX=0
    let mouseY=0

    // Track mouse clicks
    canvas.addEventListener("click", function (event){
        const rect = canvas.getBoundingClientRect()
        mouseX = event.clientX - rect.left
        mouseY = event.clientY - rect.top

        handleClick(mouseX, mouseY)
    })
    // Track mouse position
    canvas.addEventListener("mousemove", function(event){
        const rect = canvas.getBoundingClientRect()
        mouseX = event.clientX -rect.left
        mouseY = event.clientY - rect.top
    })

    let currentScene = "menu";

    function update(){
        if(currentScene==="menu"){
            updateMenu()
        }
        else if(currentScene=="characterSelect"){
            updateChar()
        }
        else if(currentScene==="pachinko"){
            updatePachinko()
        }
        else if(currentScene==="slots"){
            updateSlots()
        }
        else if(currentScene==="chess"){
            updateChess()
        }
        
    }

    // Update funciton for the Menu
    function updateMenu(){
        buttons.forEach(button=>{
            button.isHovered = mouseX>=button.x && mouseX<=button.x+button.width
            && mouseY>=button.y && mouseY<=button.y+button.height
        })

    }

    function updateChar(){
        charButtons.forEach(button=>{
            button.isHovered = mouseX>=button.x && mouseX<=button.x+button.width
            && mouseY>=button.y && mouseY<=button.y+button.height
        })

    }

    function updatePachinko(){

    }

    function updateSlots(){

    }

    function updateChess(){

    }

    function render(){
        if (currentScene==="menu"){
            renderMenu();
        }
        else if(currentScene==="characterSelect"){
            renderChar();
        }
        else if(currentScene==="pachinko"){
            renderPachinko()
        }
        else if(currentScene==="slots"){
            renderSlots()
        }
        else if(currentScene==="chess"){
            renderChess()
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
        {text: "Play", x:buttonX, y:buttonY, width:buttonWidth, height:buttonHeight, isHovered:false, onClick: () => currentScene="characterSelect"}
    ]

    // function to look for mouse click on buttons
    function handleClick(mouseX,mouseY){
        if(currentScene==="menu"){
            buttons.forEach(button =>{
                const withinX = mouseX>=button.x && mouseX<=button.x+button.width
                const withinY = mouseY>=button.y && mouseY<=button.y+button.height
                if(withinX && withinY){
                    button.onClick()
                }
            })
        } 
        else if(currentScene==="characterSelect"){
            charButtons.forEach(button=>{
                const withinX = mouseX>=button.x && mouseX<=button.x+button.width
                const withinY = mouseY>=button.y && mouseY<=button.y+button.height
                if(withinX && withinY){
                    button.onClick()
                }
            })
        }
    }

    // render function for the Menu
    function renderMenu(){
        
        
        ctx.clearRect(0, 0, displayWidth, displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0,0,displayWidth, displayHeight)

        const scale = 1

        if(headerBack.complete){
            ctx.drawImage(headerBack, (displayWidth-headerBack.width*scale)*0.5, (displayHeight-headerBack.height*scale)*0.15, headerBack.width*scale,headerBack.height*scale)
        }

        buttons.forEach(button =>{
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
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

    const charButtons = [
        {text: "Capy's Coin Waterfall", x:displayWidth*(1/6)-150, y:(displayHeight/2)-150, width:300, height:300, isHovered:false, onClick: () => currentScene="pachinko"},
        {text: "Croc's Chaotic Slots", x:displayWidth*(3/6)-150, y:(displayHeight/2)-150, width:300, height:300, isHovered:false, onClick: () => currentScene="slots"},
        {text: "Caty's Chess Set", x:displayWidth*(5/6)-150, y:(displayHeight/2)-150, width:300, height:300, isHovered:false, onClick: () => currentScene="chess"}
    ]
    function renderChar(){
        ctx.clearRect(0,0,displayWidth,displayHeight)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0,0,displayWidth,displayHeight)
        
        charButtons.forEach(button=>{
            ctx.fillStyle = button.isHovered ? "#FFD97D" : "#FFBC19"
            ctx.fillRect(button.x,button.y,button.width,button.height)
            ctx.font = '18px "Press Start 2P"'
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText(button.text,button.x+150,button.y-50)
        })
    }
    function renderPachinko(){
        ctx.clearRect(0,0,displayWidth,displayHeight)
    }
    function renderSlots(){
        ctx.clearRect(0,0,displayWidth,displayHeight)
    }
    function renderChess(){
        ctx.clearRect(0,0,displayWidth,displayHeight)
    }

    function gameLoop(){
        update()
        render()
        requestAnimationFrame(gameLoop)
    }
    gameLoop()
    
}