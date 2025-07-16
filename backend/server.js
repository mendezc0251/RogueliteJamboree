const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT=3001;

app.use(cors());
app.use(express.json());

const users =[{
    id:1,
    username:'testuser',
    passwordHash:'$2b$10$XGJSK1B4cQu2sHulAeTLtu93SPlkm9boX1mEq9ChG2OaV9PfG6jH6',
},];

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = users.find(u => u.username===username);
    if(!user){
        return res.status(401).json({ message:'Invalid username' })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if(!isValid){
        return res.status(401).json( {message:'Invalid password'} )
    }

    const token = jwt.sign({id: user.id}, 'secret-key', {expiresIn: '1h'})
    res.json({token});
})

app.get('/api/hello', (req, res)=>{
    res.json({message: "Hello from the backend!"})
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})