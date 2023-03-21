import { useState } from 'react'

export default function KeyGenerator({generatedKey, nextRound}) {
    
    return (
        <div className="centerer">
            <div className="keyGenerator centerer" onClick={() => {nextRound()}}>
                {generatedKey}
            </div>
        </div>
    )
}