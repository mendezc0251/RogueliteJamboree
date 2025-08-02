import './Shop.css'
import ShopCard from './ShopCard'
import shopItems from './shopItems'
import { useState, useEffect } from 'react'
import { shopEffects } from '../components/shopEffects'

const Shop = ({ setUser, user, getUser }) => {



    const [data, setData] = useState(() => {
        if (user === "Login") {
            return JSON.parse(localStorage.getItem("rj_guest_data"))
        } else {
            return null;
        }
    })

    useEffect(() => {
        console.log("getting user")
        getUser();
    }, []);

    useEffect(() => {
        if (user !== 'Login') {
            fetch('http://localhost:3001/user-shop-data', { credentials: 'include', method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    console.log(data.rj_data)
                    setData(data.rj_data)
                })
                .catch(err => {
                    console.error("Fetch error:", err)
                });
        }

    }, [user]);




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
            fetch('http://localhost:3001/purchase', {
                credentials: 'include', method: 'POST', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ updatedGuestData })
            })
                .then(res => res.json())
                .catch(err => {
                    console.error("Fetch error:", err)
                });
            setData(updatedGuestData)
            if (user === 'Login') {
                localStorage.setItem("rj_guest_data", JSON.stringify(updatedGuestData))
            }

        }
    }

    if (!data) { return <p>Loading shop...</p> }
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