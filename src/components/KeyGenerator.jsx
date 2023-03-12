import { useState } from 'react'

export default function KeyGenerator({keysToPress, generateKey}) {
    
    return (
        <div className="centerer">
            <div className="centerer" style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'red',
                borderRadius: '50px',
            }} onClick={generateKey}>
                {keysToPress[keysToPress.length - 1]}
            </div>
        </div>
    )
}