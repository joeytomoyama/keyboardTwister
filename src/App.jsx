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
  // const [keysLeft, setKeysLeft] = useState(keys)
  
  // function generate() {
  //       const randomIndex = Math.floor(Math.random() * keysLeft.length)
  //       const generatedKey = keysLeft[randomIndex]
  //       setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey))
  //       console.log(keysLeft)
  //       return generatedKey
  // }

  function checkKeys() {
    // setPressedKeys(pressedKeys.sort())
    // setToBePressedKeys(toBePressedKeys.sort())
    console.log(pressedKeys)
    console.log(toBePressedKeys)
  }

  useEffect(() => {
      const handleKeyDown = e => {
        // checkKeys()
        if (!pressedKeys.includes(e.key)) setPressedKeys(pressedKeys => [...pressedKeys, e.key].sort())
      }
      const handleKeyUp = e => {
          setPressedKeys(pressedKeys => pressedKeys.filter(key => key !== e.key).sort())
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
      <button onClick={generate}>generate</button>
      <KeyGenerator keys={keys} pressedKeys={pressedKeys} toBePressedKeys={toBePressedKeys} setToBePressedKeys={setToBePressedKeys} generate={generate} />
      <Keyboard keys={keys} pressedKeys={pressedKeys} checkKeys={checkKeys} />
      <Player amount={keys} pressedKeys={pressedKeys} toBePressedKeys={toBePressedKeys} />
    </div>
  )
}
