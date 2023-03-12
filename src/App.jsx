import React, { useState, useEffect } from 'react'
import Keyboard from './components/Keyboard'
import KeyGenerator from './components/KeyGenerator'
import Player from './components/Player'
import './App.css'

export default function App() {
  const [keys, setKeys] = useState(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'])

  const [pressedKeys, setPressedKeys] = useState([])
  const [toBePressedKeys, setToBePressedKeys] = useState([])

  function checkKeys() {
    setPressedKeys(pressedKeys.sort())
    setToBePressedKeys(toBePressedKeys.sort())
    console.log(pressedKeys)
    console.log(toBePressedKeys)
  }

  useEffect(() => {
      const handleKeyDown = e => {
          if (!pressedKeys.includes(e.key)) setPressedKeys(pressedKeys => [...pressedKeys, e.key])
      }
      const handleKeyUp = e => {
          setPressedKeys(pressedKeys => pressedKeys.filter(key => key !== e.key))
      }

      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)

      return () => {
          window.removeEventListener('keydown', handleKeyDown)
          window.removeEventListener('keyup', handleKeyUp)
      }
  }, [pressedKeys])

  return (
    <div className="App">
      <KeyGenerator keys={keys} pressedKeys={pressedKeys} toBePressedKeys={toBePressedKeys} setToBePressedKeys={setToBePressedKeys} />
      <Keyboard keys={keys} pressedKeys={pressedKeys} checkKeys={checkKeys} />
      <Player amount={keys} pressedKeys={pressedKeys} toBePressedKeys={toBePressedKeys} />
    </div>
  )
}
