import { useState } from 'react'

export default function KeyGenerator({generatedKey, generateKey}) {
    
    return (
        <div className="centerer">
            <div className="keyGenerator centerer" onClick={generateKey}>
                {generatedKey}
            </div>
        </div>
    )
}