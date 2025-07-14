export const shopEffects ={
    addCoin: (state) => {
        console.log("extra coin added!")
        state.coins = state.coins + 1 
    },
    addBounce: (state) => {
        state.bfNum = state.bfNum + .1
    }
}