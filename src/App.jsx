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

  const [players, setPlayers] = useState(0)
  const [round, setRound] = useState(0)
  const [pressedKeys, setPressedKeys] = useState([])
  const [generatedKey, setGeneratedKey] = useState(null)
  const [keysToPress, setKeysToPress] = useState([])
  const [keysLeft, setKeysLeft] = useState(keys)
  const [gameState, setGameState] = useState('before')
  const [loser, setLoser] = useState(null)

  function startGame(players) {
    setGameState('during')
    setPlayers(players)
    setKeysToPress(Array.from({ length: players }, () => [])) // chatgpt code
  }

  function currentPlayer() {
    return round % players
  }
  
  // let generatedKey
  function generateKey() {
    const randomIndex = Math.floor(Math.random() * keysLeft.length)
    const generatedKey = keysLeft[randomIndex]
    setGeneratedKey(generatedKey)
    setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey))

    const keysToPressNext = keysToPress.slice()
    keysToPressNext[currentPlayer()].push(generatedKey)
    setKeysToPress(keysToPressNext)
    // setTimeout(() => console.log(keysToPress.join('\n')), 100)
    setRound(round + 1)
  }

  function checkKeys() {
    keysToPress.forEach((subArray, i) => {
      if (!subArray.every(key => pressedKeys.includes(key))) {
        setLoser(i)
        setGameState('after')
      }
    })
    // console.log(keysToPress.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0))
    console.log('round:', round)
    if (pressedKeys.length !== round) {
      // console.log(currentPlayer() + ' lost')
      setLoser(currentPlayer())
      setGameState('after')
    }
  }

  function restartGame() {
    setPlayers(0)
    setRound(0)
    setGeneratedKey(null)
    setKeysToPress([])
    setKeysLeft(keys)
    setGameState('before')
    setLoser(null)
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
      {gameState === 'before' && <SelectScreen startGame={startGame} />}
      {gameState === 'during' && <KeyGenerator generatedKey={generatedKey} generateKey={generateKey} />}
      {gameState === 'during' && <Keyboard keys={keys} pressedKeys={pressedKeys} checkKeys={checkKeys} />}
      {gameState === 'during' && <Player amount={keys} pressedKeys={pressedKeys} keysToPress={keysToPress} />}
      {gameState === 'after' && <GameOverScreen loser={loser} restartGame={restartGame} />}
    </div>
  )
}
