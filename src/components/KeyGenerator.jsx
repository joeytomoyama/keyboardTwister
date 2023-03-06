import { useState } from 'react'

export default function KeyGenerator({keys, pressedKeys, toBePressedKeys, setToBePressedKeys}) {
    const [keysLeft, setKeysLeft] = useState(keys)
    const generate = () => {
        const randomIndex = Math.floor(Math.random() * keysLeft.length)
        const toReturn = keysLeft[randomIndex]
        console.log(keysLeft)
        setKeysLeft(keysLeft => keysLeft.filter(k => k !== keysLeft[randomIndex]))
        console.log(keysLeft)
        return toReturn
    }
    
    return (
        <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'red',
        }} onClick={() => setToBePressedKeys(toBePressedKeys => [...toBePressedKeys, generate()], )}>
            {toBePressedKeys[toBePressedKeys.length - 1]}
        </div>
    )
}