import React, { useState, useEffect, useRef } from 'react'

import SelectScreen from './components/SelectScreen'
import KeyGenerator from './components/KeyGenerator'
import Keyboard from './components/Keyboard'
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
  const [players, setPlayers] = useState(0)
  const [round, setRound] = useState(-1)
  const [pressedKeys, setPressedKeys] = useState([])
  const lastPressedKey = useRef(null)
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

  function nextRound() {
    if (round >= 0 && !pressedKeys.includes(generatedKey)) return // next round only gets triggered if last generated key is pressed
    setRound(round + 1)
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

  useEffect(() => {
    console.log('round changed')
    if (round >= 0) generateKey()
  }, [round])

  useEffect(() => {
    console.log('key pressed')
    checkKeys()
  }, [pressedKeys])

  useEffect(() => {
    // console.log(keysToPress)
    const handleKeyDown = e => {
      if (e.code === 'Space') {
        setRound(round => round + 1)
        generateKey()
        return
      }
      setPressedKeys(pressedKeys => (!pressedKeys.includes(e.key)) ? [...pressedKeys, e.key] : pressedKeys)
      lastPressedKey.current = e.key
      console.log(e.code )
    }
    const handleKeyUp = e => {
      if (e.code === 'Space') return
      setPressedKeys(pressedKeys => pressedKeys.filter(key => key !== e.key))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.code === 'Space') nextRound()
  //   })
  // }, [])

  return (
    <div className="App">
      <KeyboardLayout setKeys={setKeys} />
      {gameState === 'before' && <SelectScreen startGame={startGame} />}
      {gameState === 'during' && <DisplayRound round={round} player={currentPlayer()} />}
      {gameState === 'during' && <KeyGenerator generatedKey={generatedKey} nextRound={nextRound} />}
      {gameState === 'during' && <Keyboard keys={keys} keysToPress={keysToPress} pressedKeys={pressedKeys} />}
      {/* {gameState === 'during' && <Player amount={keys} pressedKeys={pressedKeys} keysToPress={keysToPress} />} */}
      {gameState === 'after' && <GameOverScreen loser={loser} restartGame={restartGame} />}
    </div>
  )
}
