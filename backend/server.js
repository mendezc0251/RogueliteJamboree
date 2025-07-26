const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const connectDB = require('./db')
const User = require('./user')

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    await connectDB()

    const user = await User.findOne({ username:username })
    if (!user) {
        return res.status(401).json({ message: 'Invalid username' })
    }

    console.log(user)
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})