import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {initCanvas} from './game/initCanvas'
import './App.css'
function Game(){
    const canvasRef = useRef(null)
    const location = useLocation()
  
    useEffect(() =>{
        if (location.pathname==='/' && canvasRef.current) {
        initCanvas(canvasRef.current)
        }
    }, [location.pathname]);
    return(
        <div className='game-container'>
            <canvas className="game" ref={canvasRef}></canvas>
        </div>
    )
}
export default Game