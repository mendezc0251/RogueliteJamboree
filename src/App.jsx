import { useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import jamboreePng from './assets/jamboree.png'
import {initCanvas} from './game/initCanvas'

function App() {
  const canvasRef = useRef(null)
  
  useEffect(() =>{
    if (canvasRef.current) {
      initCanvas(canvasRef.current)
    }
  }, []);

  return (
    <>
      <header>
        <img src={jamboreePng} alt="Jamboree"></img>
        <div className="header-links-container">
          <ul className="header-links">
            <li>home</li>
            <li>shop</li>
            <li>about</li>
          </ul>
        </div>
      </header>
      <div className='game-container'>
        <canvas className="game" ref={canvasRef}></canvas>
      </div>
      
    </>
  )
}

export default App
