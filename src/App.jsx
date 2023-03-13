import React, { useState, useEffect } from 'react'
import SelectScreen from './components/SelectScreen'
import KeyGenerator from './components/KeyGenerator'
import Keyboard from './components/Keyboard'
import Player from './components/Player'
import GameOverScreen from './components/GameOverScreen'
import './App.css'

export default function App() {
  const [keys, setKeys] = useState(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])

  const [pressedKeys, setPressedKeys] = useState([])
  const [keysToPress, setKeysToPress] = useState([])
  const [keysLeft, setKeysLeft] = useState(keys)
  const [gameState, setGameState] = useState('before')
  
  function generateKey() {
        const randomIndex = Math.floor(Math.random() * keysLeft.length)
        const generatedKey = keysLeft[randomIndex]
        setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey).sort())
        const keysToPressNext = keysToPress.slice()
        keysToPressNext.push(generatedKey)
        // keysToPressNext.sort()
        setKeysToPress(keysToPressNext)
  }

  function checkKeys() {
    if (!keysToPress.every(key => pressedKeys.includes(key))) setGameState('after')
    // setGameState(keysToPress.every(key => pressedKeys.includes(key)) && keysToPress.length === pressedKeys.length)
  }

  function restartGame() {
    setKeysToPress([])
    setGameState('before')
  }

  useEffect(() => {
      const handleKeyDown = e => {
        if (!pressedKeys.includes(e.key)) setPressedKeys(pressedKeys => [...pressedKeys, e.key].sort())
      }
      const handleKeyUp = e => {
          setPressedKeys(pressedKeys => pressedKeys.filter(key => key !== e.key).sort())
      }

      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)

      checkKeys()

      return () => {
          window.removeEventListener('keydown', handleKeyDown)
          window.removeEventListener('keyup', handleKeyUp)
      }
  }, [pressedKeys])

  return (
    <div className="App">
      {gameState === 'before' && <SelectScreen setGameState={setGameState} />}
      {gameState === 'during' && <KeyGenerator keysToPress={keysToPress} generateKey={generateKey} />}
      {gameState === 'during' && <Keyboard keys={keys} pressedKeys={pressedKeys} checkKeys={checkKeys} />}
      {gameState === 'during' && <Player amount={keys} pressedKeys={pressedKeys} keysToPress={keysToPress} />}
      {gameState === 'after' && <GameOverScreen restartGame={restartGame} />}
    </div>
  )
}
