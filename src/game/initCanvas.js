export function initCanvas(canvas){
    const ctx = canvas.getContext('2d')
    ctx.fillstyle= "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}