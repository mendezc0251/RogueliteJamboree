import './Shop.css'
import ShopCard from './ShopCard'
import shopItems from './shopItems'
import { useState } from 'react'

const Shop = () => {
    const [gameState, setGameState] = useState(() => {
        return JSON.parse(localStorage.getItem("gameState")) || {
            pachinkoPoints: 0,
            ownedUpgrades: [],
        }
    })

    const handlePurchase = (item) =>{
        if (gameState.pachinkoPoints>=item.cost && !gameState.ownedUpgrades.includes(item.id)){
            const updatedState={
                ...gameState,
                points: gameState.points-item.cost,
                ownedItems: [...gameState.ownedItems, item.id]
            }
            setGameState(updatedState)
            localStorage.setItem("gameState", JSON.stringify(updatedState))
        }
    }

    return (
        <>
            <div className="container">
                <h2>Your Points: {gameState.pachinkoPoints}</h2>
                <div className="shop-grid">
                    {shopItems.map((item) =>
                        <ShopCard
                            key={item.id}
                            item={item}
                            owned={gameState.ownedUpgrades.includes(item.id)}
                            onBuy={() => handlePurchase(item)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default Shop