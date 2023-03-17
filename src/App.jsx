import React, { useState, useEffect } from 'react'
import SelectScreen from './components/SelectScreen'
import KeyGenerator from './components/KeyGenerator'
import Keyboard from './components/Keyboard'
import Player from './components/Player'
import GameOverScreen from './components/GameOverScreen'
import './App.css'

export default function App() {
  const [keys, setKeys] = useState([
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])

  const [players, setPlayers] = useState(0)
  const [round, setRound] = useState(-1)
  const [pressedKeys, setPressedKeys] = useState([])
  const [generatedKey, setGeneratedKey] = useState(null)
  const [keysToPress, setKeysToPress] = useState([])
  const [keysLeft, setKeysLeft] = useState(keys)
  const [gameState, setGameState] = useState('before')
  const [loser, setLoser] = useState(null)

  function startGame(players) {
    setPlayers(players)
    setKeysToPress(Array.from({ length: players }, () => [])) // chatgpt code
    setGameState('during')
  }

  function currentPlayer() {
    return (round + 0) % players
  }
  
  // let generatedKey
  function generateKey() {
    // if (generatedKey) setRound(round => round + 1)
    const randomIndex = Math.floor(Math.random() * keysLeft.length)
    const generatedKey = keysLeft[randomIndex]
    setGeneratedKey(generatedKey)
    setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey))

    const keysToPressNext = keysToPress.slice()
    console.log(keysToPressNext, round, players)
    keysToPressNext[currentPlayer()].push(generatedKey)
    setKeysToPress(keysToPressNext)
    // setTimeout(() => console.log(keysToPress.join('\n')), 100)
  }

  useEffect(() => {
    setRound(round + 1)
  }, [generatedKey])

  function checkKeys() {
    if (gameState !== 'during') return
    keysToPress.forEach((subArray, i) => {
      if (!subArray.every(key => pressedKeys.includes(key))) {
        setLoser(i)
        setGameState('after')
        return
      }
    })
    if (pressedKeys.length !== round) {
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
      setPressedKeys(pressedKeys => (!pressedKeys.includes(e.key)) ? [...pressedKeys, e.key] : pressedKeys)
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
  }, [])

  useEffect(() => {
    console.log(pressedKeys, round)
    checkKeys()
  }, [pressedKeys])

  return (
    <div className="App">
      {gameState === 'before' && <SelectScreen startGame={startGame} />}
      {gameState === 'during' && <p>round: {round}</p>}
      {gameState === 'during' && <p>player: {currentPlayer()}</p>}
      {gameState === 'during' && <KeyGenerator generatedKey={generatedKey} generateKey={generateKey} />}
      {gameState === 'during' && <Keyboard keys={keys} pressedKeys={pressedKeys} checkKeys={checkKeys} />}
      {gameState === 'during' && <Player amount={keys} pressedKeys={pressedKeys} keysToPress={keysToPress} />}
      {gameState === 'after' && <GameOverScreen loser={loser} restartGame={restartGame} />}
    </div>
  )
}
