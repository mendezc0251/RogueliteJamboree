import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { initCanvas } from '../game/initCanvas'
import '../App.css'
import IntroModal from './IntroModal'

function Game() {
    const canvasRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/' && canvasRef.current) {
            initCanvas(canvasRef.current)
        }
    }, [location.pathname]);

    const handleGuest = () => {
        console.log("parent handleGuest called")
        if (!localStorage.getItem("rj_gues_data")) {
            localStorage.setItem("rj_guest_data", JSON.stringify({
                pachinkoHighscore: 0,
                pachinkoPoints: 0,
                pachinkoGameState: {
                    bfNum: 0.5,
                    multiplier: ["x2", "x1", "x.5"],
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
                },
                ownedUpgrades:[],
            }));
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='game-container'>
            <canvas className="game" ref={canvasRef}></canvas>
            <IntroModal onPlayGuest={handleGuest} onLogin={handleLogin} />
        </div>

    )
}
export default Game