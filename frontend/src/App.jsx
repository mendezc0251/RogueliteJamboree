import './App.css'
import jamboreePng from '../src/assets/jamboree.png'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom'
import Game from './Game'
import Shop from './Shop'
import About from './About'

function App() {
  

  return (
    <BrowserRouter>
      <header>
        <img src={jamboreePng} alt="Jamboree"></img>
        <div className="header-links-container">
          <ul className="header-links">
            <li><Link to={"/"}>home</Link></li>
            <li><Link to={"/Shop"}>shop</Link></li>
            <li><Link to={"/About"}>about</Link></li>
          </ul>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Game />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
