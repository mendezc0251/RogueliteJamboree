import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { initCanvas } from '../game/initCanvas'
import '../App.css'
import IntroModal from './IntroModal'

function Game() {
    const canvasRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    // set guestData to players chosen data type or if not chosen to 0
    const [guestData, setGuestData] = useState(()=>{
        if(JSON.parse(localStorage.getItem("rj_guest_data"))){
            return JSON.parse(localStorage.getItem("rj_guest_data"))
        } else {
            return {
            pachinkoPoints:0,
            pachinkoHighscore:0
            }
        }
    })

    useEffect(() => {
        if (location.pathname === '/' && canvasRef.current) {
            initCanvas(canvasRef.current)
        }
        // check if highScore or points updates every second
        // TODO: change to event listener when gameOver in initCanvas
        const interval = setInterval(()=>{
            const localData = JSON.parse(localStorage.getItem("rj_guest_data"))
            if (localData){
                setGuestData(prev =>{
                    if(prev.pachinkoPoints!==localData.pachinkoPoints ||
                        prev.pachinkoHighscore!==localData.pachinkoHighscore
                    ){
                        return{
                            pachinkoPoints: localData.pachinkoPoints,
                            pachinkoHighscore: localData.pachinkoHighscore
                        }
                    }
                    return prev
                })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [location.pathname]);
    // function to handle player using guest option
    const handleGuest = () => {
        console.log("parent handleGuest called")
        if (!localStorage.getItem("rj_guest_data")) {
            localStorage.setItem("rj_guest_data", JSON.stringify({
                pachinkoHighscore: 0,
                pachinkoPoints: 0,
                pachinkoGameState: {
                    bfNum: 0.5,
                    multiplier: ["x2", "x1", "x1", "x1", "x.5"],
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
                ownedUpgrades: [],
            }));
        }
        const localData = JSON.parse(localStorage.getItem("rj_guest_data"))
        if(localData){
            setGuestData({
                pachinkoPoints: localData.pachinkoPoints,
                pachinkoHighscore: localData.pachinkoHighscore
            })
        }
    }
    // function to handle player using login option
    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="container">
            <h1 className="score-points">High Score: {guestData.pachinkoHighscore} Points: {guestData.pachinkoPoints}</h1>
            <div className='game-container'>
                <canvas className="game" ref={canvasRef} width="1280" height="720"></canvas>
            </div>
            <IntroModal onPlayGuest={handleGuest} onLogin={handleLogin} />
        </div>
    )
}
export default Game