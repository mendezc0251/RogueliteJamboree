import './Shop.css'
import ShopCard from './ShopCard'
import shopItems from './shopItems'
import { useState, useEffect } from 'react'
import { shopEffects } from '../components/shopEffects'

const Shop = ({ setUser, user, getUser }) => {

    useEffect(() => {
        getUser()
    })



    const [data, setData] = useState(() => {
        if (user === "Login") {
            return JSON.parse(localStorage.getItem("rj_guest_data"))
        } else {
            fetch('http://localhost:3001/user-shop-data', { credentials: 'include', method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    console.log(data.rj_data)
                    return data.rj_data;
                });
        }
    })

    const handlePurchase = (item) => {
        if (data.pachinkoPoints >= item.cost && !data.ownedUpgrades.includes(item.id)) {
            const updatedGuestData = {
                pachinkoHighscore: data.pachinkoHighscore,
                pachinkoGameState: data.pachinkoGameState,
                pachinkoPoints: data.pachinkoPoints - item.cost,
                ownedUpgrades: [...data.ownedUpgrades, item.id]
            };

            if (item.effectKey && shopEffects[item.effectKey]) {
                shopEffects[item.effectKey](updatedGuestData.pachinkoGameState);
            };

            setData(updatedGuestData)
            localStorage.setItem("rj_guest_data", JSON.stringify(updatedGuestData))
        }
    }

    return (
        <>
            <div className="container">
                <h2>Your Points: {data.pachinkoPoints}</h2>
                <div className="shop-grid">
                    {shopItems.map((item) =>
                        <ShopCard
                            key={item.id}
                            item={item}
                            owned={data.ownedUpgrades.includes(item.id)}
                            onBuy={() => handlePurchase(item)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default Shop