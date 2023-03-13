import React from 'react'

export default function GameOverScreen({restartGame}) {
  return (
    <div className="selectScreen centerer">
      <p>you lost</p>
      <br></br>
      <button onClick={() => restartGame()}>restart</button>
    </div>
  )
}
