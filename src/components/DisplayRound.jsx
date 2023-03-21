import React from 'react'

export default function DisplayRound({round, player}) {
    let displayedMessage
    displayedMessage = (round < 0) ? 'start game' : `round: ${round + 1}`

    return (
        <div>
            <p>{displayedMessage}</p>
            {round >= 0 && <p>Player {player + 1}</p>}
        </div>
    )
}
