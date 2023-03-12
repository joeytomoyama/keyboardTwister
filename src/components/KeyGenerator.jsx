import { useState } from 'react'

export default function KeyGenerator({keys, pressedKeys, toBePressedKeys, setToBePressedKeys, generate}) {
    const [keysLeft, setKeysLeft] = useState(keys)
  
    function generate() {
            const randomIndex = Math.floor(Math.random() * keysLeft.length)
            const generatedKey = keysLeft[randomIndex]
            setKeysLeft(keysLeft => keysLeft.filter(k => k !== generatedKey))
            console.log(keysLeft)
            return generatedKey
    }
    
    return (
        <div className="centerer">
            <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'red',
                borderRadius: '50px',
            }} onClick={() => setToBePressedKeys(toBePressedKeys => [...toBePressedKeys, generate()].sort())}>
                {toBePressedKeys[toBePressedKeys.length - 1]}
            </div>
        </div>
    )
}