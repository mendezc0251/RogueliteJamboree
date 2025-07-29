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
  const [user, setUser] = useState(null)
  const getUser = async () => {
    try {
      let res = await fetch('http://localhost:3001/me', { credentials: 'include', method: 'GET' });

      if (res.status === 304) {
        console.log("use cached data");
        return;
      }

      if (res.status === 401) {
        const refreshRes = await fetch('http://localhost:3001/refresh', { method: 'POST', credentials: 'include' });

        if (!refreshRes.ok) {
          throw new Error("Refresh failed");
        }

        res = await fetch('http://localhost:3001/me', { credentials: 'include', method: 'GET' });

        if (!res.ok) {
          throw new Error("Unauthorized after refresh")
        }
      }
      const data = await res.json();
      setUser(data.username);
    } catch (err) {
      console.error(err.message);
      setUser('Login')
    }
  };

  useEffect(() => {
    getUser();
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
            {user === 'Login' ? (<li><Link to={"/Login"}>login</Link></li>) : (<li><Link to={"/User"}>{user}</Link></li>)}
          </ul>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Game />} />
        <Route path='/shop' element={<Shop setUser={setUser} user={user} getUser={getUser} />} />
        <Route path='/about' element={<About />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
