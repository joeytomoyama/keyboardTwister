import React from 'react'

export default function SelectScreen({startGame}) {
  return (
    <div className="selectScreen centerer">
        <p>how many players are you?</p>
        <div className="buttons">
            <button onClick={() => startGame(1)}>1 player</button>
            <button onClick={() => startGame(2)}>2 player</button>
            <button onClick={() => startGame(3)}>3 player</button>
            <button onClick={() => startGame(4)}>4 player</button>
        </div>
    </div>
  )
}
