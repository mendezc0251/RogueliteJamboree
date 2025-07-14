import './Shop.css'
import ShopCard from './ShopCard'
import shopItems from './shopItems'
import { useState } from 'react'
import { shopEffects } from '../components/shopEffects'

const Shop = () => {
    const [guestData, setGuestData] = useState(() => {
        return JSON.parse(localStorage.getItem("rj_guest_data"))
    })

    const handlePurchase = (item) =>{
        if (guestData.pachinkoPoints>=item.cost && !guestData.ownedUpgrades.includes(item.id)){
            const updatedGuestData={
                pachinkoGameState: guestData.pachinkoGameState,
                pachinkoPoints: guestData.pachinkoPoints-item.cost,
                ownedUpgrades: [...guestData.ownedUpgrades, item.id]
            };

            if (item.effectKey && shopEffects[item.effectKey]){
                shopEffects[item.effectKey](updatedGuestData.pachinkoGameState);
            };
            
            setGuestData(updatedGuestData)
            localStorage.setItem("rj_guest_data", JSON.stringify(updatedGuestData))
        }
    }

    return (
        <>
            <div className="container">
                <h2>Your Points: {guestData.pachinkoPoints}</h2>
                <div className="shop-grid">
                    {shopItems.map((item) =>
                        <ShopCard
                            key={item.id}
                            item={item}
                            owned={guestData.ownedUpgrades.includes(item.id)}
                            onBuy={() => handlePurchase(item)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default Shop