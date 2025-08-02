const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './cookie.env' });

const app = express();
const PORT = 3001;

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const connectDB = require('./db')
const User = require('./user')

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    await connectDB()

    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(401).json({ message: 'Invalid username' })
    }

    console.log(user)
    console.log(user.passwordHash)

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid password' })
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 604800000
    })
    // TODO: configure receiving of rj_data on frontend
    res.json({ message: 'Logged in successfully', username: user.username, rj_guest_data: user.rj_data });
})



app.post('/register', async (req, res) => {
    console.log('req.body', req.body)
    const { email, username, password, rj_data } = req.body;

    await connectDB()

    const existingUser = await User.findOne({ username: username });
    console.log(existingUser)
    if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({

        username: username,
        email: email,
        passwordHash: passwordHash,
        rj_data: rj_data
    })

    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
})

app.get('/me', async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.sendStatus(401)

    try {
        await connectDB()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await User.findOne({ username: decoded.username }).select('username')
        res.json({ username: user.username })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid token' })
    }
});

app.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const newAccessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            maxAge: 3600000
        });
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(403);
    }
})

app.get('/user-shop-data', async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.sendStatus(401)

    try {
        await connectDB()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ username: decoded.username })
        res.json({ rj_data: user.rj_data })
    } catch (err) {
        console.log(err)
    }

})

app.post('/purchase', async (req, res) => {
    const { updatedGuestData } = req.body;
    console.log(updatedGuestData)
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401)

    try {
        await connectDB()
        console.log('Mongoose connection readyState:', require("mongoose").connection.readyState)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await User.updateOne({ username: decoded.username }, { $set: { rj_data: updatedGuestData } }, {runValidators: true});

        console.log(result)

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes' })
        }

        res.status(200).json({ message: 'Purchase data updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
