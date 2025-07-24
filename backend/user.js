const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    rj_data: {
        pachinkoHighscore: { type: Number, required: true },
        pachinkoGameState: {
            bfNum: { type: Number, required: true },
            multiplier: [{ type: String, required: true }],
            coins: { type: Number, required: true },
            pegHits: { type: Number, required: true },
            maxWorldHeight: { type: Number, required: true },
            pegRows: { type: Number, required: true },
            round: { type: Number, required: true },
            rounds: { type: Number, required: true },
            ammo: { type: Number, required: true },
            maxAmmo: { type: Number, required: true },
            totalScore: { type: Number, required: true },
            score: { type: Number, required: true },
        },
        pachinkoPoints: { type: Number, required: true },
        ownedUpgrades: [{ type: String }],
    }

}, {collection: "user_data"})

const User = mongoose.model('user_data', userSchema);
module.exports = User;