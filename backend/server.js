const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(url, {

        });
    } catch (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1);
    }
};

module.exports = connectDB

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
            round: {type: Number, required: true },
            rounds: {type: Number, required: true },
            ammo: {type: Number, required: true },
            maxAmmo: {type: Number, required: true },
            totalScore: {type: Number, required: true },
            score: {type: Number, required: true },
        },
        pachinkoPoints: { type: Number, required: true },
        ownedUpgrades: [{ type: String }],
    }

})

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const users = [{
    id: 1,
    email: 'email@email.com',
    username: 'testuser',
    passwordHash: '$2b$10$CRbwZxg64IikyDhy2Tfnp.1a9p4DxplQHCBcNB8ui7kenhtcXUj0O',
},];

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username' })
    }

    console.log(user)
    console.log(password)
    console.log(user.passwordHash)

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' })
    res.json({ token });
})

app.post('/register', async (req, res) => {
    console.log('req.body', req.body)
    const { email, username, password } = req.body;

    const existingUser = users.find(e => e.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = {
        id: users.length + 1,
        email: email,
        username: username,
        passwordHash: passwordHash
    }

    users.push(newUser)

    res.status(201).json({ message: 'User registered successfully' })
})

app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello from the backend!" })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const password = 'password123';

bcrypt.hash(password, 10).then(hash => {
    console.log('Hash for password 123:', hash)
})