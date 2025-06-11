import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header></header>
      <canvas id='game' height={"500px"} width={"500px"}></canvas>
    </>
  )
}

export default App
