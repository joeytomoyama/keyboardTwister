import React from 'react'

export default function GameOverScreen({restartGame}) {
  return (
    <div className="selectScreen centerer">
      <p>you lost</p>
      <button onClick={() => restartGame()}>restart</button>
    </div>
  )
}
