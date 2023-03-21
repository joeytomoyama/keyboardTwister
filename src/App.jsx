import React, { useState, useEffect, useRef } from 'react'

import SelectScreen from './components/SelectScreen'
import KeyGenerator from './components/KeyGenerator'
import Keyboard from './components/Keyboard'
import Player from './components/Player'
import GameOverScreen from './components/GameOverScreen'
import DisplayRound from './components/DisplayRound'
import KeyboardLayout from './components/KeyboardLayout'

import './App.css'

export default function App() {
  const [keys, setKeys] = useState([
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])

  const notInitialRender = useRef(false)

  const [players, setPlayers] = useState(0)
  const [round, setRound] = useState(-1)
  const [pressedKeys, setPressedKeys] = useState([])
  const [generatedKey, setGeneratedKey] = useState(null)
  const [keysToPress, setKeysToPress] = useState([[], [], [], []])
  const [keysLeft, setKeysLeft] = useState(keys)
  const [gameState, setGameState] = useState('before')
  const [loser, setLoser] = useState(null)

  function startGame(players) {
    setPlayers(players)
    setKeysToPress(Array.from({ length: players }, () => [])) // chatgpt code
    setGameState('during')
  }

  function nextRound() {
    if (round >= 0 && !pressedKeys.includes(generatedKey)) return
    setRound(round + 1)
  }

  function currentPlayer() {
    return (round + 0) % players
  }
  
  function generateKey() {
    const randomIndex = Math.floor(Math.random() * keysLeft.length)
    const generatedKey = keysLeft[randomIndex]
    setGeneratedKey(generatedKey)
    setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey))

    const keysToPressNext = keysToPress.slice()
    // console.log(keysToPressNext, round, players)
    keysToPressNext[currentPlayer()].push(generatedKey)
    setKeysToPress(keysToPressNext)
  }

  useEffect(() => {
    if (round >= 0) generateKey()
    if (round > 2) setKeys([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
      'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
      'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])
  }, [round])

  function checkKeys() {
    if (gameState !== 'during') return
    // if (keysLeft.includes(pressedKeys[Math.max(0, pressedKeys.length - 1)])) return //logic works on down stroke, but not up stroke.
    keysToPress.forEach((subArray, i) => {
      if (!subArray.every(key => pressedKeys.includes(key))) {
        setLoser(i)
        setGameState('after')
        return
      }
    })
    // if (pressedKeys.length !== round) {
    //   setLoser(currentPlayer())
    //   setGameState('after')
    // }
  }

  function restartGame() {
    setPlayers(0)
    setRound(-1)
    setGeneratedKey(null)
    setKeysToPress([])
    setKeysLeft(keys)
    setGameState('before')
    setLoser(null)
  }

  useEffect(() => {
    console.log('key pressed')
    checkKeys()
  }, [pressedKeys])

  useEffect(() => {
    console.log(keysToPress)
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

  return (
    <div className="App">
      <KeyboardLayout setKeys={setKeys} />
      {gameState === 'before' && <SelectScreen startGame={startGame} />}
      {/* {gameState === 'during' && <p>round: {round}</p>} */}
      {gameState === 'during' && <DisplayRound round={round} player={currentPlayer()} />}
      {/* {gameState === 'during' && <p>player: {currentPlayer()}</p>} */}
      {gameState === 'during' && <KeyGenerator generatedKey={generatedKey} nextRound={nextRound} />}
      {gameState === 'during' && <Keyboard keys={keys} keysToPress={keysToPress} pressedKeys={pressedKeys} />}
      {/* {gameState === 'during' && <Player amount={keys} pressedKeys={pressedKeys} keysToPress={keysToPress} />} */}
      {gameState === 'after' && <GameOverScreen loser={loser} restartGame={restartGame} />}
    </div>
  )
}
