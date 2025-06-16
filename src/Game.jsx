import { useRef, useState, useEffect } from 'react'
import {initCanvas} from './game/initCanvas'
import './App.css'
function Game(){
    const canvasRef = useRef(null)
  
    useEffect(() =>{
        if (canvasRef.current) {
        initCanvas(canvasRef.current)
        }
    }, []);
    return(
        <div className='game-container'>
            <canvas className="game" ref={canvasRef}></canvas>
        </div>
    )
}
export default Game