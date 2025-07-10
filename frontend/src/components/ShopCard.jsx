const ShopCard = ({ item, owned, onBuy})=>{
    return(
        <div className="shopCard">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.cost}</p>
            <button disabled={owned} onClick= { onBuy }>
                {owned ? "Already Owned!" : "Buy"}
            </button>
        </div>
    )
}

export default ShopCard