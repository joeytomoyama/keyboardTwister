import React from 'react'

export default function SelectScreen({setGameState}) {
  return (
    <div className="selectScreen centerer">
      <button onClick={() => setGameState('during')}>start game</button>
    </div>
  )
}
