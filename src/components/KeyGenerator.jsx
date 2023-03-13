import { useState } from 'react'

export default function KeyGenerator({keysToPress2, generateKey}) {
    
    return (
        <div className="centerer">
            <div className="centerer" style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'red',
                borderRadius: '50px',
            }} onClick={generateKey}>
                {/* {keysToPress2[keysToPress2.length - 1]} */}
            </div>
        </div>
    )
}