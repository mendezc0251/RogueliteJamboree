// class to export shopEffects that change pachinkoGameState on purchase

export const shopEffects ={
    addCoin: (state) => {
        console.log("extra coin added!")
        state.coins = state.coins + 1 
    },
    addTwoCoin: (state) => {
        console.log("extra coins added!")
        state.coins = state.coins + 2 
    },
    addThreeCoin: (state) => {
        console.log("extra coins added!")
        state.coins = state.coins + 3 
    },
    addBounce: (state) => {
        state.bfNum = state.bfNum + .1
    },
    addTwoBounce: (state) => {
        state.bfNum = state.bfNum + .2
    },
    addThreeBounce: (state) => {
        state.bfNum = state.bfNum + .3
    }
}