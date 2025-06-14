import headerBacking from '../assets/HeaderA.png'

export function initCanvas(canvas){
    
    
    const container = canvas.parentElement
    const ctx = canvas.getContext('2d')

    
    
    function resizeCanvas(){
        const width = container.clientWidth
        const height = container.clientHeight

        canvas.width = width
        canvas.height = height

        render()
    }

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

    const headerBack = new Image()
    headerBack.src = headerBacking

    function renderMenu(){
        const buttonWidth = canvas.width*0.2 //20% width button
        const buttonHeight = canvas.height*0.1 //10% height button

        const buttonX = (canvas.width - buttonWidth) / 2 // center horizontal
        const buttonY = canvas.height*0.5 //50% from top
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#2D2D2D"
        ctx.fillRect(0,0,canvas.width, canvas.height)

        ctx.fillStyle = "#FFD97D"
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight)

        if (headerBack.complete){
            ctx.imageSmoothingEnabled = false
            
            ctx.drawImage(headerBack, 2000,50)
        }

        document.fonts.ready.then(()=>{
            ctx.font = `${buttonWidth*0.10}px "Press Start 2P"`
            ctx.fillStyle = "#F9F7F1"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText("Play!", buttonX+(buttonWidth/2), buttonY+(buttonHeight/2))
            
            ctx.fillStyle = "#F9F7F1"
            ctx.fillText("Roguelite Jamboree", canvas.width*0.5, canvas.height*0.4)

        })
        
            

    }

    function renderChar(){

    }

    function gameLoop(){
        update()
        render()
        requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()
    
}