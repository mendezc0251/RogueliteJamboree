import './App.css'
import jamboreePng from '/assets/jamboree.png'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Game from './components/Game'
import Shop from './components/Shop'
import About from './components/About'
import Login from './components/Login'
import User from './components/User'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Loading...');
  const [user, setUser] = useState('Login')

  useEffect(() => {
    fetch('http://localhost:3001/me', { credentials: 'include' })

      .then(res => {
        if (!res.ok) setUser('Login')
        return res.json()
      })
      .then(data => {
        setUser(data.username)
      })
      .catch(() => {
        setUser('Login');
      })
  }, []);

  return (
    <BrowserRouter>
      <header>
        <img src={jamboreePng} alt="Jamboree"></img>
        <div className="header-links-container">
          <ul className="header-links">
            <li><Link to={"/"}>home</Link></li>
            <li><Link to={"/Shop"}>shop</Link></li>
            <li><Link to={"/About"}>about</Link></li>
            {user==='Login' ? (<li><Link to={"/Login"}>login</Link></li>):(<li><Link to={"/User"}>{user}</Link></li>)}
          </ul>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Game />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/user' element={<User />}/>
        <Route path='/login' element={<Login setUser={setUser} />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
