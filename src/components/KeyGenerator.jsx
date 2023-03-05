import { useState } from 'react'

export default function KeyGenerator({keys}) {
    const [randomKey, setRandomKey] = useState('generate random key')
    const generate = () => {
        const randomIndex = Math.floor(Math.random() * keys.length)
        return randomIndex
    }
    
    return (
        <div onClick={() => setRandomKey(keys[generate()])}>
            {randomKey}
        </div>
    )
}