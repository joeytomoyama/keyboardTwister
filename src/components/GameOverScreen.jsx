import React from 'react'

export default function GameOverScreen({loser, restartGame}) {
  return (
    <div className="selectScreen centerer">
      <p>player {loser + 1} lost</p>
      <button onClick={() => restartGame()}>restart</button>
    </div>
  )
}
